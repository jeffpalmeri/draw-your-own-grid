const breadthFirstTraversal = (gridCopy, stack, getUnivsitedNeighbors) => {
  if (stack.length) {
    let currentVertex = stack.pop();
    console.log(
      'CURRENT VERTEX: ',
      currentVertex,
      currentVertex[0],
      currentVertex[1]
    );
    let i = currentVertex[0];
    let j = currentVertex[1];
    let univsitedNeighbors = getUnivsitedNeighbors(gridCopy, i, j);
    console.log('neighbors: ', JSON.parse(JSON.stringify(univsitedNeighbors)));
    // console.log(gridCopy[i][j]);

    // for (let i = 0; i < univsitedNeighbors.length; i++) {
    //   stack.push(univsitedNeighbors[i]);
    //   console.log('stack: ', JSON.parse(JSON.stringify(stack)));
    //   gridCopy[univsitedNeighbors[i][0]][
    //     univsitedNeighbors[i][1]
    //   ].visited = true;
    // }

    univsitedNeighbors.forEach((neighbor) => {
      console.log('stack: ', JSON.parse(JSON.stringify(stack)));
      console.log('individual neightbor: ', neighbor);
      stack.push(neighbor);
      console.log(
        'this is the cell that is about to be set to true: ',
        neighbor[0],
        neighbor[1],
        gridCopy[neighbor[0]][neighbor[1]]
      );
      return (gridCopy[neighbor[0]][neighbor[1]].visited = true);
    });
  }
};

export default breadthFirstTraversal;
