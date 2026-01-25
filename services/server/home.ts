import { newsService } from '@/services/data/news.service.mock'
import { eventsService } from '@/services/data/events.service.mock'
import { collegesService } from '@/services/data/colleges.service.mock'
import { campusLifeService } from '@/services/data/campuslife.service.mock'
import { projectsService } from '@/services/data/projects.service.mock'
import { faqService } from '@/services/data/faq.service.mock'
import { offersService } from '@/services/data/offers.service.mock'

export interface HomeData {
    events: any[]
    news: any[]
    colleges: any[]
    campusLife: any[]
    projects: any[]
    faqs: any[]
    offers: any[]
}

export async function getHomeData(): Promise<HomeData> {
    const [eventsData, newsData, collegesData, campusData, projectsData, faqData, offersData] = await Promise.all([
        eventsService.getAllEvents(),
        newsService.getAll(),
        collegesService.getAllColleges(),
        campusLifeService.getAllItems(),
        projectsService.getAll(),
        faqService.getAll(),
        offersService.getAll(),
    ])

    // Return raw data, slicing can happen here or in the component. 
    // User requested aggregation. To keep the component clean as per "Server Data Layer" pattern,
    // we might want to return everything and let the component decide, or return 'home page specific' data.
    // Given the instruction "aggregates...", I will return the raw lists mostly or maybe sliced if it's specific to home.
    // However, commonly the service returns the data objects.
    // I will return the arrays as is, and let the page slice them as it currently does, 
    // to minimize logic change in the view layer, or slice them here if I want 'getHomeData' to be 'data for home page'.
    // But usually getHomeData might imply 'data required for home page'.
    // The page slices: events(0,4), news(0,4), campusLife(0,9), faqs(0,6).
    // I will return the full lists for now so the page logic remains closer to original for slicing,
    // OR strictly I could move the slicing here.
    // Let's stick to returning the data the page requested.

    return {
        events: eventsData,
        news: newsData,
        colleges: collegesData,
        campusLife: campusData,
        projects: projectsData,
        faqs: faqData,
        offers: offersData
    }
}
