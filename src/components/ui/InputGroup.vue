<template>
  <div class="flex w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)]">
    <div v-if="$slots.prefix" class="flex items-center border-r border-[var(--border)] px-3 text-sm text-[var(--muted-foreground)]">
      <slot name="prefix" />
    </div>
    <div class="min-w-0 flex-1">
      <slot />
    </div>
    <div v-if="$slots.suffix" class="flex items-center border-l border-[var(--border)] px-3 text-sm text-[var(--muted-foreground)]">
      <slot name="suffix" />
    </div>
  </div>
</template>
