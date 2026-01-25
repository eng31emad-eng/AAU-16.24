import { getBlogPosts, getBlogPostById } from '@/services/data/blog.service.mock'

export async function getBlogList() {
    return await getBlogPosts()
}

export async function getBlogById(id: string) {
    return await getBlogPostById(id)
}
