// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  code?: number
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
}

// Admin Types
export interface Admin {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'super_admin'
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}

export interface LoginResponse {
  token: string
  admin: Admin
  expires_in: number
}

// Book Types
export interface Book {
  id: number
  title: string
  subtitle: string | null
  description: string
  pages: number | null
  isbn: string | null
  publisher: string
  category: string
  publication_year: string | null
  featured: boolean
  key_themes: string | null
  table_of_contents: string | null
  excerpt: string | null
  cover_image: string | null
  pdf_file: string | null
  downloads: number
  status: 'draft' | 'published'
  slug: string
  created_at: string
  updated_at: string
}

// Sermon Types
export interface Sermon {
  id: number
  title: string
  theme_id: number
  sermon_date: string
  duration: string | null
  summary: string
  scripture_reference: string | null
  key_points: string[]
  featured: boolean
  has_audio: boolean
  has_video: boolean
  has_text: boolean
  pdf_file: string | null
  audio_file: string | null
  video_file: string | null
  views: number
  status: 'draft' | 'published'
  slug: string
  created_at: string
  updated_at: string
  theme?: Theme
}

// Theme Types
export interface Theme {
  id: number
  name: string
  description: string
  color_class: string
  status: 'active' | 'inactive'
  slug: string
  created_at: string
  updated_at: string
  sermon_count?: number
  book_count?: number
}

// Dashboard Types
export interface DashboardStats {
  totalBooks: number
  totalSermons: number
  totalThemes: number
  totalViews: number
}

export interface Activity {
  type: 'book' | 'sermon'
  action: string
  item: string
  time: string
  details?: string
}

// API Error Class
export class ApiError extends Error {
  code: number
  errors?: Record<string, string[]>

  constructor(message: string, code: number, errors?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.errors = errors
  }
}

// HTTP Client
class HttpClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('authToken')
  }

  private getAuthHeaders(): HeadersInit {
    const token = this.getAuthToken()
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json()

    if (!data.success) {
      throw new ApiError(data.message, data.code || response.status, data.errors)
    }

    return data.data
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse<T>(response)
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse<T>(response)
  }

  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const token = this.getAuthToken()
    const headers: HeadersInit = {}

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    })
    return this.handleResponse<T>(response)
  }
}

const client = new HttpClient(API_BASE_URL)

// Auth API
export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    client.post<LoginResponse>('auth/login', credentials),

  logout: () => client.post<{ message: string }>('auth/logout'),

  verify: () => client.get<{ valid: boolean; admin: Admin }>('auth/verify'),

  getCurrentUser: () => client.get<Admin>('auth/user'),

  changePassword: (data: {
    current_password: string
    new_password: string
    confirm_password: string
  }) => client.post<{ message: string }>('auth/change-password', data),
}

// Dashboard API
export const dashboardApi = {
  getStats: () => client.get<DashboardStats>('dashboard/stats'),

  getActivity: () => client.get<Activity[]>('dashboard/activity'),

  getOverview: () => client.get<{
    stats: DashboardStats
    recentActivity: Activity[]
    featured: { books: Book[]; sermons: Sermon[] }
    popular: { books: Book[]; sermons: Sermon[] }
  }>('dashboard/overview'),
}

// Books API
export const booksApi = {
    getAll: (params?: { page?: number; limit?: number; status?: string }) => {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    if (params?.status) query.append('status', params.status)

    return client.get<PaginatedResponse<{books: Book[]}>>(`books?${query.toString()}`)
  },

  getById: (id: number) => client.get<Book>(`books/${id}`),

  create: (data: Partial<Book>) => client.post<Book>('books', data),

  update: (id: number, data: Partial<Book>) => client.post<Book>(`books/${id}`, data),

  delete: (id: number) => client.delete<{ message: string }>(`books/${id}`),

  toggleFeatured: (id: number) => client.post<Book>(`books/${id}/toggle-featured`),

  getFeatured: (limit?: number) => {
    const query = limit ? `?limit=${limit}` : ''
    return client.get<Book[]>(`books/featured${query}`)
  },

  uploadCover: (id: number, file: File) => {
    const formData = new FormData()
    formData.append('cover_image', file)
    return client.upload<Book>(`books/${id}/upload-cover`, formData)
  },

  uploadPdf: (id: number, file: File) => {
    const formData = new FormData()
    formData.append('pdf_file', file)
    return client.upload<Book>(`books/${id}/upload-pdf`, formData)
  },
}

