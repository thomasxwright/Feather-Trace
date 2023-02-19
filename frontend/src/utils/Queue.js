export default class Queue {
    constructor(items) {
        this.queue = {}
        this.head = 0
        this.tail = 0
        items.forEach(item => {
            this.enqueue(item)
        })
    }

    get length() {
        return this.tail - this.head
    }
    // Add an element to the end of the queue. 
    enqueue = function (element) {
        this.queue[this.tail++] = element;
    }
    // Delete the first element of the queue.
    dequeue = function () {
        if (this.tail === this.head)
            return undefined
        var element = this.queue[this.head]
        delete this.queue[this.head]
        this.head++
        return element
    }
}