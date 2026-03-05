import { centersService } from '@/services/data/centers.service.mock';

export async function getCentersList() {
    return await centersService.getAll();
}

export async function getCenterById(id: string) {
    return await centersService.getById(id);
}
