/*
 * @Author: tuyongtao1
 * @Date: 2024-02-28 17:17:05
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2024-02-28 20:27:07
 * @Description: 
 */

const compiler = require("./compiler.js");

test("no options ", async () => {
  const stats = await compiler("example1.js");
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`async function func() {
  try {
    await new Promise((resolve, reject) => {
      reject('抛出错误');
    });
  } catch (error) {
    console.log(error);
  }
}`);
})


test("has identifier", async () => {
  const stats = await compiler("example1.js", {
    identifier: "e"
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`async function func() {
  try {
    await new Promise((resolve, reject) => {
      reject('抛出错误');
    });
  } catch (e) {
    console.log(e);
  }
}`);
});

test("has catchCode", async () => {
  const stats = await compiler("example1.js", {
    identifier: "error",
    catchCode: "console.log(error)"
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`async function func() {
  try {
    await new Promise((resolve, reject) => {
      reject('抛出错误');
    });
  } catch (error) {
    console.log(error);
  }
}`);
});

test("has finallyCode", async () => {
  const stats = await compiler("example1.js", {
    finallyCode: 'console.log("finally");'
  });
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`async function func() {
  try {
    await new Promise((resolve, reject) => {
      reject('抛出错误');
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally");
  }
}`);
});

test("should works on async function", async () => {
  const stats = await compiler("example2.js");
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`async function func() {
  try {
    await new Promise((resolve, reject) => {
      reject('抛出错误');
    });
  } catch (error) {
    console.log(error);
  }
}`);
});


test("should works on arrow function expression", async () => {
  const stats = await compiler("example3.js");
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`const func = async () => {
  try {
    await new Promise((resolve, reject) => {
      reject('抛出错误');
    });
  } catch (error) {
    console.log(error);
  }
};`);
});

test("should works on object method", async () => {
  const stats = await compiler("example4.js");
  const output = stats.toJson({ source: true }).modules[0].source;
  expect(output).toBe(`const vueComponent = {
  methods: {
    func: async function () {
      try {
        await new Promise((resolve, reject) => {
          reject('抛出错误');
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};`);
});


