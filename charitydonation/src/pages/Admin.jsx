import React, { Fragment, useEffect, useState } from 'react';
import { useStateContext } from '../context';
import {
  useContractEvents,
  useContractRead,
  useDisconnect,
  useContractWrite,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

const Admin = () => {
  const [charityAddress, setCharityAddress] = useState('');

  const { address, contract, getDonationCount } = useStateContext();

  const {
    data: ownerAddress,
    isLoading: ownerLoading,
    error: ownerError,
  } = useContractRead(contract, 'owner');

  const {
    data: totalDonationData,
    isLoading: totalDonationLoading,
    error: totalDonationError,
  } = useContractRead(contract, 'totalDonations');

  let totalDonationEth;
  if (!totalDonationLoading) {
    totalDonationEth = ethers.utils.formatEther(totalDonationData);
  }

  const {
    data: donationCount,
    isLoading: donationCountLoading,
    error: donationCountError,
  } = useContractRead(contract, 'getDonationCount');

  const {
    data: allDonationsData,
    isLoading: allDonationsLoading,
    error: allDonationsError,
  } = useContractRead(contract, 'getAllDonations');

  const parsedDonations = [];

  const [donationList, setDonationList] = useState([]);

  const getDonationsList = () => {
    if (!donationCountLoading) {
      for (let i = 0; i < donationCount; i++) {
        parsedDonations.push({
          donator: allDonationsData[i].donor,
          donation: ethers.utils.formatEther(allDonationsData[i].amount),
          timestamp: allDonationsData[i].timestamp.toNumber(),
        });
      }
    }

    setDonationList(parsedDonations);
    // console.log('====================================');
    // console.log(parsedDonations);
    // console.log('====================================');
  };

  //console.log("o:",ownerAddress);
  //console.log("u:",address);

  const { mutateAsync: withdrawFunds, isLoading: withdrawLoading } =
    useContractWrite(contract, 'withdrawFunds');

  const withdrawHandler = async () => {
    const notification = toast.loading('Withdraw processing');
    try {
      const data = await withdrawFunds({
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


  // 0xb4780722B15F21BaEEF78C66dD0c8461ec8821bD
  const { mutateAsync: distributeFunds, isLoading:distributeFundsLoading } = useContractWrite(contract, "distributeFunds")
  const distributeFundHandler = async() => {
    const notification = toast.loading('Processing...');
    try {
      let charity = charityAddress
      const data = await distributeFunds({ args: [charity] });
      toast.success('Donated successfully!', {
        id: notification,
      });
      console.info("contract call successs", data);
    } catch (err) {
      toast.error('Whoops something went wrong!', {
        id: notification,
      });
      console.error("contract call failure", err);
    }
  }

  return (
    <Fragment>
      {!ownerLoading && ownerAddress !== address && (
        <div className="flex flex-row items-center justify-center">
          <h3 className="text-2xl text-white text-epilogue">
            You are not the owner
          </h3>
        </div>
      )}
      {!ownerLoading && ownerAddress === address && (
        <div className="h-[720px] space-y-9  px-8 py-8 relative">
          <h2 className="text-white font-epilogue font-semibold text-xl pt-4">
            Owner :{' '}
            <span className="text-[#cb6dfd]">
              {!ownerLoading ? ownerAddress : 'Loading...'}
            </span>
          </h2>

          <div className="flex flex-row justify-between">
            <div className="bg-[#2C2F33] text-white font-epilogue font-semibold text-xl inline-block px-4 py-4 rounded-lg">
              <h3 className="">
                Total Donations:{' '}
                <span className="text-[#1dc071]">
                  {!donationCountLoading ? donationCount.toNumber() : ''}
                </span>
              </h3>
            </div>

            <div className="flex flex-row gap-5 items-center">
              <div className="bg-[#2C2F33] text-white font-epilogue font-semibold text-xl inline-block px-4 py-4 rounded-lg">
                <h3 className="">
                  Total Amount:{' '}
                  <span className="text-[#1dc071]">
                    {!totalDonationLoading ? totalDonationEth : ''}
                  </span>
                </h3>
              </div>
              <button
                className="bg-[#EF6262] text-white font-bold font-epilogue h-[60px] px-4 py-1 rounded-lg"
                onClick={() => withdrawHandler()}
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <button
              className="bg-[#8c6dfd] text-white font-bold font-epilogue h-[50px] px-4 py-1 rounded-lg"
              onClick={() => getDonationsList()}
            >
              Get Data
            </button>

            <div className="flex flex-row items-center gap-5 ">
              <div>
                <label htmlFor="distribute"></label>
                <input
                  type="text"
                  placeholder="Chariry Address"
                  className="bg-[#2C2F33] px-6 py-3 rounded-md text-white"
                  value={charityAddress}
                  onChange={(e) => setCharityAddress(e.target.value)}
                />
              </div>
              <button
                className="bg-[#0B666A] text-white font-bold font-epilogue h-[50px] px-4 py-1 rounded-lg"
                onClick={() => distributeFundHandler()}
              >
                Distribute
              </button>
            </div>
          </div>

          {/* all donations */}
          <div className="flex flex-row justify-center min-h-[40px] overscroll-y-contain">
            <table className="table-auto min-w-[1000px] text-center text-sm font-light p-5 rounded-md">
              <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-[#815fff] uppercase text-xl text-white font-epilogue">
                <tr>
                  <th className="px-6 py-4">donator</th>
                  <th className="px-6 py-4">donation</th>
                  <th className="px-6 py-4">timestamp</th>
                </tr>
              </thead>

              <tbody>
                {donationList.length !== 0 &&
                  !totalDonationLoading &&
                  donationList.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-[#2C2F33] text-white text-lg font-epilogue"
                      >
                        <td>{item.donator}</td>
                        <td>{item.donation}</td>
                        <td>{item.timestamp}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Admin;
