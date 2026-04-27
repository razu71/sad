<script setup lang="ts">
import { Github } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div class="space-y-3">
    <p class="text-center text-xs text-[var(--muted-foreground)]">Or continue with</p>
    <div class="grid grid-cols-2 gap-2">
      <Button type="button" variant="outline" class="w-full" @click.prevent>
        <span class="inline-flex items-center gap-2">
          <span class="text-lg font-bold text-[var(--primary)]" aria-hidden="true">G</span>
          <span>Google</span>
        </span>
      </Button>
      <Button type="button" variant="outline" class="w-full" @click.prevent>
        <span class="inline-flex items-center gap-2">
          <Github class="h-4 w-4" aria-hidden="true" />
          <span>GitHub</span>
        </span>
      </Button>
    </div>
    <p class="text-center text-[10px] text-[var(--muted-foreground)]">Visual only — no OAuth in v1</p>
  </div>
</template>
