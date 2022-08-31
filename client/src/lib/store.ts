import { writable } from 'svelte/store';

type Contact = { id: string, name: string, phone: number, email: string, address: string }

type State = {
    password: string
    contacts: Contact[]
}

const initialState: State = {
    password: '',
    contacts: []
}

export const store = writable(initialState);
