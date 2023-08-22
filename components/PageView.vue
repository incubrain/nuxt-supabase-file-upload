<script setup lang="ts">
const { data } = await useFetch('/api/pageview')

const time = useTimeAgo(() => data.value?.startAt || 0)
</script>

<template>
  <div class="text-gray-800/80">
    <span class="font-normal text-gray-500">{{ data?.pageview }}</span>
    page views since
    <span class="text-gray-500">{{ time }}</span>
  </div>
</template>
