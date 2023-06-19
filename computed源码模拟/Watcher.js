import { popTarget, pushTarget } from "./Dep.js";
export default class Watcher {
  constructor(vm, fn, options = {}) {
    this.vm = vm;
    this.getter = fn;
    this.deps = new Set();
    // 新增代码
    this.lazy = !!options.lazy;
    this.dirty = this.lazy; // dirty 来标识计算属性的缓存有没有过期 true表示过期了
    this.value = this.lazy ? undefined : this.get(); // 初始化时不执行，等使用到了计算属性时才去执行，懒执行
  }
  get() {
    pushTarget(this);
    const value = this.getter.call(this.vm);
    popTarget();
    return value;
  }
  addDep(dep) {
    this.deps.add(dep);
    dep.addSub(this);
  }
  update() {
    // 新增代码
    if (this.lazy) {
      this.dirty = true;
    } else {
      this.get();
    }
  }
  // 新增代码
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  depend() {
    this.deps.forEach((dep) => {
      dep.depend(); // 改动点
    });
  }
}
