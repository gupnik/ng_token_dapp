import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Web3 from 'web3';
import NGTokenABI from './abis/NGToken';

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.alert('Non-Ethereum browser detected. Try installing MetaMask!');
  }
};

function App() {
  const [address, setAddress] = useState('0x0');
  const [etherBalance, setEtherBalance] = useState(0);
  const [tokens, setTokens] = useState(0);

  const loadEtherBalance = async (addr) => {
    if (window.web3 === undefined) return;
    const balance = await window.web3.eth.getBalance(addr);
    setEtherBalance(balance);
  };

  const loadTokens = async (addr) => {
    if (window.web3 === undefined) return;
    const contractAddress = '0xc05aB6B5d736B2ee93bBCb70c8dC7dA4188b798A';
    const tokenInstance = new window.web3.eth.Contract(NGTokenABI, contractAddress);
    const tokenBalance = await tokenInstance.methods.balanceOf(addr).call();
    setTokens(tokenBalance);
  };

  const loadUser = async () => {
    if (window.web3 === undefined) return;
    const accounts = await window.web3.eth.getAccounts();
    const account = accounts[0];
    setAddress(account);
    loadEtherBalance(account);
    loadTokens(account);
  };
  
  const setup = async () => {
    await loadWeb3();
    await loadUser();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">NG Tokens</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {address !== '0x0' 
          ?
          <Navbar.Text>
            {address}
          </Navbar.Text>
          : 
          <Button type="submit" onClick={setup}>Connect</Button>
          }
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col>Ether Balance: </Col>
          <Col>{etherBalance}</Col>
        </Row>
        <Row>
          <Col>NGT Balance: </Col>
          <Col>{tokens}</Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
