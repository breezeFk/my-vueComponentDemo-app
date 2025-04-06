<template>
  <div class="treeDiv">
    <!-- {{ treeData }} -->
    <div v-for="item in treeData" @click.stop="clickItem(item)">
      <input type="checkbox" v-model="item.checked" />
      <span>
        {{ item.name }}
        <!--  -->
      </span>
      <treeVue v-if="item.children?.length" :treeData="item.children"></treeVue>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TreeList {
  name: string;
  checked: boolean;
  children?: TreeList[];
}
const props = defineProps<{
  treeData?: TreeList[];
}>();
const clickItem = (e: TreeList) => {
  console.log(e);
}
</script>

<style scoped>
.treeDiv {
  margin-left: 11px;
}
</style>