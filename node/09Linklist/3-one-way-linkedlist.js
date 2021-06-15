/* 
  01 node + head + null 
  02 head --->null 
  03 size 

  04 next element

  05 增加 删除 修改 查询 清空 
*/

class Node{
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList{
  constructor(head, size) {
    this.head = null 
    this.size = 0
  }
  _getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('越界了')
    }
    let currentNode = this.head
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  add(index, element) {
    if (arguments.length == 1) {
      element = index
      index = this.size
    }
    if (index < 0 || index > this.size) {
      throw new Error('cross the border')
    }
    if (index == 0) {
      let head = this.head // 保存原有 head 的指向
      this.head = new Node(element, head)
    } else {
      let prevNode = this._getNode(index - 1)
      prevNode.next = new Node(element, prevNode.next)
    }
    this.size++
  }

  remove(index) {
    if (index == 0) {
      let head = this.head 
      this.head = head.next
    } else {
      let prevNode = this._getNode(index -1)
      prevNode.next = prevNode.next.next
    }
    this.size--
  }
  set(index, element) {
    let node = this._getNode(index)
    node.element = element
  }
  get(index) {
    return this._getNode(index)
  }
  clear() {
    this.head = null 
    this.size = 0 
  }
}

const l1 = new LinkedList()
l1.add('node1')
l1.add('node2')
l1.add(1, 'node3')
// l1.remove(1)
l1.set(1, 'node3-3')
// let a = l1.get(0)
l1.clear()
console.log(l1)