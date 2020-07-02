const depthFirstTraversal = (gridCopy, queue, getUnivsitedNeighbors) => {
  if (queue.length) {
    let currentVertex = queue.shift();
    let i = currentVertex[0];
    let j = currentVertex[1];
    let univsitedNeighbors = getUnivsitedNeighbors(gridCopy, i, j);
    // console.log('unvisited neighbors: ', univsitedNeighbors);

    univsitedNeighbors.forEach((neighbor) => {
      queue.push(neighbor);
      gridCopy[neighbor[0]][neighbor[1]].visited = true;
      console.log(gridCopy[neighbor[0]][neighbor[1]]);
      console.log(i, j, gridCopy[neighbor[0]][neighbor[1]].visited);
    });
    // gridCopy[i][j].visited = true;
  }
};

export default depthFirstTraversal;
