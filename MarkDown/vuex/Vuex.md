# **Vuex**																     **API**

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

但页面或程序关闭后状态清空，所以某些状态数据可以保存在`localStorage`中
安装：`npm install vuex --save`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

## **什么是“状态管理模式”**

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

## **单向数据流  理念**

<img src="C:%5CUsers%5CDELL%5CDesktop%5CMarkDown%5Cvuex%5CVuex.assets%5Cflow.png" alt="img" style="zoom: 25%;" />

但是我们进行复杂应用开发时，**多个组件共享状态**时，单向数据流的简介性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。

对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

<img src="C:%5CUsers%5CDELL%5CDesktop%5CMarkDown%5Cvuex%5CVuex.assets%5C1341090-20180805104901600-889996688.png" alt="img"  />

![img](C:%5CUsers%5CDELL%5CDesktop%5CMarkDown%5Cvuex%5CVuex.assets%5Cu=61953144,3992407592&fm=26&gp=0.jpg)

## **创建Store实例**

```js
//index.js
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
...
Vue.use(Vuex)

const state = {
    username: '',
    token:''
}

export default new Vuex.Store({
    state,
    mutations,
    actions
    ...
})
```

## Vue构造器选项

#### 1.state

- （类型: `Object | Function`）

驱动应用的数据

#### 2.mutations

- （类型: `{ [type: string]: Function }`）

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，在 store 上注册 mutation，处理函数总是接受 `state` 作为第一个参数（如果定义在模块中，则为模块的局部状态），`payload` 作为第二个参数（可选）。

##### 调用

以相应的 type 调用 **store.commit** 方法：store.commit('increment')

##### **提交载荷（payload）**

向 `store.commit` 传入额外的参数，即 mutation 的 载荷（payload）：

```js
mutations: {
  increment (state, n) {
    state.count += n
  },
//载荷大多数情况下是对象      
  increment2 (state, obj) {
    state.count += obj.n
  }
}

```

```js
store.commit('increment', 10)
//载荷对象
store.commit('increment2', {
    n:10
})
//对象风格提交方式
store.commit({
  type: 'increment',
  n: 10
})
```

##### **Mutation 改变state数据状态应遵循Vue的响应原则**

1. 最好提前在你的 store 中初始化好所有所需属性。
2. 当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`, 或者

- 以新对象替换老对象。例如，利用[对象展开运算符](https://github.com/tc39/proposal-object-rest-spread)我们可以这样写：

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

##### **使用常量替代Mutation事件类型**

使用常量替代 mutation 事件类型在各种 Flux（人名） 实现中是很常见的模式。这样可以使 linter （人名）之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```js
// mutation-types.js   使项目规范化
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

##### **Mutation必须是同步函数**

因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

##### **在组件中提交 Mutation**

你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为`this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

#### 3.actions

- （类型: `{ [type: string]: Function }`）

在 store 上注册 action。处理函数总是接受 `context` 作为第一个参数，`payload` 作为第二个参数（可选）。

`context` 对象包含以下属性：

```js
{
  state,      // 等同于 `store.state`，若在模块中则为局部状态
  rootState,  // 等同于 `store.state`，只存在于模块中
  commit,     // 等同于 `store.commit`
  dispatch,   // 等同于 `store.dispatch`
  getters,    // 等同于 `store.getters`
  rootGetters // 等同于 `store.getters`，只存在于模块中
}
```

同时如果有第二个参数 `payload` 的话也能够接收。

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

注册一个简单的 action：

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。在之后介绍到 [Modules](https://vuex.vuejs.org/zh/guide/modules.html) 时，就知道 context 对象为什么不是 store 实例本身了。

实践中，我们会经常用到 ES2015 的 [参数解构](https://github.com/lukehoban/es6features#destructuring) 来简化代码（特别是我们需要调用 `commit` 很多次的时候）：

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

##### **分发Action**

Action 通过 `store.dispatch` 方法触发：

```js
store.dispatch('increment')
```

这样写是因为Action可以进行异步操作

Actions 支持同样的载荷方式和对象方式进行分发：

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

更加实际的购物车示例，涉及到**调用异步 API** 和**分发多重 mutation**：

```js
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

##### **在组件中分发Action**

在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）：

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

##### **组合Action**

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在可以：

```js
store.dispatch('actionA').then(() => {// 代码...})
```

在另外一个 action 中也可以：

