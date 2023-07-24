import React, { useState } from 'react';
import { useStateContext } from '../context';
import { useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const Donate = () => {
  const [amount, setAmount] = useState();
  const { address, contract } = useStateContext();

  const { mutateAsync: donate, isLoading } = useContractWrite(
    contract,
    'donate'
  );

  const { mutateAsync: cancelDonation, isLoading: cancelDonationLoading } =
    useContractWrite(contract, 'cancelDonation');

  const submitHandler = async () => {
    const notification = toast.loading('Progressing...');
    try {
      const data = await donate({
        args: [],
        overrides: {
          gasLimit: 1000000,
          value: ethers.utils.parseEther(amount),
        },
      });
      toast.success('Donated successfully!', {
        id: notification,
      });
      console.info('contract call successs', data);
      setAmount('0');
    } catch (err) {
      toast.error('Whoops something went wrong!', {
        id: notification,
      });
      console.error('contract call failure', err);
    }
  };

  const cancelDonationHandler = async () => {
    const notification = toast.loading('Withdraw processing');

    try {
      const data = await cancelDonation({
        args: [],
        overrides: {
          gasLimit: 1000000,
          value: ethers.utils.parseEther('0'),
        },
      });
      toast.success('Withdraw successfully!', {
        id: notification,
      });
      console.info('contract call successs', data);
    } catch (err) {
      toast.error('Whoops something went wrong!', {
        id: notification,
      });
      console.error('contract call failure', err);
    }
  };

  return (
    <div className="h-[720px] flex flex-col items-center justify-center space-y-5 relative">
      <div className="absolute top-0 left-[40%]">
        <h1 className="uppercase tracking-widest text-[#1dc071] font-semibold font-epilogue text-6xl">
          Donate
        </h1>
      </div>

      <div className="absolute top-0 right-0">
        <h4 className="text-[#4acd8d] text-xl uppercase text-center font-normal font-epilogue tracking-wide ">
          Withdraw donation
        </h4>
        <h4 className="text-[#4acd8d] text-xl uppercase text-center font-normal font-epilogue tracking-wide ">
          in : 20min
        </h4>
      </div>

      <div className="flex flex-col space-y-5 bg-[#1c1c24] border border-[#1dc071] p-20 rounded-2xl">
        <div className="flex flex-row gap-5">
          <label
            htmlFor=""
            className="text-white text-4xl font-epilogue font-semibold"
          >
            Amount:
          </label>
          <input
            type="text"
            placeholder="Donate amount in ETH"
            className="bg-[#3a3a43] text-white rounded-md font-epilogue p-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-5">
          <button
            className="text-white  bg-[#8664ff] px-7 py-3 rounded-md"
            onClick={() => cancelDonationHandler()}
          >
            Cancel
          </button>
          <button
            className="text-white  bg-[#2ab070] px-7 py-3 rounded-md"
            onClick={() => submitHandler()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donate;
