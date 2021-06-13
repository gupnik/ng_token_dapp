import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Web3 from 'web3';
import NGTokenABI from './abis/NGToken';

let web3;
let NGToken;

function App() {
  const [address, setAddress] = useState('0x0');
  const [etherBalance, setEtherBalance] = useState(0);
  const [tokens, setTokens] = useState(0);

  const loadEtherBalance = async (addr) => {
    const balance = await web3.eth.getBalance(addr);
    setEtherBalance(balance);
  };

  const loadTokens = async (addr) => {
    const tokenBalance = await NGToken.methods.balanceOf(addr).call();
    setTokens(tokenBalance);
  };

  const loadUser = async () => {
    if (window.ethereum === undefined) return;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAddress(account);
    loadEtherBalance(account);
    loadTokens(account);
  };
  
  const loadWeb3 = async () => {
    web3 = new Web3(Web3.givenProvider);
    const contractAddress = '0xc05aB6B5d736B2ee93bBCb70c8dC7dA4188b798A';
    NGToken = new web3.eth.Contract(NGTokenABI, contractAddress);

      loadUser();
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
          <Button type="submit" onClick={loadWeb3}>Submit</Button>
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
