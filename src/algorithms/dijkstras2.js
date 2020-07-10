const dijkstras = (
  gridCopy,
  queue,
  getUnivsitedNeighbors,
  distances,
  previous,
  end,
  runningReference,
  setRunning,
  shortestPath
) => {
  console.log('the algo is running');
  if (queue.length) {
    let currentVertex = queue.shift();
    // gridCopy[currentVertex[0]][currentVertex[1]].visited = true;
    let i = currentVertex[0];
    let j = currentVertex[1];

    if (currentVertex[0] === end[0] && currentVertex[1] === end[1]) {
      runningReference.current = false;
      setRunning(false);
      const path = createShortestPath(previous, [8, 2], end);
      return (shortestPath.current = path);
      // console.log('shortest path: ', JSON.parse(JSON.stringify(shortestPath)));

      // animateShortestPath(shortestPath, gridCopy);
      // return console.log(createShortestPath(previous, [5, 0], end));
    }

    let univsitedNeighbors = getUnivsitedNeighbors(gridCopy, i, j);

    univsitedNeighbors.forEach((neighbor) => {
      queue.push(neighbor);
      gridCopy[neighbor[0]][neighbor[1]].visited = true;

      if (!distances[neighbor]) {
        distances[neighbor] = distances[currentVertex] + 1;
        previous[neighbor] = currentVertex;
      }
    });
  }
};

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

// function animateShortestPath(shortestPath, gridCopy) {
//   // shortestPath.forEach((node) => {
//   //   // setTimeout(() => {
//   //   gridCopy[node[0]][node[1]].shortestPath = true;
//   //   console.log(gridCopy[node[0]][node[1]]);
//   //   // }, 1000);
//   // });
//   // for (let i = 0; i < shortestPath.length; i++) {
//   //   setInterval(() => {
//   //     gridCopy[shortestPath[i][0]][shortestPath[i][1]].shortestPath = true;
//   //   }, 1000);
//   // }
//   console.log(shortestPath);
//   // if (shortestPath.current.length) {
//   console.log(shortestPath);
//   let current = shortestPath.current.shift();
//   gridCopy[current[0]][current[1]].shortestPath = true;
//   // }
//   setTimeout(animateShortestPath, 2000);
// }

export default dijkstras;
