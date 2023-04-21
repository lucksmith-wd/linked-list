class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  #head;
  #tail;
  #size;
  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }
    this.#size++;
    return this;
  }

  prepend(value) {
    const node = new Node(value);
    if (!this.head) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.next = this.head;
      this.#head = node;
    }
    this.#size++;
    return this
  }

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  at(index) {
    if (index < 0 || index >= this.#size || typeof index === 'undefined') return null;
    let current = this.#head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  pop() {
    if (!this.head) return null;
    let current = this.head;
    let previous = null;
    while (current.next) {
      previous = current;
      current = current.next;
    }
    this.#tail = previous;
    if (!this.tail) this.#head = null;
    else this.#tail.next = null;
    this.#size--;
    return current;
  }

  shift() {
    if (!this.head) return null;
    const removed = this.head;
    this.#head = removed.next;
    removed.next = null;
    if (this.size === 1) this.#tail = null;
    this.#size--;
    return removed;
  }

  contains(value) {
    for (let current = this.head; current; current = current.next) {
      if (value === current.value) return true;
    }
    return false;
  }

  find(value) {
    for (let current = this.head, i = 0; current; current = current.next, i++) {
      if (value === current.value) return i;
    }
    return null;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size) return false;
    if (index === 0) return !!this.prepend(value);
    if (index === this.size) return !!this.append(value);
    const node = new Node(value);
    const prev = this.at(index - 1);
    node.next = prev.next;
    prev.next = node;
    this.#size++;
    return true;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.shift();
    if (index === this.size - 1) return this.pop();
    const prev = this.at(index - 1);
    const removed = prev.next;
    prev.next = removed.next;
    removed.next = null;
    this.#size--;
    return removed;
  }

  toString() {
    if (!this.head) return null;
    let result = `( ${this.head.value} )`;
    for (let current = this.head; current; current = current.next) {
      result = `${result} -> ${current.next ? '( ' + current.next.value + ' )' : 'null'}`
    }
    return result;
  }

}

const list = new LinkedList();
list.append('Bob');
list.append('Roberts');
list.append('Chris');
list.append('Matt');