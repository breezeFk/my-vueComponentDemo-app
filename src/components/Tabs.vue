<template>
  <div>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: activeTab.name === tab.name }"
        @click="activeTab = tab"
      >
        {{ tab.name }}
      </div>
    </div>
    <component :is="activeTab.component" />
  </div>
</template>

<script setup>
import { ref,markRaw } from "vue";
import HelloWorld from "./HelloWorld.vue";
import treeVue from "./treeVue.vue";
import card from "./card.vue";
const tabs = [
  {
    name: "HelloWorld",
    component: markRaw(HelloWorld),
  },
  {
    name: "treeVue",
    component:  markRaw(treeVue),
  },
  {
    name: "card",
    component:  markRaw(card),
  },
];
const activeTab = ref({
  name: "HelloWorld",
  component: HelloWorld,
});
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.tab-item {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.tab-item.active {
  background-color: #42b983;
  color: white;
}
</style>