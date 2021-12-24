var Queue = require('@btmills/queue')

let q = new Queue()

q.enqueue('hello');
q.enqueue('world');

q.dequeue()
console.log(q.peek())