# 组件

## 组件基础

### 定义一个组件

当使用构建步骤时，我们一般会将 Vue 组件定义在一个单独的 `.vue` 文件中

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```
### 父子组件传参
1. defineProps 定义组件的props，接收父组件传递过来的数据。
2. defineEmits 定义组件的事件，用于触发父组件的事件。
3. defineExpose 定义组件的公开方法，用于暴露给父组件使用。

```vue
<!-- 父组件.vue -->
<template>
  <propsDemo ref="propsDemoRef" :name="name" :age="age" @changeName="changeName" @changeAge="changeAge"></propsDemo>
</template>
<script setup lang="ts">
import propsDemo from './components/propsDemo.vue'
// 绑定在组件上的属性和方法
const age = ref<number>(18)
const name = ref<string>('k4ze')
const changeName = (data: string) => {
  name.value=data;
}
const changeAge = (data: number) => {
  age.value=data;
}
// ref获取组件实例
// const propsDemoRef=ref()
const propsDemoRef=ref<InstanceType<typeof propsDemo>>()
console.log(propsDemoRef);
onMounted(()=>{
  propsDemoRef.value?.getName()
})
</script>
<!-- propsDemo.vue -->
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
// 基本写法 引用时直接使用name和age即可
// defineProps({
//     name: { type: String, default: "张三" },
//     age: { type: Number, default: 28 }
// })

// 使用ts时，需要使用defineProps<Props>()来定义类型，否则会报错
interface Props {
    name?: string;
    age?: number;
}
// const props = defineProps<Props>()
// withDefaults 用于设置默认值，第二个参数是一个对象，用于设置默认值
const props = withDefaults(defineProps<Props>(), {
    name: "张三",
    age: 28
})
// 获取定义的事件
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
````



### 注册全局组件
在main.ts（js）中注册全局组件
```js
import { createApp } from 'vue'
import App from './App.vue'
// 引入组件
import card from './components/card.vue'
const app = createApp(App)
app.component('HelloWorld', HelloWorld)  // 正确的注册方式
```
#### 批量注册全局组件
以element-plus为例，我们可以通过以下方式批量注册全局组件：
注册所有图标​
```js
//您需要从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
// main.ts
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```
### 递归组件
递归组件是指在组件内部调用自身的组件。
```vue
//treeVue.vue
<template>
  <div class="treeDiv">
    <!-- 点击事件绑定stop，防止冒泡，防止父组件的点击事件触发 -->
    <div v-for="item in treeData" @click.stop="clickItem(item)">
      <input type="checkbox" v-model="item.checked" />
      <span>
        {{ item.name }}
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
```

### 动态组件
动态组件是指在组件内部根据不同的条件渲染不同的组件。
```vue
// Tabs.vue
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
import { ref } from "vue";
import HelloWorld from "./HelloWorld.vue";
import treeVue from "./treeVue.vue";
import card from "./card.vue";
const tabs = [
  {
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    name: "treeVue",
    component: treeVue,
  },
  {
    name: "card",
    component: card,
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
```
### slot插槽全家桶
#### 基础用法
```vue
<!-- 父组件.vue -->
<template>
  <slotDemo>
    <template>我是main</template>
  </slotDemo>
</template>

//slotDemo.vue
<template>
  <div>
    <header>我是头</header>
    <main>
        <slot></slot>
    </main>
    <footer>我是尾</footer>
  </div>
</template>
```
#### 具名插槽
```vue
<!-- 父组件.vue -->
<template>
  <slotDemo>
    <template #header>我是头</template>
    <template #default>我是main</template>
    <template #footer>我是尾</template>
  </slotDemo>
</template>

//slotDemo.vue
<template>
  <div>
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer>
        <slot name="footer"></slot>
    </footer>
  </div>
</template>
```
##### 动态插槽名
```vue
<template>
  <slotDemo>
    <template #[name]>我在哪里？</template>
  </slotDemo>
</template>
<script setup lang="ts">
import { ref } from "vue";
const name = ref("header");
</script>
```
#### 作用域插槽
```vue
<!-- 父组件.vue -->
<template>
  <scopedSlotsDemo>
    <template #default="data">
     <p>{{ data.text }}</p>
    </template>
  </scopedSlotsDemo>
</template>

//scopedSlotsDemo.vue
<template>
  <div>
    <slot :text="greetingMessage" :count="1"></slot>
  </div>
</template>

<script setup>
import { ref } from "vue";
const greetingMessage = ref("Hello, world!");
</script>
```