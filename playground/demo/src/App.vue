<template>
  <div id="app">
    <HelloWorld msg="这是webpack-loader演示页面" />
    <h1>1. prefix-log-loader</h1>
    <h2>1.1 功能点</h2>
    <button @click="test1">打印字面量</button>
    <button @click="test2">打印变量</button>
    <h1>2. no-catch-loader</h1>
    <h2>2.1 功能点</h2>
    <button @click="defaultTest">捕获methods中的方法</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      time: new Date(),
      arr: [1, 2, 3],
      person: {
        name: "Hello World",
        age: 16,
        others: {
          grade: 9,
        },
      },
    }
  },
  created() {
    // this.test1();
  },
  methods: {
    test1() {
      console.log(null,'info')
      console.log(undefined,'success')
      console.log(true,'warning')
      console.log("hello world",'danger')
    },
    test2() {
      console.log(this.time)
      console.log(this.arr)
      console.log(this.arr[2])
      console.log(this.person)
      console.log(this.person.name, 'danger')
      console.log(this.person.others)
      console.log(this.person.others.grade)
    },
    async defaultTest() {
      // getFn是一个不存在的函数
      await getFu()
    },
    catchFn() {
      this.$message('catchFn');
    }
  },
}
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
