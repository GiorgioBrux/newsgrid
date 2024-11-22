<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchCategories, fetchNewsByCategory } from '$lib/services/news';
  import type { NewsCategory, NewsResponse } from '$lib/types';
  import NewsGrid from '$lib/components/news/NewsGrid.svelte';
  import { Button } from '$lib/components/ui/button';

  let categories: NewsCategory[] = [];
  let currentCategory: string = 'World';
  let newsData: NewsResponse | null = null;
  let loading = false;

  async function loadNews(category: NewsCategory) {
    loading = true;
    try {
      currentCategory = category.name;
      newsData = await fetchNewsByCategory(category.file);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    try {
      const data = await fetchCategories();
      categories = data.categories;
      if (categories.length > 0) {
        await loadNews(categories[0]);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  });
</script>

<div class="container mx-auto px-4 py-8">
  <!-- Category Navigation -->
  <div class="flex flex-wrap gap-2 mb-8">
    {#each categories as category}
      <Button 
        variant={currentCategory === category.name ? 'default' : 'outline'}
        onclick={() => loadNews(category)}
      >
        {category.name}
      </Button>
    {/each}
  </div>

  <!-- News Content -->
  {#if loading}
    <div class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  {:else if newsData?.clusters}
    <NewsGrid clusters={newsData.clusters} />
  {/if}
</div>
