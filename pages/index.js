import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CompaignFactory from "../artifacts/contracts/Compaign.sol/CompaignFactory.json"
import Link from 'next/link'
import { useMoralis } from "react-moralis"


export default function Index({HealthData,EducationData,AnimalData, BussinessData}) {
  const {account} = useMoralis()
  
  const [campaignsData, setCampaignsData] = useState([]);
  const [filter, setFilter] = useState([])
  
  useEffect(() => {
    const Request = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_GOERLI_RPC_URL
      )
    
      const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_ADDRESS,
          CompaignFactory.abi,
          provider
      )
    
      const getAllCompaigns = contract.filters.compaignCreated()
      const AllCompaigns = await contract.queryFilter(getAllCompaigns)
      const AllCompaign = AllCompaigns.reverse()
      const AllData = AllCompaign.map((e) => {
        return {
          title: e.args.title,
          img: e.args.imageURI,
          owner: e.args.owner,
          timestamp: parseInt(e.args.timestamp),
          amount: ethers.utils.formatEther(e.args.requiredAmount),
          address: e.args.compaignAddress     
        }
      })

      setCampaignsData(AllData)
      setFilter(AllData)
    }

    Request()
  },[])

    return (
    <HomeWrapper>
      {/* Filter Section */}
      <FilterWrapper>
        <FilterAltIcon style={{fontSize:40}} />
        <Category onClick={() => setFilter(campaignsData)} >All</Category>
        <Category onClick={() => setFilter(BussinessData)} >Bussiness</Category>
        <Category onClick={() => setFilter(HealthData)} >Health</Category>
        <Category onClick={() => setFilter(EducationData)} >Education</Category>
        <Category onClick={() => setFilter(AnimalData)} >Animal</Category>
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper>

        { filter.map((e) =>  {
          console.log("https://gateway.pinata.cloud/ipfs/" + e.img)
          return (
            <Card key={e.timestamp} >
              <CardImg>
                <Image 
                  alt="Crowdfunding dapp"
                  layout='fill' 
                  src={"https://gateway.pinata.cloud/ipfs/" + e.img}
                />
              </CardImg>
              <Title>
                {e.title}
              </Title>
              <CardData>
                <Text>Owner<AccountBoxIcon /></Text> 
                <Text>{account && account.toUpperCase().slice(39)==e.owner.slice(39) ? "You": `${e.owner.slice(0, 6)}...${e.owner.slice(39)}`}</Text>
              </CardData>
              <CardData>
                <Text>Amount in Ether<PaidIcon /></Text> 
                <Text>{e.amount}</Text>
              </CardData>
              <CardData>
                <Text><EventIcon /></Text>
                <Text>{new Date(parseInt(e.timestamp * 1000)).toLocaleString()}</Text>
              </CardData>
              <Link passHref href={'/' + e.address}><Button>
                Go to Campaign
              </Button></Link>
            </Card>
          )}
          )
        }
    
      </CardsWrapper>
    </HomeWrapper>
  )
}

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_GOERLI_RPC_URL
  )

  const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_ADDRESS,
      CompaignFactory.abi,
      provider
  )

  const getEducationCompaigns = contract.filters.compaignCreated(null, null, null, null, null, null, "Education")
  const EducationCompaigns = await contract.queryFilter(getEducationCompaigns)
  // const EducationCompaign = EducationCompaigns.reverse()
  const EducationData = EducationCompaigns.map((e) => {
    return {
      title: e.args.title,
      img: e.args.imageURI,
      owner: e.args.owner,
      timestamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.compaignAddress    
    }
  })

  const getHealthCompaigns = contract.filters.compaignCreated(null, null, null, null, null, null, "Health")
  const HealthCompaigns = await contract.queryFilter(getHealthCompaigns)
  // const HealthCompaign = HealthCompaigns.reverse()
  const HealthData = HealthCompaigns.map((e) => {
    return {
      title: e.args.title,
      img: e.args.imageURI,
      owner: e.args.owner,
      timestamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),    
      address: e.args.compaignAddress    

    }
  })

  const getAnimalCompaigns = contract.filters.compaignCreated(null, null, null, null, null, null, "Animal")
  const AnimalCompaigns = await contract.queryFilter(getAnimalCompaigns)
  // const AnimalCompaign = AnimalCompaigns.reverse()
  const AnimalData = AnimalCompaigns.map((e) => {
    return {
      title: e.args.title,
      img: e.args.imageURI,
      owner: e.args.owner,
      timestamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.compaignAddress        
    }
  })

  const getBussinessCompaigns = contract.filters.compaignCreated(null, null, null, null, null, null, "Bussiness")
  const BussinessCompaigns = await contract.queryFilter(getBussinessCompaigns)
  // const BussinessCompaign = BussinessCompaigns.reverse()
  const BussinessData = BussinessCompaigns.map((e) => {
    return {
      title: e.args.title,
      img: e.args.imageURI,
      owner: e.args.owner,
      timestamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.compaignAddress        
    }
  })

  return {
    props: {
      HealthData,
      EducationData,
      AnimalData,
      BussinessData
    }
  }

}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 15px;
`
const Category = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.bgDiv};
  margin: 0px 15px;
  border-radius: 8px;
  font-family: 'Poppins';
  font-weight: normal;
  cursor: pointer;
`
const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 25px;
`
const Card = styled.div`
  width: 30%;
  margin: 0px 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.bgDiv};

  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`
const Title = styled.h2`
  font-family: 'Roboto';
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`
const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  `
const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
`
const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%); 
  border: none;
  cursor: pointer;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`