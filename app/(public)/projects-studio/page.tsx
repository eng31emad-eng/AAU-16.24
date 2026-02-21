import { projectsService } from '@/services/data/projects.service.mock';
import ProjectsStudioPageContent from '@/components/ProjectsStudioPageContent';
import { Metadata } from 'next';

// ISR Revalidation (1 day)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'مشاريع التخرج | Graduation Projects',
  description: 'مشاريع التخرج المبتكرة لطلاب جامعة الجيل الجديد - Al-Jeel Al-Jadeed University Graduation Projects Gallery',
};

export default async function ProjectsStudioPage() {
  const current = await projectsService.getCurrent();
  const completed = await projectsService.getCompleted();
  const studio = await projectsService.getStudio();

  return (
    <ProjectsStudioPageContent
      initialCurrentProjects={current}
      initialCompletedProjects={completed}
      initialStudioProjects={studio}
    />
  );
}






