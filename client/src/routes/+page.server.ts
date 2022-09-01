import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import { api } from '../lib/api';

export const load: PageServerLoad = async () => {
    const response = await api('HEAD', 'store');

    if (response.status === 404) {
        return { storeExist: false };
    }

    if (response.status === 200) {
        return { storeExist: true };
    }

    throw error(response.status);
};
