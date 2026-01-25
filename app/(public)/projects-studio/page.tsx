import { projectsService } from '@/services/data/projects.service.mock';
import ProjectsStudioPageContent from '@/components/ProjectsStudioPageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 day)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'استوديو المشاريع | Projects Studio',
  description: 'مشاريع الطلاب المبتكرة في جامعة الجيل الجديد - Al-Jeel Al-Jadeed University Student Projects Studio',
};

export default async function ProjectsStudioPage() {
  const current = await projectsService.getCurrent();
  const completed = await projectsService.getCompleted();

  return (
    <ProjectsStudioPageContent initialCurrentProjects={current} initialCompletedProjects={completed} />
  );
}






