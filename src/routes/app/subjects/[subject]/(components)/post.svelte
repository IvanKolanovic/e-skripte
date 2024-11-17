<script lang="ts">
    import type { Post } from '$lib/api/interfaces';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
    import { Badge } from '$lib/components/ui/badge';

    export let post: Post;
</script>

<Card class="w-full mb-4 hover:shadow-lg transition-shadow">
    <CardHeader>
        <div class="flex items-center gap-4">
            <Avatar>
                <AvatarImage src={post.author.picture} alt={`${post.author.firstName} ${post.author.lastName}`} />
                <AvatarFallback>{post.author.firstName[0]}{post.author.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle class="text-xl">{post.title}</CardTitle>
                <CardDescription>
                    Posted by {post.author.firstName} {post.author.lastName}
                </CardDescription>
            </div>
        </div>
    </CardHeader>
    
    <CardContent>
        <div class="prose prose-sm max-w-none">
            {post.content}
        </div>

        {#if post.materials && post.materials.length > 0}
            <div class="mt-4">
                <h4 class="text-sm font-semibold mb-2">Materials:</h4>
                <div class="flex flex-wrap gap-2">
                    {#each post.materials as material}
                        <a href={material.material} target="_blank" rel="noopener noreferrer">
                            <Badge variant="secondary" class="hover:bg-secondary/80 cursor-pointer">
                                File
                            </Badge>
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </CardContent>
</Card>
