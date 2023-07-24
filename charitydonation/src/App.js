
import { Route, Routes } from 'react-router-dom';

import { useCountUp } from 'use-count-up'

import Home from "./pages/Home";
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import Charities from './pages/Charities';
import Admin from './pages/Admin';
import Donate from './pages/Donate';
import OurCauses from './pages/OurCauses';

export default function App() {
  return (
    <div className='relative h-screen bg-[#13131A]'>
      <Navbar />
      <Sidebar />

      <div className='absolute w-[1460px] left-28 top-28'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charities" element={<Charities />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/ourcauses" element={<OurCauses />} />
        </Routes>
      </div>
    </div>
  );
}
