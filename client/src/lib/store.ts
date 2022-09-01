import { writable } from 'svelte/store';

export type Contact = { name: string, id: string, phone: string, email: string, address: string }

type State = { password: string, contacts: Contact[] }

const initialState: State = { password: '', contacts: [] }

export const store = writable(initialState);
