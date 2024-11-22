<script lang="ts">
  import type { NewsCluster } from '$lib/types';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { timeAgo } from '$lib/utils/date';

  export let cluster: NewsCluster;

  $: mainArticle = cluster.articles.find(article => article.image) ?? cluster.articles[0];
</script>

<Card class="overflow-hidden h-full hover:bg-muted/50 transition-colors">
  {#if mainArticle?.image}
    <div class="relative aspect-video w-full">
      <img
        src={mainArticle.image}
        alt={mainArticle.image_caption || cluster.title}
        class="object-cover w-full h-full"
      />
      {#if mainArticle.image_caption}
        <div class="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
          {mainArticle.image_caption}
        </div>
      {/if}
    </div>
  {/if}

  <CardHeader>
    <div class="flex items-center gap-3">
      <span class="text-3xl">{cluster.emoji}</span>
      <div class="space-y-2">
        <CardTitle class="text-3xl font-bold">{cluster.title}</CardTitle>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <span class="bg-primary/10 text-primary px-2 py-1 rounded">
            {cluster.category}
          </span>
          <span>•</span>
          <span>{timeAgo(mainArticle?.date ?? '')}</span>
        </div>
      </div>
    </div>
  </CardHeader>

  <CardContent>
    <p class="text-lg text-muted-foreground mb-8">{cluster.short_summary}</p>

    <div class="grid grid-cols-2 gap-8">
      <!-- Key Points -->
      <div class="space-y-4">
        <h4 class="font-semibold text-lg">Key Points</h4>
        <ul class="space-y-3">
          {#each cluster.talking_points.slice(0, 3) as point}
            <li class="text-muted-foreground flex gap-2">
              <span class="text-primary">•</span>
              {point}
            </li>
          {/each}
        </ul>
      </div>

      <!-- Sources -->
      <div class="space-y-4">
        <h4 class="font-semibold text-lg">Sources</h4>
        <div class="flex flex-wrap gap-2">
          {#each cluster.domains as domain}
            <img
              src={domain.favicon}
              alt={domain.name}
              title={domain.name}
              class="w-6 h-6 rounded-sm"
              loading="lazy"
            />
          {/each}
        </div>
      </div>
    </div>
  </CardContent>
</Card>
