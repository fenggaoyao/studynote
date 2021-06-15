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
}

const l1 = new LinkedList()
l1.add('node1')
console.log(l1)