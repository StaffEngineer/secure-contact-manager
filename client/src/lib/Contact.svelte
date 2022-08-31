<script lang="ts">
    export let name: string;
    export let phone: string;
    export let email: string;
    export let address: string;
    export let id: string;
</script>

<div class="contact">
    <input bind:value={name} placeholder="Enter name">
    <input bind:value={phone} placeholder="Enter phone number">
    <input bind:value={email} placeholder="Enter email">
    <textarea bind:value={address} placeholder="Enter address"></textarea>
</div>

<style>
    .contact input { width: 95%; margin: 5px 0}
    textarea { width: 95%; height: 50px; margin: 5px 0 }
    .contact { margin: 10px; }
</style>
