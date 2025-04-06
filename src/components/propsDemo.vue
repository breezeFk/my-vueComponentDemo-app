<template>
  <div>
    <div>
      name: {{ name }}
      <hr />
      age:{{ age }}
    </div>
    changeName:<button @click="changeName">changeName</button>
    <br />
    changeAge:<button @click="changeAge">changeAge</button>
  </div>
</template>

<script setup lang="ts">
import { watch, watchEffect } from "vue";

interface Props {
  name?: string;
  age?: number;
}
// <propsDemo name="k4ze"  age="18"></propsDemo>
// const props = defineProps<Props>()

//设置默认值，也可以使用withDefaults
//  <propsDemo></propsDemo>
// defineProps({
//     name: { type: String, default: "张三" },
//     age: { type: Number, default: 28 }
// })
const props = withDefaults(defineProps<Props>(), {
  name: "张三",
  age: 28,
});
watchEffect(() => {
  console.log(props.age);
});
// watch(() => props.age, (newVal, oldVal) => {
//     console.log(newVal, oldVal);
// })

// const emit = defineEmits(["changeName",'changeAge']);
const emit = defineEmits<{
  (e: "changeName", name: string): void;
  (e: "changeAge", age: number): void;
}>();
const changeName = () => {
  emit("changeName", "fkk");
};
const changeAge = () => {
  emit("changeAge", 28);
};

// 用于暴露一些方法或数据给父组件使用
defineExpose({
  name: "fkk",
  getName: () => {
    console.log("fkk");
  },
});
</script>

<style></style>