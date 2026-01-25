import { offersService } from '@/services/data/offers.service.mock';

export async function getOffersList() {
    return await offersService.getAll();
}

export async function getOfferById(id: string) {
    return await offersService.getById(id);
}
