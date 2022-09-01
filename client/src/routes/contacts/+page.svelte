<script lang="ts">
    import { store } from '../../lib/store';
    import VirtualList from 'svelte-tiny-virtual-list';
    import Contact from '../../lib/Contact.svelte';

    let selectedIndex = -1
</script>

<h1>Contacts</h1>
<div class="contacts-container">
    {#if $store.contacts.length > 0 }
        <div class="contacts-list">
            <VirtualList
                    height={400}
                    itemCount={$store.contacts.length}
                    itemSize={25}>
                <div slot="item" let:index let:style {style} on:click={() => { selectedIndex = index}}>
                    <div tabindex={index} class="contact-item" >{index+1}. {$store.contacts[index].name}</div>
                </div>
            </VirtualList>
        </div>
        {#key selectedIndex}
           <Contact {...selectedIndex !== -1 && $store.contacts[selectedIndex]}/>
        {/key}
    {/if}
</div>

<style>
    .contacts-container {
        display: flex;
        margin: 10px;
        border: solid;
        min-width: 400px;
    }

    .contacts-list {
        cursor: pointer;
        height: 400px;
        margin: 10px;
        border: solid;
        width: 60%;
    }

    .contact-item {
        margin: 5px;
    }

    .contact-item:focus {
        background-color: cornflowerblue;
    }
</style>
