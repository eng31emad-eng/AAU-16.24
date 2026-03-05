import { facultyService } from '@/services/data/faculty.service.mock';

export async function getFacultyList() {
    return await facultyService.getAllMembers();
}

export async function getFacultyById(id: string) {
    return await facultyService.getMemberById(id);
}