// Sermons API
export const sermonsApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string; theme_id?: number }) => {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    if (params?.status) query.append('status', params.status)
    if (params?.theme_id) query.append('theme_id', params.theme_id.toString())

    return client.get<PaginatedResponse<{sermons: Sermon[]}>>(`sermons?${query.toString()}`)
  },

  getById: (id: number) => client.get<Sermon>(`sermons/${id}`),

  create: (data: Partial<Sermon>) => client.post<Sermon>('sermons', data),

  update: (id: number, data: Partial<Sermon>) => client.post<Sermon>(`sermons/${id}`, data),

  delete: (id: number) => client.delete<{ message: string }>(`sermons/${id}`),

  toggleFeatured: (id: number) => client.post<Sermon>(`sermons/${id}/toggle-featured`),

  getFeatured: (limit?: number) => {
    const query = limit ? `?limit=${limit}` : ''
    return client.get<Sermon[]>(`sermons/featured${query}`)
  },

  getByTheme: (themeId: number, limit?: number) => {
    const query = limit ? `?limit=${limit}` : ''
    return client.get<Sermon[]>(`sermons/theme/${themeId}${query}`)
  },

  uploadPdf: (id: number, file: File) => {
    const formData = new FormData()
    formData.append('pdf_file', file)
    return client.upload<Sermon>(`sermons/${id}/upload-pdf`, formData)
  },
}

// Themes API
export const themesApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) => {
    const query = new URLSearchParams()
    if (params?.page) query.append('page', params.page.toString())
    if (params?.limit) query.append('limit', params.limit.toString())
    if (params?.status) query.append('status', params.status)

    return client.get<PaginatedResponse<{themes: Theme[]}>>(`themes?${query.toString()}`)
  },

  getById: (id: number) => client.get<Theme>(`themes/${id}`),

  create: (data: Partial<Theme>) => client.post<Theme>('themes', data),

  update: (id: number, data: Partial<Theme>) => client.post<Theme>(`themes/${id}`, data),

  delete: (id: number) => client.delete<{ message: string }>(`themes/${id}`),

  getActive: () => client.get<Theme[]>('themes/active'),
}

// Public API Types (for frontend public pages)
export interface PublicBook {
  id: number
  title: string
  subtitle?: string
  author: string
  year: string
  description: string
  pages: number
  rating?: number
  reviews?: number
  featured: boolean
  cover_image?: string
  category: string
  publisher?: string
  isbn?: string
  table_of_contents?: string[]
  key_themes?: string[]
  formats?: string[]
  excerpt?: string
  pdf_url?: string
}

export interface PublicSermon {
  id: number
  title: string
  date: string
  duration?: string
  summary: string
  content?: string
  key_points?: string[]
  scripture?: string
  has_audio: boolean
  has_video: boolean
  has_text: boolean
  audio_url?: string
  video_url?: string
  pdf_url?: string
  featured: boolean
  theme?: {
    id: number
    name: string
    color: string
  }
}

export interface PublicTheme {
  id: number
  name: string
  color: string
  description: string
  book?: {
    id: number
    title: string
    subtitle: string
    author: string
    rating: number
    reviews: number
    pages: number
    year: number
    cover: string
  }
  sermons: PublicSermon[]
  recentSermons: Array<{
    id: number
    title: string
    date: string
    duration: string
    description: string
    theme: string
  }>
}

export interface RecentSermon {
  id: number
  title: string
  date: string
  duration: string
  description: string
  theme: string
  themeColor: string
}

// Comment Types
export interface Comment {
  id: number
  entity_type: 'sermon' | 'book'
  entity_id: number
  name: string
  email: string
  comment: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface CreateCommentData {
  entity_type: 'sermon' | 'book'
  entity_id: number
  name: string
  email: string
  comment: string
}

// HTTP Client for public endpoints (no auth required)
class PublicHttpClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}/${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData
      )
    }

    const data = await response.json()
    
    if (!data.success && data.success !== undefined) {
      throw new ApiError(data.message || 'API Error', data.code || 500, data)
    }
    
    return data.data || data
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}

const publicClient = new PublicHttpClient(API_BASE_URL)

// Public API functions (no authentication required)
export const publicApi = {
  books: {
    getAll: () => publicClient.get<PublicBook[]>('public/books'),
    getFeatured: () => publicClient.get<PublicBook[]>('public/books/featured'),
    getById: (id: number) => publicClient.get<PublicBook>(`public/books/${id}`),
  },
  
  sermons: {
    getRecent: (limit?: number) => {
      const query = limit ? `?limit=${limit}` : '?limit=100'
      return publicClient.get<RecentSermon[]>(`public/sermons${query}`)
    },
    getById: (id: number) => publicClient.get<PublicSermon>(`public/sermons/${id}`),
  },

  themes: {
    getAll: () => publicClient.get<PublicTheme[]>('public/themes'),
  },

  comments: {
    getByEntity: (entityType: 'sermon' | 'book', entityId: number) =>
      publicClient.get<Comment[]>(`public/comments?entity_type=${entityType}&entity_id=${entityId}`),
    create: (data: CreateCommentData) =>
      publicClient.post<Comment>('public/comments', data),
  },
}