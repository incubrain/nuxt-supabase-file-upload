<script setup lang="ts">
const route = useRoute<'user-id'>()
const user = useUserStore()
const name = route.params.id

watchEffect(() => {
  user.setNewName(route.params.id as string)
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div>
    <UIcon
      name="i-heroicons-hand-raised"
      class="inline-block animate-shake-x animate-duration-5000 text-4xl"
    />

    <h3 class="text-2xl font-medium">
      Hi, {{ name }}!
    </h3>

    <FileUpload />

    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