```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

`一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行`。



#### **4.getters**

- （类型: `{ [key: string]: Function }`）

在Store仓库里，state就是用来存放数据，若是对数据进行处理输出，比如数据要过滤，一般我们可以写到computed中。但是如果很多组件都使用这个过滤后的数据，比如饼状图组件和曲线图组件，我们是否可以把这个数据抽提出来共享？这就是getters存在的意义。我们可以认为，【getters】是store的计算属性。

在 store 上注册 getter，getter 方法接受以下参数：

```text
state,     // 如果在模块中定义则为模块的局部状态
getters,   // 等同于 store.getters
```

当定义在一个模块里时会特别一些：

```text
state,       // 如果在模块中定义则为模块的局部状态
getters,     // 等同于 store.getters
rootState    // 等同于 store.state
rootGetters  // 所有 getters
```

注册的 getter 暴露为 `store.getters`。

##### 源码分析

wrapGetters初始化getters，接受3个参数，store表示当前的Store实例，moduleGetters当前模块下所有的getters，modulePath对应模块的路径

```js
function `wrapGetters` (store, moduleGetters, modulePath) {
 Object.keys(moduleGetters).forEach(getterKey => {
    // 遍历先所有的getters
  const rawGetter = moduleGetters[getterKey]
  if (store._wrappedGetters[getterKey]) {
   console.error(`[vuex] duplicate getter key: ${getterKey}`)
    // getter的key不允许重复，否则会报错
   return
  }
  store._wrappedGetters[getterKey] = function `wrappedGetter` (store{
    // 将每一个getter包装成一个方法，并且添加到store._wrappedGetters对象中，
    return rawGetter(
     //执行getter的回调函数，传入三个参数，(local state,store getters,rootState)
    getNestedState(store.state, modulePath), // local state
     //根据path查找state上嵌套的state 
    store.getters, 
      // store上所有的getters
    store.state 
       // root state)}}) 
 }
  
 //根据path查找state上嵌套的state 
function `getNestedState` (state, path) {
   return path.length
    ? path.reduce((state, key) => state[key], state): state}
```

##### 应用场景

假设我们在 Vuex 中定义了一个数组：

```js
const store = new Vuex.Store({
  state: {
    list:[1,3,5,7,9,20,30]
  }
 ...
})
```

业务场景希望过滤出大于 5 的数。马上想到的方法可能的是：在组件的计算属性中进行过滤：

```js
<template>
  <div>
    {{list}}
  </div>
</template>
<script>
  export default {
    name: "index.vue",
    computed: {
      list() {
        return this.$store.state.list.filter(item => item > 5);
      }
    }
 }
</script>
```

结果：【7,9,20,30】

功能虽然实现了，但如果其它组件也需要过滤后的数据，那么就得把 index.vue 中的计算过滤代码复制出来。如果过滤规则发生变化，还得一一修改这些组件中的计算属性，很难维护。这种场景下，我们就可以使用 getters 属性了

##### 基础用法

```js
//index.js
const store = new Vuex.Store({
  state: {
    list: [1, 3, 5, 7, 9, 20, 30]
  },
  getters: {
    filteredList: state => {
      return state.list.filter(item => item > 5)
    }
  }
})
```

```js
//index.vue
<script>
  export default {
    name: "index.vue",
    computed: {
      list() {
        return this.$store.getters.filteredList;
      }
    }
  }
</script>
//效果达到了，而且只需要在一处维护过滤规则即可。
```

##### 内部依赖

getter 可以依赖其它已经定义好的 getter。比如我们需要统计过滤后的列表数量，就可以依赖之前定义好的过滤函数。

```js
//index.js
const store = new Vuex.Store({
  state: {
    list: [1, 3, 5, 7, 9, 20, 30]
  },
  getters: {
    filteredList: state => {
      return state.list.filter(item => item > 5)
    },
    listCount: (state, getters) => {
      return getters.filteredList.length;
    },
    getTodoById: (state) => (id) => {
      return state.list.find(lis => lis === id)
    }
  }
})
```

```js
//index.vue
<template>
 
  <div>
    过滤后的列表：{{list}}
    <br>
    列表长度：{{listCount}}
  </div>
</template>
 
<script>
  export default {
    name: "index.vue",
    computed: {
      list() {
        return this.$store.getters.filteredList;
      },
      listCount() {
        return this.$store.getters.listCount;
      },
      getTodoById() {
         return this.$store.getters.getTodoById(2);
      }
    }
  }
  //注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
</script>
```

结果：过滤后的列表：【7,9,20,30】；列表长度：4

##### mapGetters辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

#### 5.modules

- 类型: `Object`

包含了子模块的对象，会被合并到 store，大概长这样：

```js
{
  key: {
    state,
    namespaced?,
    mutations,
    actions?,
    getters?,
    modules?
  },
  ...
}
```

与根模块的选项一样，每个模块也包含 `state` 和 `mutations` 选项。模块的状态使用 key 关联到 store 的根状态。模块的 mutation 和 getter 只会接收 module 的局部状态作为第一个参数，而不是根状态，并且模块 action 的 `context.state` 同样指向局部状态。

##### **什么是module**

背景：在Vue中State使用是单一状态树结构，应该的所有的状态都放在state里面，如果项目比较复杂，那state是一个很大的对象，store对象也将对变得非常大，难于管理。
 module：可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

##### **怎么用module？**

一般结构

```js
const moduleA = {
 state: { ... },
 mutations: { ... },
 actions: { ... },
 getters: { ... }
 }
const moduleB = {
 state: { ... },
 mutations: { ... },
 actions: { ... }
 }
 
const store = new Vuex.Store({
 modules: {
  a: moduleA,
  b: moduleB
 })
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
            
```

##### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

##### **命名空间**

默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 `namespaced` 属性后不需要修改模块内的代码。

##### 在带命名空间的模块内访问全局内容（Global Assets）

如果使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

##### 在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。例如：

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

##### 带命名空间的绑定函数

当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

而且，可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

##### 给插件开发者的注意事项

如果你开发的[插件（Plugin）](https://vuex.vuejs.org/zh/guide/plugins.html)提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况，你可以通过插件的参数对象来允许用户指定空间名称：

```js
// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
  return function (store) {
    // 把空间名字添加到插件模块的类型（type）中去
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}
```

##### 模块动态注册

在 store 创建**之后**，你可以使用 `store.registerModule` 方法注册模块：

```js
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。

##### 保留 state

在注册一个新 module 时，你很有可能想保留过去的 state，例如从一个服务端渲染的应用保留 state。你可以通过 `preserveState` 选项将其归档：`store.registerModule('a', module, { preserveState: true })`。

当你设置 `preserveState: true` 时，该模块会被注册，action、mutation 和 getter 会被添加到 store 中，但是 state 不会。这里假设 store 的 state 已经包含了这个 module 的 state 并且你不希望将其覆写。

##### 模块重用

有时我们可能需要创建一个模块的多个实例，例如：

- 创建多个 store，他们公用同一个模块 (例如当 `runInNewContext` 选项是 `false` 或 `'once'` 时，为了[在服务端渲染中避免有状态的单例](https://ssr.vuejs.org/en/structure.html#avoid-stateful-singletons))
- 在一个 store 中多次注册同一个模块

如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。

实际上这和 Vue 组件内的 `data` 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：

```js
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}
```

#### 6.plugins   

- 类型: `Array<function>`

一个数组，包含应用在 store 上的插件方法。这些插件直接接收 store 作为唯一参数，可以监听 mutation（用于外部地数据持久化、记录或调试）或者提交 mutation （用于内部数据，例如 websocket 或 某些观察者）

[详细介绍](https://vuex.vuejs.org/zh/guide/plugins.html)

#### 7.strict

- 类型: `Boolean`

- 默认值: `false`

  使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。

  [详细介绍](https://vuex.vuejs.org/zh/guide/strict.html)

#### 8.devtools

- 类型：`Boolean`

为某个特定的 Vuex 实例打开或关闭 devtools。对于传入 `false` 的实例来说 Vuex store 不会订阅到 devtools 插件。可用于一个页面中有多个 store 的情况。

```js
{
  devtools: false
}
```

## **Vuex.Store实例属性**

#### 1.state

- 类型: `Object`

- 根状态，只读。

#### 2.getters

- 类型: `Object`

- 暴露出注册的 getter，只读。

## **Vuex.Store实例方法**

#### 1.commit

- `commit(type: string, payload?: any, options?: Object)`

- `commit(mutation: Object, options?: Object)`

  提交 mutation。`options` 里可以有 `root: true`，它允许在[命名空间模块](https://vuex.vuejs.org/zh/guide/modules.html#命名空间)里提交根的 mutation。

#### 2.dispatch

- `dispatch(type: string, payload?: any, options?: Object)`

- `dispatch(action: Object, options?: Object)`

  分发 action。`options` 里可以有 `root: true`，它允许在[命名空间模块](https://vuex.vuejs.org/zh/guide/modules.html#命名空间)里分发根的 action。返回一个解析所有被触发的 action 处理器的 Promise。[详细介绍](https://vuex.vuejs.org/zh/guide/actions.html)

#### 3.replaceState

- `replaceState(state: Object)`

  替换 store 的根状态，仅用状态合并或时光旅行调试。

#### 4.watch

- `watch(fn: Function, callback: Function, options?: Object): Function`

  响应式地侦听 `fn` 的返回值，当值改变时调用回调函数。`fn` 接收 store 的 state 作为第一个参数，其 getter 作为第二个参数。最后接收一个可选的对象参数表示 Vue 的 [`vm.$watch`](https://cn.vuejs.org/v2/api/#vm-watch) 方法的参数。

  要停止侦听，调用此方法返回的函数即可停止侦听。

#### 5.subscible

- `subscribe(handler: Function): Function`

  订阅 store 的 mutation。`handler` 会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数：

  ```js
  store.subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(mutation.payload)
  })
  ```

  要停止订阅，调用此方法返回的函数即可停止订阅。

  通常用于插件。[详细介绍](https://vuex.vuejs.org/zh/guide/plugins.html)

#### 6.subscibleAction

- `subscribeAction(handler: Function): Function`

> 2.5.0 新增

订阅 store 的 action。`handler` 会在每个 action 分发的时候调用并接收 action 描述和当前的 store 的 state 这两个参数：

```js
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})
```

要停止订阅，调用此方法返回的函数即可停止订阅。

> 3.1.0 新增

从 3.1.0 起，`subscribeAction` 也可以指定订阅处理函数的被调用时机应该在一个 action 分发*之前*还是*之后* (默认行为是*之前*)：

```js
store.subscribeAction({
  before: (action, state) => {
    console.log(`before action ${action.type}`)
  },
  after: (action, state) => {
    console.log(`after action ${action.type}`)
  }
})
```

该功能常用于插件。[详细介绍](https://vuex.vuejs.org/zh/guide/plugins.html)

#### 7.registerModule

- registerModule(path: string | Array, module: Module, options?: Object)

  注册一个动态模块。[详细介绍](https://vuex.vuejs.org/zh/guide/modules.html#模块动态注册)

  `options` 可以包含 `preserveState: true` 以允许保留之前的 state。用于服务端渲染。

#### 8.unregisterModule

- unregisterModule(path: string | Array<string>)

  卸载一个动态模块。[详细介绍](https://vuex.vuejs.org/zh/guide/modules.html#模块动态注册)

#### 9.hotUpdate

- hotUpdate(newOptions: Object)

  热替换新的 action 和 mutation。[详细介绍](https://vuex.vuejs.org/zh/guide/hot-reload.html)

## **组件绑定的辅助函数**

#### 1.mapState

`mapState(namespace?: string, map: Array<string> | Object<string | function>): Object`

为组件创建计算属性以返回 Vuex store 中的状态。

第一个参数是可选的，可以是一个命名空间字符串。

对象形式的第二个参数的成员可以是一个函数。`function(state: any)`

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
//当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

#### 2.mapGetters

mapGetters(namespace?: string, map: Array | Object): Object

为组件创建计算属性以返回 getter 的返回值。

第一个参数是可选的，可以是一个命名空间字符串。

##### `mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

#### 3.mapActions

`mapActions(namespace?: string, map: Array | Object): Object`

创建组件方法分发 action。[详细介绍](https://vuex.vuejs.org/zh/guide/actions.html#在组件中分发-action)

第一个参数是可选的，可以是一个命名空间字符串。[详细介绍](https://vuex.vuejs.org/zh/guide/modules.html#带命名空间的绑定函数)

对象形式的第二个参数的成员可以是一个函数。`function(dispatch: function, ...args: any[])`

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

#### 4.mapMutations

`mapMutations(namespace?: string, map: Array | Object): Object`

创建组件方法提交 mutation。[详细介绍](https://vuex.vuejs.org/zh/guide/mutations.html#在组件中提交-mutation)

第一个参数是可选的，可以是一个命名空间字符串。[详细介绍](https://vuex.vuejs.org/zh/guide/modules.html#带命名空间的绑定函数)

对象形式的第二个参数的成员可以是一个函数。`function(commit: function, ...args: any[])`

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

#### 5.createnamespacedHelpers

`createNamespacedHelpers(namespace: string): Object`

创建基于命名空间的组件绑定辅助函数。其返回一个包含 `mapState`、`mapGetters`、`mapActions` 和 `mapMutations` 的对象。它们都已经绑定在了给定的命名空间上。[详细介绍](https://vuex.vuejs.org/zh/guide/modules.html#带命名空间的绑定函数)

## 项目结构

Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。
2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
3. 异步逻辑都应该封装到 **action** 里面。

只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```bash
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```