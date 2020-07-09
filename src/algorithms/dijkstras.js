// import { getUnivsitedNeighbors } from './helperFunctions';
const generateEmptyGrid = () => {
  let grid = [];
  for (let i = 0; i < 5; i++) {
    grid.push([]);
    for (let k = 0; k < 5; k++) {
      grid[i].push({ visited: false, wall: false, on: true });
    }
  }
  return grid;
};
let grid = generateEmptyGrid();
console.log(grid);

function dijkstra(grid, start, end) {
  const queue = [start];
  const distances = {};
  const previous = {};
  const visited = {};

  // Build up initial state
  distances[start] = 0;
  previous[start] = null;

  while (queue.length) {
    let currentNode = queue.shift();
    visited[currentNode] = true;

    if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
      console.log('this is the end');
      return createShortestPath(previous, start, end);
      // We have reached the finish.
      // run getShortestPath() to return the shortest path array.
    }
    let currentNodesNeighors = getUnvisitedNeighbors(
      grid,
      currentNode[0],
      currentNode[1]
    );
    currentNodesNeighors.forEach((neighbor) => {
      if (!visited[neighbor]) {
        queue.push(neighbor);
      }
      if (!distances[neighbor]) {
        distances[neighbor] = distances[currentNode] + 1;
        previous[neighbor] = currentNode;
      }
      if (distances[neighbor]) {
        if (distances[currentNode] + 1 < distances[neighbor]) {
          distances[neighbor] = distances[currentNode] + 1;
          previous[neighbor] = currentNode;
        }
      }
    });
  }
}

function createShortestPath(previous, start, end) {
  let shortestPath = [end];
  let current = previous[end];

  while (!(current[0] === start[0] && current[1] === start[1])) {
    shortestPath.unshift(current);
    current = previous[current];
  }
  shortestPath.unshift(start);
  return shortestPath;
}

function getUnvisitedNeighbors(grid, i, j) {
  let neigh = [];
  // if the cell is within the bounds of the grid && is not a wall && is turned on && is not visited
  if (
    i + 1 < grid.length &&
    grid[i + 1][j].on &&
    !grid[i + 1][j].wall &&
    !grid[i + 1][j].visited
  )
    neigh.push([i + 1, j]);
  if (
    i - 1 >= 0 &&
    grid[i - 1][j].on &&
    !grid[i - 1][j].wall &&
    !grid[i - 1][j].visited
  )
    neigh.push([i - 1, j]);
  if (
    j + 1 < grid[i].length &&
    grid[i][j + 1].on &&
    !grid[i][j + 1].wall &&
    !grid[i][j + 1].visited
  )
    neigh.push([i, j + 1]);
  if (
    j - 1 >= 0 &&
    grid[i][j - 1].on &&
    !grid[i][j - 1].wall &&
    !grid[i][j - 1].visited
  )
    neigh.push([i, j - 1]);
  return neigh;
}

// function getUnivsitedNeighbors(grid, i, j) {
//   let neigh = [];
//   if (i + 1 < grid.length) neigh.push([i + 1, j]);
//   if (i - 1 >= 0) neigh.push([i - 1, j]);
//   if (j + 1 < grid[i].length) neigh.push([i, j + 1]);
//   if (j - 1 >= 0) neigh.push([i, j - 1]);
//   return neigh;
// }
console.log(dijkstra(grid, [2, 0], [0, 4]));
