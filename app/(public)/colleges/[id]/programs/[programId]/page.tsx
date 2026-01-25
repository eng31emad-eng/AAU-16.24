import { notFound } from 'next/navigation';
import { getProgramByIds, getCollegesList } from '@/services/server/colleges';
import ProgramDetailsContent from '@/components/ProgramDetailsContent';
import { Metadata } from 'next';

export const revalidate = 86400; // 1 day

interface PageProps {
    params: Promise<{ id: string; programId: string }>;
}

export async function generateStaticParams() {
    const colleges = await getCollegesList();
    const paths = [];

    for (const college of colleges) {
        if (college.programs) {
            for (const program of college.programs) {
                paths.push({
                    id: college.id,
                    programId: program.id,
                });
            }
        }
    }

    return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id: collegeId, programId } = await params;
    const result = await getProgramByIds(collegeId, programId);

    if (!result) {
        return {
            title: 'Program Not Found',
        };
    }

    const { program, college } = result;

    return {
        title: `${program.nameEn} | ${college.nameEn}`,
        description: program.descriptionEn,
        openGraph: {
            title: `${program.nameEn} | ${college.nameEn}`,
            description: program.descriptionEn,
            images: [program.image || college.image || ''],
        },
    };
}

export default async function ProgramDetailsPage({ params }: PageProps) {
    const { id: collegeId, programId } = await params;
    const result = await getProgramByIds(collegeId, programId);

    if (!result) {
        notFound();
    }

    const { college, program } = result;

    // Faculty members are already attached to the program in the service layer if available
    const facultyMembers = program.facultyMembers || [];

    const relatedPrograms = college.programs
        .filter(p => p.id !== program.id)
        .slice(0, 5);

    return (
        <ProgramDetailsContent
            college={college}
            program={program}
            facultyMembers={facultyMembers}
            relatedPrograms={relatedPrograms}
        />
    );
}
