import React from 'react';

const OurCauses = () => {
  return (
    <div className="h-[720px] p-5 flex flex-row flex-wrap gap-5 relative">
      <div className="absolute top-0 left-[30%]">
        <h1 className="uppercase tracking-widest text-[#1dc071] font-semibold font-epilogue text-6xl">
          Our Campaign
        </h1>
      </div>

      <div className="w-72 h-72 bg-[#2c2c3d] rounded-lg overflow-hidden space-y-2 mt-24">
        <img
          src="https://a6e8z9v6.stackpathcdn.com/chariti/demo2/wp-content/uploads/sites/4/2016/06/larm-rmah-AEaTUnvneik-unsplash-1200x755.jpg"
          alt="img"
          className="w-full object-contain"
        />
        <h4 className="font-epilogue pt-2 text-white font-semibold pl-4">
          Education need
        </h4>

        <div className="flex flex-row items-center justify-center">
          <div class="w-64 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="bg-[#4acd8d] h-2.5 rounded-full"
              style={{ width: '45%' }}
            ></div>
          </div>
        </div>

        <div className='flex flow-row justify-between items-center px-4 pt-1 text-white font-medium'>
          <div>
            <p>₹31,500/70,000</p>
          </div>
          <div>
            <p>45%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCauses;
