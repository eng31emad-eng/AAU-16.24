import { getHomeData } from '@/services/server/home'
import HomeContent from '@/components/HomeContent'

// ISR Revalidation (e.g. every 5 minutes)
export const revalidate = 300;

export default async function HomePage() {
    // Fetch data from Server Data Layer
    const { events, news, colleges, faqs } = await getHomeData()

    return (
        <HomeContent
            events={events.slice(0, 4)}
            news={news.slice(0, 4)}
            colleges={colleges}
            faqs={faqs.slice(0, 6)}
        />
    )
}


