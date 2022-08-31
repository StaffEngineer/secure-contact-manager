<script lang="ts">
    import { store } from '../../lib/store';
    import VirtualList from 'svelte-tiny-virtual-list';
</script>

<div class="contacts">
    {#if $store.contacts.length > 0 }
        <p>Contacts:</p>
        <VirtualList
                width="150%"
                height={500}
                itemCount={$store.contacts.length}
                itemSize={35}>
            <div slot="item" let:index let:style {style}>
                <div tabindex="-1" class="contact" >{index+1}. {$store.contacts[index].name}</div>
            </div>
        </VirtualList>
    {/if}
</div>

<style>
    .contacts {
        cursor: pointer;
        height: 400px;
    }

    .contact:focus {
        background-color: cornflowerblue;
    }
</style>
