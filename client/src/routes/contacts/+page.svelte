<script lang="ts">
    import { store } from '../../lib/store';
    import VirtualList from 'svelte-tiny-virtual-list';
    import { get } from 'svelte/store';
    import { onDestroy } from 'svelte';
    import Contact from '../../lib/Contact.svelte';

    let selectedIndex = -1
    let needle: string;

    const { password, contacts } = get(store)

    let filteredContacts = contacts;

    function handleFilter() {
        const { contacts } = get(store)
        filteredContacts = contacts
        if (needle == null || needle === '') return

        filteredContacts = []
        contacts.forEach((contact) => {
            const text = `${contact.name}${contact.phone}${contact.email}${contact.address}`
            if (text.toLowerCase().includes(needle.toLowerCase())) {
                filteredContacts.push(contact)
            }
        })
    }

    const unsubscribe = store.subscribe(handleFilter);

    onDestroy(unsubscribe);
</script>

<h1>Contacts</h1>
{#if password }
<div class="contacts-container">
    <div class="contacts-panel">
        <input class='filter' bind:value={needle} placeholder="Filter" on:input={handleFilter}>
        <div class="contacts-list">
            {#if filteredContacts.length > 0 }
                <VirtualList
                    height={400}
                    itemCount={filteredContacts.length}
                    itemSize={25}>
                    <div slot="item" let:index let:style {style} on:click={() => { selectedIndex = index}}>
                        <div tabindex={index} class="contact-item" >{index+1}. {filteredContacts[index].name}</div>
                    </div>
                </VirtualList>
            {/if}
        </div>
    </div>
    {#key selectedIndex}
        <Contact {...selectedIndex !== -1 && { ...filteredContacts[selectedIndex]}}/>
    {/key}
</div>
{:else }
    <p>Please, log in again.</p>
{/if}

<style>
    .filter {
        margin: 10px 0 0 10px;
        width: 35px
    }

    .contacts-panel {
        width: 50%;
    }

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
    }

    .contact-item {
        margin: 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .contact-item:focus {
        background-color: cornflowerblue;
    }
</style>
