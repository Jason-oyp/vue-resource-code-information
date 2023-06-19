import Watcher from "./Watcher.js";
import Dep from "./Dep.js";
// 该函数是在初始化的时候调用的（初始化data后）
export default function initComputed(vm, computed) {
  const watchers = (vm._computedWatchers = Object.create(null)); // _computedWatchers 用于储存计算属性的       watcher实例
  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === "function" ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter || (() => {}), {
      lazy: true,
    });

    if (!(key in vm)) {
      Object.defineProperty(vm, key, {
        get() {
          const watcher = this._computedWatchers[key];
          // 拿到该计算属性专属的watcher实例，用dirty属性来判断该计算属性是否过期，也就是缓存是否失效
          if (watcher.dirty) {
            // 如果过期了需要重新计算一遍，即调用实例的evaluate方法
            watcher.evaluate();
          }
          if (Dep.target) {
            watcher.depend();
          }
          // 最后返回实例的value值，该值记录着计算属性的值
          return watcher.value;
        },
      });
    }
  }
}
