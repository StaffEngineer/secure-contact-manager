import { error } from '@sveltejs/kit';
import { api } from './api';
import type { PageServerLoad, Action } from './$types';

export const load: PageServerLoad = async () => {
    const response = await api('HEAD', `store`);

    if (response.status === 404) {
        return { storeExist: false };
    }

    if (response.status === 200) {
        return { storeExist: true };
    }

    throw error(response.status);
};
