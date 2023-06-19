export default class Dep {
  static target = undefined;
  constructor() {
    this.subs = new Set();
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  addSub(target) {
    this.subs.add(target);
  }
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

const targetStack = [];

export function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
