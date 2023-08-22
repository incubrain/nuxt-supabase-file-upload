<script setup lang='ts'>
const { count, inc, dec } = useCount()
</script>

<template>
  <div class="inline-flex my-3">
    <UButton class="rounded-full" @click="dec()">
      <UIcon name="i-carbon-subtract" />
    </UButton>
    <div class="font-mono w-15 mx-auto inline-block">
      {{ count }}
    </div>
    <UButton @click="inc()">
      <UIcon name="i-mdi-add" />
    </UButton>
  </div>
</template>
