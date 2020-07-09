const depthFirstTraversal = (gridCopy, queue, getUnivsitedNeighbors) => {
  if (queue.length) {
    let currentVertex = queue.shift();
    let i = currentVertex[0];
    let j = currentVertex[1];
    let univsitedNeighbors = getUnivsitedNeighbors(gridCopy, i, j);

    univsitedNeighbors.forEach((neighbor) => {
      queue.push(neighbor);
      gridCopy[neighbor[0]][neighbor[1]].visited = true;
    });
    // gridCopy[i][j].visited = 1;
  }
};

export default depthFirstTraversal;
