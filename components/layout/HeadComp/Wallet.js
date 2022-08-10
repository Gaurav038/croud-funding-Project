import styled from "styled-components"
import {ethers} from "ethers"
import { useState, useEffect} from "react"
import { useMoralis } from "react-moralis"

export default function Wallet() {
    const {enableWeb3, account, isWeb3Enabled, Moralis, isWeb3EnableLoading} = useMoralis()


    useEffect(()=> {
        if(isWeb3Enabled) {return}
        if(window && window.localStorage.getItem("connected")){
           enableWeb3() 
        }
        
        console.log("hiii ", isWeb3Enabled)
        
    },[isWeb3Enabled])

    useEffect(()=>{
        Moralis.onAccountChanged((account)=>{
            console.log(account, 'Changed to this')
            if(account==null){
                window.localStorage.removeItem("connected")
            }
        })
    },[])

  return (
    <ConnectWalletWrapper onClick={async () => {
        await enableWeb3() 
        window.localStorage.setItem("connected", "injected") 
        }} >
    {!account ? <Address>Connect Wallet</Address> : <Address>{account.slice(0,6)}...{account.slice(36)}</Address>}
  </ConnectWalletWrapper>
  )
}

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 5px 9px;
  height: 100%;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: small;
  cursor: pointer;
`;

const Address = styled.h2`
    background-color: ${(props) => props.theme.bgSubDiv};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 0 5px;
    border-radius: 10px;
`

const Balance = styled.h2`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`
