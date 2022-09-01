<script lang="ts">
    export let name: string;
    export let phone: string;
    export let email: string;
    export let address: string;
    export let id: string;

    let errorMessage = '';

    function handleAdd() {
        errorMessage = name == null || name === '' ? 'Name is required for creating a new contact' : ''
    }

    function handleEdit() {
        if (id == null) {
            errorMessage = 'Select contact for editing'
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
