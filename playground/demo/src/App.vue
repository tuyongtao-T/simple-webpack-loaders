<template>
  <div id="app">
    <HelloWorld msg="这是webpack-loader演示页面" />
    <h1>1. prefix-log-loader</h1>
    <h2>1.1 功能点</h2>
    <button @click="test1">打印字面量</button>
    <button @click="test2">打印变量</button>
    <h1>2. no-catch-loader</h1>
    <h2>2.1 功能点</h2>
    <button @click="test3">捕获methods中的方法</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      time: new Date(),
      arr: [1,2,3],
      person: {
        name: "Hello World",
        age: 16,
        others: {
          grade: 9,
        }
      },
    }
  },
  created() {
    // this.test1();
  },
  methods: {
    test1() {
      console.log(null);
      console.log(undefined);
      console.log(true);
      console.log('hello world');
      console.log(10086);
    }, 
    test2() {
      console.log(this.time);
      console.log(this.arr);
      console.log(this.arr[2]);
      console.log(this.person);
      console.log(this.person.name);
      console.log(this.person.others);
      console.log(this.person.others.grade);
    },   
    async test3() {
      await getFu()
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
