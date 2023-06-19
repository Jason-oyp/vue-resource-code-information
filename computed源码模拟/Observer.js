import Dep from "./Dep.js";
export default function Observer(vm, data) {
  for (const prop in data) {
    let value = data[prop];
    const dep = new Dep();
    Object.defineProperty(data, prop, {
      get() {
        if (Dep.target) {
          dep.depend();
        }
        return value;
      },
      set(val) {
        value = val;
        dep.notify();
      },
    });
    Object.defineProperty(vm, prop, {
      get() {
        return data[prop];
      },
      set(val) {
        data[prop] = val;
      },
    });
  }
}
