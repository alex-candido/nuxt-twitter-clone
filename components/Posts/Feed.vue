<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>

const props = defineProps({
  userId: {
    type: String,
    default: '',
  },
  posts: {
    type: Array as PropType<Object[]>,
    required: true
  }
})
// const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
console.log(props.posts[0])

</script>
<template>
  <div class="dark:bg-dim-900">
    <PostsItem
      v-for="(post, index) in posts"
      :key="index"
      :user-id="props.userId"
      :data="post"
    />
  </div>
</template>
