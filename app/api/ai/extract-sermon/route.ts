import { NextRequest, NextResponse } from 'next/server'
import { extractText } from 'unpdf'

// Force Node.js runtime
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Extract text from PDF using unpdf
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const uint8Array = new Uint8Array(buffer)
  const result = await extractText(uint8Array)

  // Handle different return formats
  if (typeof result.text === 'string') {
    return result.text
  } else if (Array.isArray(result.text)) {
    return result.text.join('\n')
  } else if (result.text) {
    return String(result.text)
  }

  return ''
}

// Calculate estimated reading/speaking duration based on word count
// Average speaking pace for sermons is ~130 words per minute
function calculateDuration(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutesLow = Math.floor(words / 150) // Faster pace
  const minutesHigh = Math.ceil(words / 120)  // Slower pace

  if (minutesLow === minutesHigh) {
    return `${minutesLow} minutes`
  }
  return `${minutesLow}-${minutesHigh} minutes`
}

const EXTRACTION_PROMPT = `You are an expert at extracting structured information from sermon documents.
Analyze the provided sermon text and extract the following information in JSON format:

{
  "title": "The sermon title",
  "sermon_date": "YYYY-MM-DD format if found, otherwise null",
  "duration": "Estimated duration like '20-25 minutes' or null",
  "scripture_reference": "All scripture references mentioned, separated by semicolons",
  "summary": "A comprehensive summary of the sermon (2-4 sentences)",
  "key_points": ["Array of key points or main takeaways from the sermon"]
}

Rules:
- Extract the actual title from the document, not a generated one
- For dates, convert to YYYY-MM-DD format if possible (e.g., "25th December, 2017" becomes "2017-12-25")
- Include ALL scripture references mentioned throughout the sermon
- The summary should capture the main message and theme
- Key points should be concise but meaningful (aim for 5-10 points)
- If information is not found, use null for strings or empty array for key_points
- Return ONLY valid JSON, no additional text or markdown

Analyze the following sermon content:

`

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('pdf') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No PDF file provided' },
        { status: 400 }
      )
    }

    // Check file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'File must be a PDF' },
        { status: 400 }
      )
    }

    // Check file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: 'PDF file must be less than 10MB' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'Gemini API key not configured. Add GEMINI_API_KEY to your .env.local file.' },
        { status: 500 }
      )
    }

    // Extract text from PDF
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    let pdfText: string
    try {
      pdfText = await extractTextFromPdf(buffer)

      if (!pdfText || pdfText.trim().length < 100) {
        return NextResponse.json(
          { success: false, message: 'Could not extract enough text from PDF. Please ensure the PDF contains readable text (not scanned images).' },
          { status: 400 }
        )
      }
    } catch (pdfError: any) {
      console.error('PDF parsing error:', pdfError?.message || pdfError)
      return NextResponse.json(
        { success: false, message: `Failed to read PDF file: ${pdfError?.message || 'Unknown error'}. Please ensure it is a valid PDF document.` },
        { status: 400 }
      )
    }

    // Truncate text if too long (keep first ~15000 chars to fit in context)
    const maxTextLength = 15000
    if (pdfText.length > maxTextLength) {
      pdfText = pdfText.substring(0, maxTextLength) + '\n\n[Content truncated...]'
    }

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: EXTRACTION_PROMPT + pdfText,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2000,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Gemini API error:', response.status, errorData)
      return NextResponse.json(
        { success: false, message: `Gemini API error: ${errorData.error?.message || response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!content) {
      return NextResponse.json(
        { success: false, message: 'No response from AI' },
        { status: 500 }
      )
    }

    // Parse the JSON response
    try {
      // Remove markdown code blocks if present
      let jsonStr = content.trim()
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.slice(7)
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.slice(3)
      }
      if (jsonStr.endsWith('```')) {
        jsonStr = jsonStr.slice(0, -3)
      }
      jsonStr = jsonStr.trim()

      const extracted = JSON.parse(jsonStr)

      // Calculate duration based on word count (more accurate than AI guess)
      const calculatedDuration = calculateDuration(pdfText)

      return NextResponse.json({
        success: true,
        data: {
          title: extracted.title || '',
          sermon_date: extracted.sermon_date || '',
          duration: calculatedDuration,
          scripture_reference: extracted.scripture_reference || '',
          summary: extracted.summary || '',
          key_points: Array.isArray(extracted.key_points) ? extracted.key_points : [],
        },
      })
    } catch (parseError) {
      console.error('Failed to parse AI response:', content)
      return NextResponse.json(
        { success: false, message: 'Failed to parse AI response. The AI may have returned an unexpected format.', raw: content },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing PDF:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
