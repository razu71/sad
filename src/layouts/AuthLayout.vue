<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-dvh bg-[var(--background)] text-[var(--foreground)]">
    <main class="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center p-6">
      <RouterView />
    </main>
  </div>
</template>
