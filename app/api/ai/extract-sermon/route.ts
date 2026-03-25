import { NextRequest, NextResponse } from 'next/server'

// Force Node.js runtime
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PYTHON_SERVICE_URL = process.env.PYTHON_PDF_SERVICE_URL || 'http://localhost:8002'

// Calculate estimated reading/speaking duration based on word count
function calculateDuration(wordCount: number): string {
  const minutesLow = Math.floor(wordCount / 150)
  const minutesHigh = Math.ceil(wordCount / 120)

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
  "scripture_reference": "The main scripture references (max 5 most important ones), separated by semicolons",
  "summary": "A comprehensive summary of the sermon (2-4 sentences)",
  "key_points": ["Array of key points or main takeaways from the sermon"]
}

Rules:
- Extract the actual title from the document, not a generated one
- For dates, convert to YYYY-MM-DD format if possible (e.g., "25th December, 2017" becomes "2017-12-25")
- For scripture references, only include the TOP 5 most important/central references, not every single one mentioned
- The summary should capture the main message and theme
- Key points should be concise but meaningful (aim for 5-8 points)
- If information is not found, use null for strings or empty array for key_points
- Return ONLY valid JSON, no additional text, no markdown code blocks

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

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, message: 'File must be a PDF' },
        { status: 400 }
      )
    }

    const MAX_SIZE = 50 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: 'PDF file must be less than 50MB' },
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

    // Extract text from PDF using Python service
    let pdfText: string
    let wordCount: number
    try {
      const pdfFormData = new FormData()
      pdfFormData.append('file', file)

      const pdfResponse = await fetch(`${PYTHON_SERVICE_URL}/convert`, {
        method: 'POST',
        body: pdfFormData,
      })

      if (!pdfResponse.ok) {
        const err = await pdfResponse.json().catch(() => ({}))
        throw new Error(err.detail || `Python service error: ${pdfResponse.status}`)
      }

      const pdfResult = await pdfResponse.json()
      pdfText = pdfResult.markdown || ''
      wordCount = pdfResult.word_count || 0

      if (!pdfText || pdfText.trim().length < 100) {
        return NextResponse.json(
          { success: false, message: 'Could not extract enough text from PDF.' },
          { status: 400 }
        )
      }
    } catch (pdfError: any) {
      console.error('PDF extraction error:', pdfError?.message || pdfError)
      return NextResponse.json(
        { success: false, message: `Failed to extract text from PDF: ${pdfError?.message || 'Python service unavailable'}` },
        { status: 500 }
      )
    }

    // Truncate text if too long
    const maxTextLength = 15000
    if (pdfText.length > maxTextLength) {
      pdfText = pdfText.substring(0, maxTextLength) + '\n\n[Content truncated...]'
    }

    // Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: EXTRACTION_PROMPT + pdfText }],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
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
      // Clean up markdown fences if present despite responseMimeType
      let jsonStr = content.trim()
      if (jsonStr.startsWith('```json')) jsonStr = jsonStr.slice(7)
      else if (jsonStr.startsWith('```')) jsonStr = jsonStr.slice(3)
      if (jsonStr.endsWith('```')) jsonStr = jsonStr.slice(0, -3)
      jsonStr = jsonStr.trim()

      const extracted = JSON.parse(jsonStr)
      const calculatedDuration = calculateDuration(wordCount)

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
        { success: false, message: 'Failed to parse AI response.', raw: content.substring(0, 500) },
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
