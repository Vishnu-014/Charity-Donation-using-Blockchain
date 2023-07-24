import React from 'react';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { TbHomeSearch } from 'react-icons/tb';
import { MdAdminPanelSettings } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { Squares2X2Icon } from '@heroicons/react/24/solid';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1c1c24] absolute top-44 left-2 h-[580px] w-[75px] flex flex-col justify-around items-center rounded-lg">
      <div
        className="bg-[#1c1c24] h-12 w-14 rounded-md flex flex-row items-center justify-center hover:bg-[#2C2F33]"
        onClick={() => navigate('/')}
      >
        <AiOutlineHome size={32} className="text-[#4acd8d]" />
      </div>

      <div
        className="bg-[#1c1c24] h-12 w-14 rounded-md flex flex-row items-center justify-center hover:bg-[#2C2F33]"
        onClick={() => navigate('/charities')}
      >
        <TbHomeSearch size={32} className="text-[#4acd8d]" />
      </div>
      <div className="bg-[#1c1c24] h-12 w-14 rounded-md flex flex-row items-center justify-center hover:bg-[#2C2F33]">
        <MdAdminPanelSettings
          size={32}
          className="text-[#4acd8d]"
          onClick={() => navigate('/admin')}
        />
      </div>
      <div className="bg-[#1c1c24] h-12 w-14 rounded-md flex flex-row items-center justify-center hover:bg-[#2C2F33]">
        <CgProfile
          size={32}
          className="text-[#4acd8d]"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

export default Sidebar;
