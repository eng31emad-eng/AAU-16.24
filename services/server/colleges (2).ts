import { collegesService } from '@/services/data/colleges.service.mock';
import { facultyService } from '@/services/data/faculty.service.mock';
import { College } from '@/types';

export async function getCollegesList() {
    return await collegesService.getAllColleges();
}

export async function getCollegeById(id: string) {
    return await collegesService.getCollegeById(id);
}

export async function getCollegeFaculty(college: College) {
    const allFaculty = await facultyService.getAllMembers();
    return allFaculty.filter(
        member => member.collegeAr === college.nameAr || member.collegeEn === college.nameEn
    );
}

export async function getProgramByIds(collegeId: string, programId: string) {
    return await collegesService.getProgramById(collegeId, programId);
}

export async function getProgramsForCollege(collegeId: string) {
    const college = await collegesService.getCollegeById(collegeId);
    return college?.programs || [];
}
