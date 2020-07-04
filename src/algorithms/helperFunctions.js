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
//   if (i + 1 < grid.length && !grid[i + 1][j].visited) neigh.push([i + 1, j]);
//   if (i - 1 >= 0 && !grid[i - 1][j].visited) neigh.push([i - 1, j]);
//   if (j + 1 < grid[i].length && !grid[i][j + 1].visited) neigh.push([i, j + 1]);
//   if (j - 1 >= 0 && !grid[i][j - 1].visited) neigh.push([i, j - 1]);
//   return neigh;
// }

export { getUnvisitedNeighbors };
