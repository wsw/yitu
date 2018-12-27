export default class TreeNode {
  // 创建多级节点
  static createTree (data, parent) {
    return data.map(node => {
      let treeNode = new TreeNode(node.id, node.name, parent)
      if (node.children && node.children.length > 0) {
        treeNode.children = TreeNode.createTree(node.children, treeNode)
      }
      return treeNode
    })
  }
  constructor (id, name, parent = null) {
    this.id = id;
    this.name = name;
    this.children = [];
    this.parent = parent

    this.indeterminate = false; // 不确定
    this.state = false; // 状态：true, false
    this.visible = true
  }
  // 选中变化
  changeState (state) {
    this.state = state
    this.feedback()
    this.children.map(child => {
      child.changeState(state);
    })
  }
  // 下级节点向上处理父级状态
  feedback () {
    if (this.parent) {
      if (this.indeterminate) {
        this.parent.indeterminate = true;
        this.parent.state = false;
      } else {
        let flag = 0;
        this.parent.children.map(child => child.state && flag++)
        if (flag === 0) {
          this.parent.state = false
          this.parent.indeterminate = false
        } else if (flag === this.parent.children.length) {
          this.parent.state = true
          this.parent.indeterminate = false
        } else {
          this.parent.indeterminate = true;
          this.parent.state = false;
        }
      }
      this.parent.feedback()
    }
  }
  // 过滤显示处理
  static visibleHandle (node, filter) {
    let childFlag = false
    if (node.name.indexOf(filter) === -1) {
      node.visible = false
      node.state = false
      node.indeterminate = false
      // 当前未匹配的匹配下级
      node.children.map(v => {
        if (TreeNode.visibleHandle(v, filter)) {
          childFlag = true
        }
      })
      // 下级有匹配的 当前级直接显示
      childFlag && (node.visible = true)
    } else {
      // 当前匹配的 直接重置下级
      TreeNode.resetVisible(node)
    }
    return node.visible
  }
  static resetVisible (node) {
    node.visible = true
    node.state = false
    node.indeterminate = false
    node.children.map(child => TreeNode.resetVisible(child))
  }
  static allSelect (node) {
    if (node.visible) {
      node.state = true
      node.indeterminate = false
      node.children.map(child => TreeNode.allSelect(child))
    }
  }
  static clearSelect (node) {
    if (node.visible) {
      node.state = false
      node.indeterminate = false
      node.children.map(child => TreeNode.clearSelect(child))
    }
  }
  static getLeafs (nodes, leafs) {
    nodes.map(node => {
      if (node.children.length === 0 && node.visible && node.state) {
        leafs.push(node)
      } else {
        TreeNode.getLeafs(node.children, leafs)
      }
    })
  }
}
