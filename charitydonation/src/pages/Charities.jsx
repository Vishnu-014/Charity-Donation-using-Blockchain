import React from 'react';

const Charities = () => {
  return (
    <div className="h-[720px] p-5 flex flex-row flex-wrap gap-5">
      <div className="w-72 h-72 bg-[#3a3a43] rounded-lg overflow-hidden">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5a3969e449fc2b067725c101/1514490564297-ETSR9GX0R1LNDTUQ9B0R/dsc_1008.jpg"
          alt="img"
          className="w-full object-contain"
        />
        <h4 className="font-epilogue mt-3 text-white font-semibold pl-2">
          Name: <span className="text-[#9e83ff] truncate">Charity 1</span>
        </h4>
        <h4 className="font-epilogue mt-3 text-white font-semibold pl-2">
          Owner: <span className="text-[#9e83ff] truncate">0x7473e0960fb5</span>
        </h4>
      </div>

      <div className="w-72 h-72 bg-[#3a3a43] rounded-lg overflow-hidden">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5a3969e449fc2b067725c101/1514490564297-ETSR9GX0R1LNDTUQ9B0R/dsc_1008.jpg"
          alt="img"
          className="w-full object-contain"
        />
        <h4 className="font-epilogue mt-3 text-white font-semibold pl-2">
          Name: <span className="text-[#9e83ff] truncate">Charity 1</span>
        </h4>
        <h4 className="font-epilogue mt-3 text-white font-semibold pl-2">
          Owner: <span className="text-[#9e83ff] truncate">0x7473e0960fb5</span>
        </h4>
      </div>
      
    </div>
  );
};

export default Charities;
