<template>
  <scopedSlotsDemo>
    <template #default="data">
     <p>{{ data.text }}</p>
    </template>
  </scopedSlotsDemo>
</template>
<script setup lang="ts">
import scopedSlotsDemo from "./components/scopedSlotsDemo.vue";
</script>