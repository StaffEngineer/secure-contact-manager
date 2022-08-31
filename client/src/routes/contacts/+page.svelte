<script lang="ts">
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<div>
    <p>Welcome to Secure Contact Manager</p>
    {#if data.storeExist }
        <p>Please enter a password for your contact data file</p>
    {:else }
        <p>Please enter a password for your new contact data file</p>
    {/if}
</div>
