import React, { useState } from 'react';
import './Grid.css';

const numCol = 10;
const numRow = 10;

/*
{
  on: true,
  wall: false,
  visited: false
}

*/

const generateGrid = () => {
  let grid = [];
  for (let i = 0; i < numCol; i++) {
    grid.push([]);
    for (let j = 0; j < numRow; j++) {
      grid[i].push({ on: false, wall: false, visited: false });
    }
  }
  return grid;
};

const Grid = () => {
  const [grid, setGrid] = useState(() => generateGrid());
  const [leftMousedown, setLeftMousedown] = useState(false);
  const [rightMousedown, setRightMousedown] = useState(false);

  const handleMousedown = (e) => {
    if (e.button === 0) {
      setLeftMousedown(true);
    }
    if (e.button === 2) {
      setRightMousedown(true);
    }
  };

  const handleMouseup = (e) => {
    if (e.button === 0) {
      setLeftMousedown(false);
    }

    if (e.button === 2) {
      setRightMousedown(false);
    }
  };

  // const handleMouseLeave = () => {
  //   setLeftMousedown(false);
  // };

  const handleMouseEnter = (i, j) => {
    if (leftMousedown) {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      gridCopy[i][j].on = true;
      setGrid(gridCopy);
    }

    if (rightMousedown) {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      console.log(gridCopy[i][j]);
      if (gridCopy[i][j].on) {
        gridCopy[i][j].wall = !gridCopy[i][j].wall;
        setGrid(gridCopy);
      }
    }
  };

  const handleClick = (e, i, j) => {
    if (e.button === 0) {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      gridCopy[i][j].on = !gridCopy[i][j].on;
      setGrid(gridCopy);
    }

    if (e.button === 2) {
      let gridCopy = JSON.parse(JSON.stringify(grid));
      if (gridCopy[i][j].on) {
        gridCopy[i][j].wall = !gridCopy[i][j].wall;
        setGrid(gridCopy);
      }
    }
  };

  const gridRender = grid.map((col, i) => (
    <div className='row' key={i}>
      {col.map((cell, j) => (
        <div
          className='cell'
          key={`${i}-${j}`}
          onMouseEnter={() => handleMouseEnter(i, j)}
          style={{
            border: grid[i][j].on ? '1px solid black' : '1px solid transparent',

            backgroundColor: grid[i][j].wall
              ? 'grey'
              : grid[i][j].on
              ? '#eee'
              : 'transparent',
          }}
          onClick={(e) => handleClick(e, i, j)}
          onContextMenu={(e) => handleClick(e, i, j)}
        ></div>
      ))}
    </div>
  ));

  return (
    <div
      onMouseDown={(e) => handleMousedown(e)}
      onMouseUp={(e) => handleMouseup(e)}
      // onMouseLeave={handleMouseLeave}
      className='grid'
      onContextMenu={(e) => e.preventDefault()}
    >
      <h1>Hiiii</h1>
      <div className='gridContainer'>{gridRender}</div>
    </div>
  );
};

export default Grid;
