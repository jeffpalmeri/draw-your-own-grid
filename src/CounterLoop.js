import React from 'react';
import { useState } from 'react';

const CounterLoop = () => {
  const [count, setCount] = useState(0);
  console.log(count);

  const incrementCount = () => {
    setCount((c) => {
      return c + 1;
    });
  };

  const runSimulation = () => {
    // setCount((c) => {
    //   return c + 1;
    // });
    // setCount(count + 1);

    setInterval(incrementCount, 1000);
  };

  return (
    <div>
      <h1>Hi</h1>
      <button onClick={runSimulation}>Start</button>
      <h2>{count}</h2>
    </div>
  );
};

export default CounterLoop;
