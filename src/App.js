import React, { useState } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Web3 from 'web3';
import NGTokenABI from './abis/NGToken';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = '0xc05aB6B5d736B2ee93bBCb70c8dC7dA4188b798A';
const NGToken = new web3.eth.Contract(NGTokenABI, contractAddress);

function App() {
  const [address, setAddress] = useState('0x0');
  const [etherBalance, setEtherBalance] = useState(0);
  const [tokens, setTokens] = useState(0);

  const loadUser = async () => {
    if (window.ethereum === undefined) return;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAddress(account);
  };

  loadUser();

  const loadEtherBalance = async () => {
    if (address === '0x0') return;
    const balance = await web3.eth.getBalance(address);
    setEtherBalance(balance);
  };

  loadEtherBalance();

  const loadTokens = async () => {
    if (address === '0x0') return;
    const tokenBalance = await NGToken.methods.balanceOf(address).call();
    setTokens(tokenBalance);
  };

  loadTokens();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">NG Tokens</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             {address}
          </Navbar.Text>
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
