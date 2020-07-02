let stack = [];

let neighbors = [
  { on: true, wall: false, visited: false },
  { on: true, wall: false, visited: false },
  { on: true, wall: false, visited: false },
  { on: true, wall: false, visited: false },
];

neighbors.forEach((neighbor) => {
  stack.push(neighbor);
  neighbor.visited = true;
});

console.log(neighbors);
console.log(stack);
