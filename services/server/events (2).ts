import { eventsService } from '@/services/data/events.service.mock'

export async function getEventsList() {
    return await eventsService.getAllEvents()
}

export async function getEventBySlug(slug: string) {
    return await eventsService.getEventBySlug(slug)
}
