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
      className="text-whtie h-4 w-4 fill-current"
      enableBackground="new 0 0 56.966 56.966"
      version="1.1"
      viewBox="0 0 56.966 56.966"
      xmlSpace="preserve"
    >
      <path
        className="text-[#1DA1F2] font-bold"
        d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
      ></path>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      x="0"
      y="0"
      viewBox="0 0 48 48"
    >
      <path
        fill="#03A9F4"
        d="M42 12.429a14.978 14.978 0 01-4.247 1.162 7.38 7.38 0 003.251-4.058 14.829 14.829 0 01-4.693 1.776A7.377 7.377 0 0030.926 9c-4.08 0-7.387 3.278-7.387 7.32 0 .572.067 1.129.193 1.67a21.05 21.05 0 01-15.224-7.654 7.23 7.23 0 00-1 3.686c0 2.541 1.301 4.778 3.285 6.096a7.52 7.52 0 01-3.349-.914v.086c0 3.551 2.547 6.508 5.923 7.181a7.346 7.346 0 01-1.941.263c-.477 0-.942-.054-1.392-.135.94 2.902 3.667 5.023 6.898 5.086a14.925 14.925 0 01-9.174 3.134 14.61 14.61 0 01-1.761-.104A21.109 21.109 0 0017.321 38c13.585 0 21.017-11.156 21.017-20.834 0-.317-.01-.633-.025-.945A14.532 14.532 0 0042 12.429"
      ></path>
    </svg>
  );
}

const App = () => {
  const inputRef = useRef(null);
  const [res, setRes] = useState(null);
  const handleAnalyze = async (query = "ai projects", count = 1000) => {
    query = query.trim();
    if (!query.trim().length) {
      return;
    }

    setRes(null);
    try {
      const res = await axios.get(
        "https://tsa-backend-production.up.railway.app/api/tweets",
        {
          params: { query, count },
        }
      );
      console.log(res.data);
      setRes(res.data);
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "ai projects";
    }
    handleAnalyze();
  }, []);
  return (
    <div className="flex flex-col w-screen h-screen bg-black">
      <div className="grid grid-cols-12 h-full">
        <div className="flex flex-col col-span-2 px-4 py-6 gap-8 h-full">
          <div className="flex flex-col justify-center items-center gap-2 p-4 border border-blue-500 rounded">
            <div className="flex gap-1 items-center">
              <TwitterIcon />
              <span className="font-bold font-mono text-3xl text-[#1DA1F2]">
                Tweets
              </span>
            </div>

            <span className="font-bold font-mono text-3xl text-white">
              Sentiment
            </span>
            <span className="font-bold font-mono text-3xl text-[#1DA1F2]">
              Analyzer
            </span>
          </div>
          <div className="rounded-lg bg-green-500">
            <div className="border-b-2 border-white text-2xl font-semibold text-center py-2 text-white ">
              Positive 😊
            </div>
            <div className="p-4 text-4xl text-center text-white">
              {res ? Number(res["positive_percent"].toFixed(2)) + "%" : "N/A"}
            </div>
          </div>
          <div className="rounded-lg bg-red-500">
            <div className="border-b-2 border-white text-2xl font-semibold text-center py-2 text-white ">
              Negative 😤
            </div>
            <div className="p-4 text-4xl text-center text-white">
              {res ? Number(res["negative_percent"].toFixed(2)) + "%" : "N/A"}
            </div>
          </div>
          <div className="rounded-lg bg-[#03a9f4]">
            <div className="border-b-2 border-white text-2xl font-semibold text-center py-2 text-white ">
              Neutral 😐
            </div>
            <div className="p-4 text-4xl text-center text-white">
              {res ? Number(res["neutral_percent"].toFixed(2)) + "%" : "N/A"}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 col-span-10 p-4 overflow-auto">
          <div class="pt-2 relative mx-auto text-gray-600 w-1/2">
            <input
              class="border-2 border-[#1DA1F2] bg-black text-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
              type="search"
              name="search"
              placeholder="Search"
              ref={inputRef}
            />
            <button
              onClick={() => {
                handleAnalyze(inputRef.current.value);
              }}
              type="submit"
              class="absolute right-0 top-0 mt-5 mr-4"
            >
              <Icon />
            </button>
          </div>
          <span className="font-bold text-2xl bg-green-500  text-white px-4 py-2 rounded-full max-w-min">
            Positive
          </span>
          {res?.positive_tweets.map((tweet) => (
            <div className="p-2 bg-green-500 rounded-md bg-opacity-25">
              <p className="text-white text-base">{tweet}</p>
            </div>
          ))}

          <div className="min-h-[0.5px] my-4 bg-gray-400 w-full rounded-full" />

          <span className="font-bold text-2xl bg-red-500  text-white px-4 py-2 rounded-full max-w-min">
            Negative
          </span>
          {res?.negative_tweets.map((tweet) => (
            <div className="p-2 bg-red-500 rounded-md bg-opacity-25">
              <p className="text-white text-base">{tweet}</p>
            </div>
          ))}
          <div className="min-h-[0.5px] my-4 bg-gray-400 w-full rounded-full" />
          <span className="font-bold text-2xl bg-[#03a9f4] text-white px-4 py-2 rounded-full max-w-min">
            Neutral
          </span>
          {res?.neutral_tweets.map((tweet) => (
            <div className="p-2 bg-[#03a9f4] rounded-md bg-opacity-25">
              <p className="text-white text-base">{tweet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
