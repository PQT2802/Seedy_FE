import { useState } from "react";

const NumberCounter = () => {
  const [count, setCount] = useState(1);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(1, prev - 1));

  return (
    <div className="inline-flex items-center rounded-lg bg-[#1a3420] text-white shadow-sm">
      <button
        onClick={decrement}
        className="px-3 py-2 hover:bg-black/10 transition rounded-l-lg"
      >
        -
      </button>
      <span className="px-3 py-2 text-center min-w-[2rem]">{count}</span>
      <button
        onClick={increment}
        className="px-3 py-2 hover:bg-black/10 transition rounded-r-lg"
      >
        +
      </button>
    </div>
  );
};

export default NumberCounter;
