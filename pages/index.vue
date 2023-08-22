<script setup lang="ts">
const online = useOnline()
</script>

<template>
  <div>
    <Logos class="mb-6" />
    <Suspense>
      <ClientOnly>
        <PageView v-if="online" />
        <div v-else class="text-stone-800/80">
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div class="italic">
          <span class="animate-pulse">Loading...</span>
        </div>
      </template>
    </Suspense>
    <InputEntry />
  </div>
</template>
