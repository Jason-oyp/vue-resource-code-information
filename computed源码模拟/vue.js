import Observer from "./Observer.js";
import initComputed from "./initComputed.js";
import Watcher from "./Watcher.js";
export default function Vue(options) {
  // 1. 调用beforeCreate钩子函数 ...
  // 2. 拿到option中的data，将其交给Observer类变成响应式的数据
  Observer(this, options.data || {});
  // 初始化computed
  initComputed(this, options.computed || {});
  this._render = options.render;
  // 3. 调用created钩子函数 ...

  // 4. 判断有没有el属性
  //   if (options.el) {
  //     this.$mount(options.el) // 这个代码就不实现了
  //   }

  // 我们将第四部简化一下
  // options.render.call(this);
  new Watcher(this, options.render); // 新增代码
}
