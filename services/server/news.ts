import { newsService } from '@/services/data/news.service.mock'

export async function getNewsList() {
    return await newsService.getAll()
}

export async function getNewsBySlug(slug: string) {
    return await newsService.getBySlug(slug)
}
