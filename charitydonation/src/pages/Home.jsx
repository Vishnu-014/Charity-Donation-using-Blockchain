import React from "react";
import { useState } from "react";
import { useCountUp } from "use-count-up";
import { useStateContext } from "../context";
import { FaHandsHelping } from "react-icons/fa";

const Home = () => {
  const { address, connect } = useStateContext();

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [start1, setStart1] = useState(0);
  const [end1, setEnd1] = useState(20);
  const [duration, setDuration] = useState(2);
  const [decimalPlaces, setDdecimalPlaces] = useState(0);
  const [easing, setEasing] = useState("easeOutCubic");
  const [thousandsSeparator, setThousandsSeparator] = useState("");
  const [decimalSeparator, setDecimalSeparator] = useState("");
  const setValue = (func) => (event) => func(parseFloat(event.target.value));
  const setText = (func) => (event) => func(event.target.value);

  const { value, reset } = useCountUp({
    isCounting: true,
    start,
    end,
    duration,
    easing,
    decimalPlaces,
    thousandsSeparator,
    decimalSeparator,
  });

  return (
    <div className="h-[720px] flex flex-col items-center justify-center relative">
      <div className="text-white space-y-4 font-semibold">
        <div className="flex flex-row items-center absolute top-36 left-24 gap-5">
          <h1 className="text-8xl tracking-widest">
            DO <span className="text-[#1dc071]">SOMETHINGS</span>
          </h1>
          {/* <img
            src="https://www.pngkey.com/png/full/393-3935033_helping-hands-giving-back-give-back.png"
            alt=""
            className="w-32 h-32 object-contain"
          /> */}
          <FaHandsHelping size={80} />
        </div>
        <div className="flex flex-row items-center absolute top-72 right-24 gap-5">
          <FaHandsHelping size={80} />
          <h1 className="text-8xl tracking-widest">
            <span className="text-[#1dc071]">INCREDIBLE</span> NOW
          </h1>
        </div>
      </div>

      <div className="absolute bottom-48 right-[45%] flex flex-row gap-5 items-center justify-center">
        <button className="bg-[#4acd8d] px-4 py-3 rounded-lg font-medium font-epilogue animate-pulse">
          Donate Now
        </button>
        <button className="text-white font-medium font-epilogue border border-[#4acd8d] px-4 py-3 rounded-lg">
          How it works
        </button>
      </div>

      <div className="absolute bottom-10 right-0 left-0 h-24 bg-[#11111b] rounded-xl text-white flex flex-row items-center justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">{value}M</h1>
          <h1 className="text-xl font-normal">Volunteers Connected</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">{7}M</h1>
          <h1 className="text-xl font-normal">Total Money Donated</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-semibold">{2}M</h1>
          <h1 className="text-xl font-normal">Volunteers Needed</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;