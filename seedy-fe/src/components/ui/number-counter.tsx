import { useState } from "react";
import { wolfer } from "@/lib/fonts";

const NumberCounter = () => {
  const [count, setCount] = useState(1);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(1, prev - 1));

  return (
    <div className="inline-flex items-center rounded-lg bg-[#234014] text-white shadow-sm w-32">
      <button
        onClick={decrement}
        className="px-4 py-3 text-2xl font-bold hover:bg-green-900 transition rounded-l-lg"
      >
        -
      </button>
      <span className="px-4 py-3 text-center min-w-[3rem] text-2xl font-bold">
        {count}
      </span>
      <button
        onClick={increment}
        className="px-4 py-3 text-2xl font-bold hover:bg-green-900 transition rounded-r-lg"
      >
        +
      </button>
    </div>
  );
};

export default NumberCounter;
