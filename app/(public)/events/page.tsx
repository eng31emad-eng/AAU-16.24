import { eventsService } from '@/services/data/events.service.mock';
import EventsPageContent from '@/components/EventsPageContent';
import { Metadata } from 'next';

// ISR Revalidation (15 minutes)
export const revalidate = 900;

export const metadata: Metadata = {
  title: 'الفعاليات | Events',
  description: 'فعاليات وأنشطة جامعة الجيل الجديد - Al-Jeel Al-Jadeed University Events and Activities',
};

export default async function EventsPage() {
  const events = await eventsService.getAllEvents();

  return (
    <EventsPageContent initialEvents={events} />
  );
}





