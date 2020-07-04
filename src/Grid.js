import React, { useState, useCallback, useRef } from 'react';
import Instructions from './Instructions';
import breadthFirstTraversal from './algorithms/breadthFirstTraversal';
import depthFristTraversal from './algorithms/depthFirstTraversal';
import { getUnvisitedNeighbors } from './algorithms/helperFunctions';
import './App.css';

const numRows = 20;
const numColumns = 20;

const generateEmptyGrid = () => {
  let grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push([]);
    for (let k = 0; k < numColumns; k++) {
      grid[i].push({ visited: false, wall: false, on: true });
    }
  }
  return grid;
};

const Grid = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [leftMousedown, setLeftMousedown] = useState(false);
  const [rightMousedown, setRightMousedown] = useState(false);

  const [running, setRunning] = useState(false);
  const algorithm = useRef('');
  const gridRef = useRef(grid);
  const startingNode = useRef('');
  const stack = useRef([startingNode.current]);

  const runningReference = useRef(running);

  const runSimulation = useCallback(() => {
    if (!runningReference.current) return;
    if (!stack.current.length) {
      setRunning(false);
      return;
    }

    setGrid((g) => {
      let gridCopy = JSON.parse(JSON.stringify(g));

      if (algorithm.current === 'Breadth First') {
        breadthFirstTraversal(gridCopy, stack.current, getUnvisitedNeighbors);
      }
      if (algorithm.current === 'Depth First') {
        depthFristTraversal(gridCopy, stack.current, getUnvisitedNeighbors);
      }

      gridRef.current = gridCopy;
      return gridCopy;
    });

    let numberOfZeros = 0;
    for (let row = 0; row < numRows; row++) {
      for (let column = 0; column < numColumns; column++) {
        if (gridRef.current[row][column].visited === true) {
          numberOfZeros++;
        }
      }
      if (numberOfZeros === numRows * numColumns) {
        runningReference.current = false;
        return setRunning(false);
      }
    }

    setTimeout(runSimulation, 10);
  }, []);

  const handleMousedown = (e) => {
    if (e.button === 0) {
      setLeftMousedown(true);
    }
    if (e.button === 2) {
      setRightMousedown(true);
    }
  };

  const handleMouseup = (e, i, j) => {
    if (e.button === 0) {
      setLeftMousedown(false);
    }

    if (e.button === 2) {
      setRightMousedown(false);
    }
  };

  const handleMouseEnter = (i, j) => {
    if (leftMousedown) {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      gridCopy[i][j].on = true;
      setGrid(gridCopy);
    }

    if (rightMousedown) {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      if (gridCopy[i][j].on) {
        gridCopy[i][j].wall = true;
        setGrid(gridCopy);
      }
    }
  };

  const handleClick = (e, i, j) => {
    console.log(e.type);
    let gridCopy = JSON.parse(JSON.stringify(grid));
    console.log(e.button);

    if (startingNode.current === '' && e.button === 0) {
      selectStartingNode(i, j);
    } else if (
      startingNode.current !== '' &&
      gridCopy[i][j].visited &&
      e.button === 0
    ) {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      if (gridCopy[i][j].visited) {
        gridCopy[i][j].visited = false;
        setGrid(gridCopy);
        startingNode.current = '';
      }
    }
    // else if (e.button === 0) {
    //   // Functionality for turning cells on and off, which I don't want to include at the moment

    //   let gridCopy = JSON.parse(JSON.stringify(grid));
    //   gridCopy[i][j].on = !gridCopy[i][j].on;
    //   setGrid(gridCopy);
    // }
  };

  const selectStartingNode = (i, j) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    gridCopy[i][j].visited = grid[i][j].visited ? false : true;
    startingNode.current = [i, j];
    stack.current = [startingNode.current];
    setGrid(gridCopy);
  };

  const resetGrid = () => {
    let newGrid = generateEmptyGrid();
    runningReference.current = false;
    setGrid(newGrid);
    gridRef.current = newGrid;
    stack.current = [];
    startingNode.current = '';
    setRunning(false);
  };

  const selectAlgorithm = (e) => {
    if (e.target.innerHTML === 'Breadth First') {
      algorithm.current = 'Breadth First';
    } else if (e.target.innerHTML === 'Depth First') {
      algorithm.current = 'Depth First';
    }
    console.log(algorithm.current);
  };

  const handleDoubleClick = (i, j) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    gridCopy[i][j].wall = !gridCopy[i][j].wall;
    setGrid(gridCopy);
  };

  let gridRender = grid.map((row, i) => (
    <div className='row' key={i}>
      {row.map((col, j) => (
        <div
          key={`${i}-${j}`}
          onMouseEnter={() => handleMouseEnter(i, j)}
          onClick={(e) => handleClick(e, i, j)}
          onDoubleClick={() => handleDoubleClick(i, j)}
          // onContextMenu={(e) => handleRightClick(e, i, j)}

          style={{
            width: 20,
            height: 20,
          }}
          className={`cell ${
            grid[i][j].visited
              ? 'visited'
              : grid[i][j].wall
              ? 'wall'
              : grid[i][j].on
              ? 'on'
              : ''
          }`}
        ></div>
      ))}
    </div>
  ));

  return (
    <div
      onMouseDown={(e) => handleMousedown(e)}
      onMouseUp={(e) => handleMouseup(e)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <button
        onClick={() => {
          if (!running) {
            runningReference.current = true;
            runSimulation();
          } else {
            runningReference.current = false;
          }
          setRunning(!running);
        }}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          resetGrid();
        }}
      >
        Reset
      </button>
      <button onClick={selectAlgorithm}>Breadth First</button>
      <button onClick={selectAlgorithm}>Depth First</button>
      <button
        onClick={() => {
          return new Promise((resolve, reject) => {
            resolve(() => console.log('ji')).then(() => console.log('bye'));
          }).catch(() => console.log('resolve'));
        }}
      >
        Test
      </button>
      <div className='grid'>{gridRender} </div>
      <Instructions />
    </div>
  );
};

export default Grid;
