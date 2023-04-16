import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      x="0"
      y="0"
      className="text-gray-600 h-4 w-4 fill-current"
      enableBackground="new 0 0 56.966 56.966"
      version="1.1"
      viewBox="0 0 56.966 56.966"
      xmlSpace="preserve"
    >
      <path d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"></path>
    </svg>
  );
}

const App = () => {
  const inputRef = useRef(null);
  const [res, setRes] = useState(null);
  const handleAnalyze = async (query = "ai projects", count = 1000) => {
    try {
      const res = await axios.get(
        "https://tsa-backend-production.up.railway.app/api/tweets",
        {
          params: { query, count },
        }
      );
      setRes(res.data);
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "ai projects";
    }
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-col gap-2 px-4 py-2">
        <div class="pt-2 relative mx-auto text-gray-600 w-1/2">
          <input
            class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
            type="search"
            name="search"
            placeholder="Search"
            ref={inputRef}
          />
          <button
            onClick={() => {
              handleAnalyze();
            }}
            type="submit"
            class="absolute right-0 top-0 mt-5 mr-4"
          >
            <Icon />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 h-full">
        <div className="flex flex-col justify-between col-span-2 p-4 gap-8">
          <div className="border border-gray-300 rounded-lg">
            <div className="border-b border-gray-300 text-2xl font-semibold text-center py-2">
              Positive
            </div>
            <div className="p-4 text-7xl">48%</div>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <div className="border-b border-gray-300 text-2xl font-semibold text-center py-2">
              Positive
            </div>
            <div className="p-4 text-7xl">48%</div>
          </div>
          <div className="border border-gray-300 rounded-lg">
            <div className="border-b border-gray-300 text-2xl font-semibold text-center py-2">
              Positive
            </div>
            <div className="p-4 text-7xl">48%</div>
          </div>
        </div>
        <div className="flex flex-col gap-4 col-span-10 p-4 bg-red-300">
          <span>Postive</span>
          <span>Postive</span>
          <span>Postive</span>
          <pre>{JSON.stringify(res)}</pre>
        </div>
      </div>
    </div>
  );
};

export default App;
