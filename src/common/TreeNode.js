export default class {
  constructor(id, name, children = []) {
    this.id = id;
    this.name = name;
    this.children = children;

    this.state = 0; // 状态：0, 1, 2

    if (children.length === 0) {
      this.leaf = true;
    }
  }
}