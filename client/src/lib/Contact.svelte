<script lang="ts">
    import { get } from 'svelte/store';

    import { api } from './api';
    import { store } from './store';

    export let name ='';
    export let phone = '';
    export let email = '';
    export let address = '';
    export let id = '';

    let errorMessage = '';

    const { password } = get(store)

    async function updateContactsList() {
        const response = await api('GET', `contacts?password=${password}`);
        if (response.status === 200) {
            const contacts = await response.json()
            store.set({ password, contacts })
        }
    }

    function isValid(): boolean {
        errorMessage = '';
        if (address === '') errorMessage = 'Address is required'
        if (email === '') errorMessage = 'Email is required'
        if (phone === '') errorMessage = 'Phone is required'
        if (name === '') errorMessage = 'Name is required'
        return errorMessage === ''
    }

    async function handleAdd() {
        if (!isValid()) return

        const response = await api('POST', `contact?password=${password}`, { name, phone, email, address });
        if (response.status === 200) {
            await updateContactsList()
        } else {
            errorMessage = 'Error while creating a new contact';
        }
    }

    async function handleEdit() {
        if (id === '') {
            errorMessage = 'Select contact for editing'
            return
        }

        if (!isValid()) return

        const updatedContact = { id, name, phone, email, address }
        const response = await api('PUT', `contact/${id}?password=${password}`, updatedContact);

        if (response.status === 200) {
            await updateContactsList()
        } else {
            errorMessage = `Error while updating ${name} contact`;
        }
    }
</script>

<div class="contact">
    <input bind:value={name} placeholder="Enter name">
    <input bind:value={phone} placeholder="Enter phone number">
    <input bind:value={email} placeholder="Enter email">
    <textarea bind:value={address} placeholder="Enter address"></textarea>
    <div>
        <button on:click={handleAdd}>
            Add
        </button>
        <button on:click={handleEdit}>
            Edit
        </button>
        {#if errorMessage !== ''}
            <p class="error">{errorMessage}</p>
        {/if}
    </div>
</div>

<style>
    .contact button { margin: 10px 10px 0 0 }
    .contact input { width: 95%; margin: 5px 0}
    .contact textarea { width: 95%; height: 70px; margin: 5px 0 }
    .contact { margin: 10px; }
</style>
