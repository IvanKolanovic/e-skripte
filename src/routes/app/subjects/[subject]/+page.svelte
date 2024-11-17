<script lang="ts">
	import Post from "./(components)/post.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Plus } from "lucide-svelte";

    const props = $props()
    const subject = props.data.completeSubject

</script>

<div class="container mx-auto max-w-4xl px-4 py-8">

    {#each subject.posts as post}
        <Post post={post} />
    {/each}
    
    <Button
        variant="default"
        size="icon"
        class="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl"
        href={`/app/subjects/${props.data.subjectId}/new`}
    >
        <Plus class="h-6 w-6" />
    </Button>
</div>