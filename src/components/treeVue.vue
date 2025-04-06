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
withDefaults(defineProps<{ treeData?: TreeList[] }>(), {
  treeData: [
    {
      name: "节点1",
      checked: false,
      children: [
        {
          name: "子节点1-1",
          checked: true,
          children: [
            {
              name: "孙节点1-1-1",
              checked: false,
            },
          ],
        },
        {
          name: "子节点1-2",
          checked: false,
        },
      ],
    },
    {
      name: "节点2",
      checked: true,
      children: [
        {
          name: "子节点2-1",
          checked: false,
        },
      ],
    },
    {
      name: "节点3",
      checked: false,
    },
  ],
});
// const props = defineProps<{
//   treeData?: TreeList[];
// }>();

const clickItem = (e: TreeList) => {
  console.log(e);
};
</script>

<style scoped>
.treeDiv {
  margin-left: 11px;
}
</style>