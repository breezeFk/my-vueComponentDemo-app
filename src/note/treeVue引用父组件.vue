<template>
    <div>
      <TreeVue :treeData="exampleTreeData" >
      </TreeVue>
    </div>
  </template>
  
  <script setup lang="ts">
  import TreeVue from "./components/treeVue.vue";
  interface TreeList {
    name: string;
    checked: boolean;
    children?: TreeList[];
  }
  const exampleTreeData: TreeList[] = [
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
              checked: false
            }
          ]
        },
        {
          name: "子节点1-2",
          checked: false
        }
      ]
    },
    {
      name: "节点2",
      checked: true,
      children: [
        {
          name: "子节点2-1",
          checked: false
        }
      ]
    },
    {
      name: "节点3",
      checked: false
    }
  ]
  </script>
  
  <style>
  </style>