<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Sun, Moon, Info } from "lucide-svelte";
  import { buttonVariants } from "$lib/components/ui/button";
  let isDarkMode = false;
  
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark');
  }
</script>

<header class="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
  <div class="container mx-auto px-4 h-16 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <h1 class="text-xl font-bold">NewsGrid</h1>
      <span class="text-sm text-muted-foreground">AI-Powered News Aggregator</span>
    </div>

    <div class="flex items-center gap-2">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
            <Info class="h-5 w-5" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <div class="p-4 max-w-sm">
            <h2 class="font-semibold mb-2">About NewsGrid</h2>
            <p class="text-sm text-muted-foreground">
              NewsGrid is an AI-powered news aggregator that clusters related news stories 
              and provides summaries so you can quickly glance at the most important news.

              The data is from Kagi's Kite, available at <a href="https://kite.kagi.com" target="_blank" class="text-primary">kite.kagi.com</a>.
              Check them out!
            </p>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Button variant="ghost" size="icon" onclick={toggleTheme}>
        {#if isDarkMode}
          <Sun class="h-5 w-5" />
        {:else}
          <Moon class="h-5 w-5" />
        {/if}
      </Button>
    </div>
  </div>
</header> 