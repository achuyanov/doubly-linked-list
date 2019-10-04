const Node = require('./node');

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  // Should add node to the end of the list
  append(data) {
    let nPrev = (this.length != 0) ? this.tail : null;
    let nNode = new Node(data, nPrev, null);
    if (this.length == 0) {      
      this._head = nNode;
      this._tail = nNode;
    } else {
      nNode.prev = this._tail;
      this._tail.next = nNode;
      this._tail = nNode;
    }
    this.length++;
    return this;
  }

  // Should return data from the head of the list
  head() {
    return this._head && this._head.data;
  }

  // Should return data from the end of the list
  tail() {
    return this._tail && this._tail.data;
  }

  //Should return data of node by specified index
  at(index) {
    if (index >= this.length) {
        return null;
    } else if (index == this.length-1) {
        return this._tail.data;
    }
    let cur = this._head;
    let count = 0;
    while (cur) {
      if (count == index) { return cur.data; }
      cur = cur.next;
      count ++;
    }
    return this;
  }

  //Should insert data to specified index
  insertAt(index, data) {
    if (index > this.length || index < 0 ) {throw "Wrong index";}
    if ((index == 0 && this.length == 0) || (this.length == index)) { 
      return this.append(data);
    }
    if (index == 0) {
        let nNode = new Node(data,null,this._head);
        this._head.prev = nNode;
        this._head = nNode;
        this.length ++;
        return this;
    }
    let cur = this._head;
    let count = 0;
      while (cur) {
        if (count == index) {
          let nNode = new Node(data, cur.prev, cur);
          cur.prev.next = nNode;  
          cur.prev = nNode;
          this.length ++;
          return this; 
        }
        cur = cur.next;
        count ++; 
      }
    return this;
    }

  //Should return true if list is empty, false otherwise
  isEmpty() {
    return (this._head == null);
  }

  //Should clear the list
  clear() {
    this._head = null;
    this._tail = null;
    this.length = 0;
    return this;
  }

  //Should delete element by specified index
  deleteAt(index) {
    if (index >= this.length || index < 0 ) {throw "Wrong index";}
    if (index == 0 && this.length == 1) { return this.clear();}

    let cur = this._head;
    let count = 0;
    while (cur != null) {
      if (count == index) {
        if (cur == this._head) {
          this._head = this._head.next;
          this._head.prev = null;
        } else if (cur == this._tail) {
          this._tail = this._tail.prev;
          this._tail.next = null;
        } else {
          cur.prev.next = cur.next;
          cur.next.prev = cur.prev;
        }
      }
      count ++;
      cur = cur.next;
    }
    this.length --;
    return this;
  }

  //Should reverse the list
  reverse() {
    let cur = this._head;
    let precur = null;
    while (cur != null) {
      let next = cur.next;
      cur.next = precur;
      cur.prev = next;
      precur = cur;
      cur = next;
    }
    let tail = this._tail;
    this._tail = this._head;
    this._head = tail;
    return this;
  }


  //Should return index of specified value or -1 if list doesn't contain such
  indexOf(data) {
    let cur = this._head;
    let count = 0;
    while (cur) {
      if (cur.data == data) {
        return count;
      }
      cur = cur.next;
      count ++;
    }
    return -1;
  }
}

module.exports = LinkedList;



////const list = new LinkedList();

//function fn() {
 // list.append(4).reverse().deleteAt(0).clear().insertAt(0, 3);
//}
//const list = new LinkedList();
//const data = 34;
//const position = 1;

//list.append(32);
//console.log(list);
//list.append(47);
//console.log(list);
//list.insertAt(position, data);

//expect(list.at(position)).to.equal(data);
//let a = fn();
//console.log(list);