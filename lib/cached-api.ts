import { publicApi, type PublicBook, type PublicSermon, type PublicTheme, type RecentSermon, type Comment, type DailyDevotional } from './api'
import { cacheGet, cacheSet } from './cache'

// TTL values in milliseconds
const TTL = {
  THEMES: 24 * 60 * 60 * 1000,       // 24 hours
  BOOKS: 24 * 60 * 60 * 1000,        // 24 hours
  BOOK_DETAIL: 24 * 60 * 60 * 1000,  // 24 hours
  SERMONS: 1 * 60 * 60 * 1000,       // 1 hour
  SERMON_DETAIL: 6 * 60 * 60 * 1000, // 6 hours
  DEVOTIONAL: 12 * 60 * 60 * 1000,   // 12 hours
  COMMENTS: 5 * 60 * 1000,           // 5 minutes
} as const

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>, ttlMs: number): Promise<T> {
  // Skip cache on server side (SSR)
  if (typeof window === 'undefined') {
    return fetcher()
  }

  const cached = await cacheGet<T>(key)

  if (cached) {
    if (!cached.expired) return cached.data
    // Expired — return stale data, refresh in background
    fetcher().then(fresh => cacheSet(key, fresh, ttlMs)).catch(() => {})
    return cached.data
  }

  // No cache — fetch fresh
  const data = await fetcher()
  await cacheSet(key, data, ttlMs)
  return data
}

export const cachedApi = {
  themes: {
    getAll: () =>
      cachedFetch<PublicTheme[]>('themes', () => publicApi.themes.getAll(), TTL.THEMES),
  },

  books: {
    getAll: () =>
      cachedFetch<PublicBook[]>('books-all', () => publicApi.books.getAll(), TTL.BOOKS),
    getFeatured: () =>
      cachedFetch<PublicBook[]>('books-featured', () => publicApi.books.getFeatured(), TTL.BOOKS),
    getById: (id: number) =>
      cachedFetch<PublicBook>(`book-${id}`, () => publicApi.books.getById(id), TTL.BOOK_DETAIL),
  },

  sermons: {
    getRecent: (limit?: number) =>
      cachedFetch<RecentSermon[]>(`sermons-recent-${limit ?? 'all'}`, () => publicApi.sermons.getRecent(limit), TTL.SERMONS),
    getById: (id: number) =>
      cachedFetch<PublicSermon>(`sermon-${id}`, () => publicApi.sermons.getById(id), TTL.SERMON_DETAIL),
  },

  devotional: {
    getToday: () =>
      cachedFetch<DailyDevotional>('devotional-today', () => publicApi.devotional.getToday(), TTL.DEVOTIONAL),
  },

  comments: {
    getByEntity: (type: 'sermon' | 'book', id: number) =>
      cachedFetch<Comment[]>(`comments-${type}-${id}`, () => publicApi.comments.getByEntity(type, id), TTL.COMMENTS),
  },
}
