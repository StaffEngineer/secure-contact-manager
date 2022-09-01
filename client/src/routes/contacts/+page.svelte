<script lang="ts">
    import { store } from '../../lib/store';
    import VirtualList from 'svelte-tiny-virtual-list';
    import Contact from '../../lib/Contact.svelte';
    import { get } from 'svelte/store';

    let selectedIndex = -1
    let needle: string;

    const { password } = get(store)

    let indexes: number[] | undefined

    function handleFilter() {
        indexes = undefined
        if (needle == null || needle === '') return
        const { contacts } = get(store)

        indexes = []
        contacts.forEach((contact, index) => {
            const text = `${contact.name}${contact.phone}${contact.email}${contact.address}`
            if (text.toLowerCase().includes(needle.toLowerCase())) {
                indexes!.push(index)
            }
        })
    }
</script>

<h1>Contacts</h1>
<div class="contacts-container">
    {#if $store.contacts.length > 0 }
        <div class="contacts-panel">
            <input class='filter' bind:value={needle} placeholder="Filter" on:input={handleFilter}>
            <div class="contacts-list">
                <VirtualList
                        height={400}
                        itemCount={$store.contacts.length}
                        itemSize={25}>
                    <div slot="item" let:index let:style {style} on:click={() => { selectedIndex = index}}>
                        {#if indexes === undefined  }
                             <div tabindex={index} class="contact-item" >{index+1}. {$store.contacts[index].name}</div>
                        {/if}
                        {#if indexes && indexes.length && indexes.includes(index)  }
                            <div tabindex={index} class="contact-item" >{index+1}. {$store.contacts[index].name}</div>
                        {/if}
                    </div>
                </VirtualList>
            </div>
        </div>
    {/if}
    {#if password }
        {#key selectedIndex}
            <Contact {...selectedIndex !== -1 && { ...$store.contacts[selectedIndex]}}/>
        {/key}
        {:else }
           <p>Please, log in again.</p>
    {/if}

</div>

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

    .contacts-container p {
        margin: 5px;
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
