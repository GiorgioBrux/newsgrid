<script lang="ts">
  import type { NewsCluster } from '$lib/types';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { timeAgo } from '$lib/utils/date';

  export let cluster: NewsCluster;
  
  $: mainArticle = cluster.articles.find(article => article.image) ?? cluster.articles[0];
</script>

<Card class="h-full hover:bg-muted/50 transition-colors group">
  {#if mainArticle?.image}
    <div class="relative h-48 w-full overflow-hidden">
      <img
        src={mainArticle.image}
        alt={mainArticle.image_caption || cluster.title}
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  {/if}

  <CardHeader>
    <div class="flex items-center gap-2">
      <span class="text-2xl">{cluster.emoji}</span>
      <CardTitle class="text-lg">{cluster.title}</CardTitle>
    </div>
  </CardHeader>

  <CardContent class="space-y-4">
    <p class="text-sm text-muted-foreground">
      {cluster.short_summary}
    </p>

    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
          {cluster.category}
        </span>
        <span class="text-xs text-muted-foreground">{timeAgo(mainArticle?.date ?? '')}</span>
      </div>

      <div class="flex flex-wrap items-center gap-1">
        {#each cluster.domains as domain, i}
          <img
            src={domain.favicon}
            alt={domain.name}
            title={domain.name}
            class="w-4 h-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        {/each}
      </div>
    </div>
  </CardContent>
</Card> 