<script lang="ts">
  import type { NewsCluster } from '$lib/types';
  import NewsCard from './NewsCard.svelte';
  import FeaturedNewsCard from './FeaturedNewsCard.svelte';

  export let clusters: NewsCluster[];
  
  // Featured news is the first item with an image
  $: featuredCluster = clusters.find(c => c.articles.some(a => a.image)) ?? clusters[0];
  $: remainingClusters = clusters.filter(c => c !== featuredCluster);
</script>

<div class="space-y-12">
  <!-- Featured News -->
  <div class="w-full lg:w-3/4 mx-auto">
    <FeaturedNewsCard cluster={featuredCluster} />
  </div>

  <!-- Section Divider -->
  <div class="flex items-center gap-4">
    <div class="h-px flex-1 bg-border"></div>
    <h2 class="text-xl font-semibold text-muted-foreground">More Stories</h2>
    <div class="h-px flex-1 bg-border"></div>
  </div>

  <!-- News Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each remainingClusters as cluster (cluster.cluster_number)}
      <div class="transform transition-all duration-300 hover:-translate-y-1">
        <NewsCard {cluster} />
      </div>
    {/each}
  </div>
</div>

<style>
  /* Optional: Add masonry-like effect for larger screens */
  @media (min-width: 1024px) {
    .grid {
      grid-auto-flow: dense;
    }
  }
</style> 