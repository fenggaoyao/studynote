var reverseList = function(head) {
    let oldHead = head
    let newHead = null

    while(oldHead){
        let _head = oldHead
        oldHead = oldHead.next

        _head.next = newHead
        newHead = _head
    }

    return newHead
};
