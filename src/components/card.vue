<template>
  <div class="card">
    <div class="card-header">
      <span class="title">{{ title }}</span>
      <span class="author">{{ author }}</span>
    </div>
    <div class="card-content">
      <!-- <slot></slot> -->
      {{ 
        main
       }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  author?: string;
  main?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  author: '匿名作者',
  main: '默认内容',
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.card-content {
  padding: 16px;
}
</style>