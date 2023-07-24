import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { useDisconnect } from '@thirdweb-dev/react';

const Navbar = () => {
  const navigate = useNavigate();
  const { connect, address } = useStateContext();
  const disconnect = useDisconnect();

  return (
    <div className="w-full h-16 bg-[#1c1c24] absolute top-0 right-0 left-0 flex flex-row items-center justify-between p-10">
      <div className="flex flex-row justify-center items-center gap-5">
        <img src={logo} alt="logo" className="w-16 h-16" />
        <p className="text-[#ebebeb] font-medium font-epilogue">
          User : {' '}
          <span className="text-[#4acd8d]">
            {address && address.substring(0, 5)}...
            {address && address.substring(address.length, address.length - 5)}
          </span>
        </p>
      </div>

      <div className="flex flex-row gap-7">
        <button
          className="bg-[#4acd8d] px-5 py-2 rounded-lg"
          onClick={() => navigate('./donate')}
        >
          Donate
        </button>
        <button
          className="bg-white px-3 py-2 rounded-lg"
          onClick={() => connect()}
        >
          {address ? 'Connected' : 'Connect'}
        </button>
        <button
          className="bg-[#CD6688] px-3 py-2 rounded-lg"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default Navbar;
