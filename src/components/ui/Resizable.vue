<template>
  <div class="grid min-h-40 grid-cols-2 gap-2">
    <div class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-2">
      <slot name="left" />
    </div>
    <div class="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-2">
      <slot name="right" />
    </div>
  </div>
</template>
