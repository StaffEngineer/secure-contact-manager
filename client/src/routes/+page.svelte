<script lang="ts">
    import type { PageData } from './$types';
    import { store } from '../lib/store';
    import { goto } from '$app/navigation'
    import { api } from './api';

    export let data: PageData;

    let password = '';
    let isWrongPassword = false;

    const handleOnSubmit = async () => {
        if (!data.storeExist && password !== '') {
            const response = await api('POST', 'store', { password });
            if (response.status === 200) {
                store.set({ password, contacts: [] })
                goto('/contacts')
            }
        } else {
            const response = await api('GET', `contacts?password=${password}`);
            if (response.status === 200) {
                const contacts = await response.json()
                store.set({ password, contacts })
                goto('/contacts')
            }
            if (response.status === 401) {
                isWrongPassword = true
            }
        }
    }
</script>

<svelte:head>
    <title>Secure Contact Manager</title>
    <meta name="description" content="Secure Contact Manager" />
</svelte:head>

<div class="startup">
    <div>
        <p>Welcome to Secure Contact Manager</p>
        {#if data.storeExist }
            <p>Please enter a password for your contact data file</p>
        {:else }
            <p>Please enter a password for your new contact data file</p>
        {/if}
        <form on:submit|preventDefault={handleOnSubmit}>
            <input bind:value={password} on:input={() => { isWrongPassword = false }}>
            <button type="submit">OK</button>
        </form>
        {#if isWrongPassword }
            <p class="error">Password is wrong, please try again</p>
        {/if}
    </div>
</div>

<style>
    .startup {
        height: 300px;
    }

    .startup .error {
        color: rgb(255, 0, 0);
    }
</style>
