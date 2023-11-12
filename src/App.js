import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function TransactionIDInput({ onTransactionIDChange }) {
  const [transactionID, setTransactionID] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTransactionID(value);

    // Pass the updated transaction ID to the parent component
    onTransactionIDChange(value);
  };

  return (
    <div>
      <label htmlFor="transactionID">Transaction ID:</label>
      <input
        type="number"
        id="transactionID"
        value={transactionID}
        onChange={handleInputChange}
        placeholder="Enter Transaction ID"
      />
    </div>
  );
}

function App() {
  const [blockNumber, setBlockNumber] = useState('');

  const [blockWithTransactions, setBlockWithTransactions]=useState({});
  const [transaction, setTransacion]=useState(0);
  const [transactionDetails, setStransactionDetails]=useState({});
  const handleTransactionIDChange = (value) => {
    if(value<blockWithTransactions.transactions.length)
    {
      setTransacion(value);
    }
    else
    {
        console.log("no transaction with such id");
    }
  };

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
  //  console.log(blockNumber);
  }
async function getBlockWithTransactionList()
{
  setBlockWithTransactions(await alchemy.core.getBlockWithTransactions(blockNumber));
//  console.log(blockWithTransactions.transactions);
}


async function getTransactionDetails()
{
  
  setStransactionDetails(blockWithTransactions.transactions[transaction]);
  return <div>{transactionDetails}</div>
}
   return (
    <div>
      <h1>Transaction ID Input</h1>
      <button onClick={getBlockNumber}>Get latest block</button>
      <button onClick={getBlockWithTransactionList}>get transaction</button>
      <p>Block number is: {blockNumber}</p>
      <TransactionIDInput onTransactionIDChange={handleTransactionIDChange} />
      <div>
      <button onClick={getTransactionDetails}>Get transaction</button>
      {JSON.stringify(transactionDetails)}
      </div>
      
    </div>
  );
}

export {App, TransactionIDInput};
