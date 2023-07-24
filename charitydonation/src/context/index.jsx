import React, { useContext, createContext } from 'react';

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const address = useAddress();
  const connect = useMetamask();

  const { contract } = useContract(
    '0xe00F53C53d7EA797c4056C9A325Bd4499ce463AE'
  );

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
  
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
