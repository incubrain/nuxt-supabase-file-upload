<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="text-center text-teal-700 dark:text-gray-200 px-4 py-10">
    <div class="text-4xl">
      <UIcon name="i-carbon-warning" class="inline-block" />
    </div>
    <div>Not found</div>
    <div>
      <UButton @click="router.back()">
        Back
      </UButton>
    </div>
  </main>
</template>
