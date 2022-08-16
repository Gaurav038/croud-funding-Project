import { ethers } from 'ethers';
import {useState, createContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import styled from 'styled-components';
import FormLeftWrapper from './FormComp/FormLeftWrapper';
import FormRightWrapper from './FormComp/FormRightWrapper';
import Link from 'next/link';
import { toast } from 'react-toastify';
import CompaignFactory from "../../artifacts/contracts/Compaign.sol/CompaignFactory.json"


export const FormState = createContext()

export default function Form() {

    const contractAddress = process.env.NEXT_PUBLIC_ADDRESS
    
    console.log(contractAddress, "------")
    const [form, setForm] = useState({
        campaignTitle: "",
        story: "",
        requiredAmount: "0",
        category: "Education"
    });

    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState("")
    const [uploaded, setUploaded] = useState(false)
    const [storyUrl, setStoryUrl] = useState()
    const [imageUrl, setImageUrl] = useState()

    const FormHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    
    const [image, setImage] = useState(null)
    
    const ImageHandler = (e) => {
        setImage(e.target.files[0])
    }
    
    const startCampaign = async (e) => {
        e.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        console.log(form.requiredAmount, "jjjjjjjjjjjjj")
        if(form.campaignTitle === "") {
            toast.warn("Title Field Is Empty");
          } else if(form.story === "" ) {
            toast.warn("Story Field Is Empty");
          } else if(form.requiredAmount === "") {
            toast.warn("Required Amount Field Is Empty");
          } else if(uploaded == false) {
              toast.warn("Files Upload Required")
            }
            else {        
            setLoading(true);  

            const contract = new ethers.Contract(
                contractAddress,
                CompaignFactory.abi,
                signer
              );
                
              const CampaignAmount = ethers.utils.parseEther(form.requiredAmount);
              
              const campaignData = await contract.createCompaign(
                form.campaignTitle,
                CampaignAmount,
                imageUrl,
                form.category,
                storyUrl
              );
        
              await campaignData.wait();   
        
              setAddress(campaignData.to);
            }
        }

  return (
    <FormState.Provider value={{form, setForm, image, setImage, ImageHandler, FormHandler, setImageUrl, setStoryUrl, startCampaign, setUploaded}}>
        <FormWrapper>
            <FormMain>
               { loading == true ? 
                    address == "" ?
                        <Spinner>
                            <TailSpin />
                        </Spinner>
                        : <Address> 
                            <h1>Campaign Started SuccessFully</h1> <h1>{address}</h1>
                            <Link passHref href={'/'}><Button>Go To Campaign</Button></Link>
                          </Address>
                :
                    <FormInputsWrapper>
                        <FormLeftWrapper />
                        <FormRightWrapper />
                    </FormInputsWrapper>
               }
            </FormMain>
        </FormWrapper>
    </FormState.Provider>
  )
}

const FormWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content:center;
`

const FormMain = styled.div`
    width:80%;
`

const FormInputsWrapper = styled.div`
    display:flex;
    justify-content:space-between ;
    margin-top:45px ;
`

const Spinner = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    justify-content:center ;
    align-items:center ;
`
const Address = styled.div`
    width:100%;
    height:80vh;
    display:flex ;
    display:flex ;
    flex-direction:column;
    align-items:center ;
    background-color:${(props) => props.theme.bgSubDiv} ;
    border-radius:8px;
`

const Button = styled.button`
    display: flex;
  justify-content:center;
  width:30% ;
  padding:15px ;
  color:white ;
  background-color:#00b712 ;
  background-image:
      linear-gradient(180deg, #00b712 0%, #5aff15 80%) ;
  border:none;
  margin-top:30px ;
  cursor: pointer;
  font-weight:bold ;
  font-size:large ;
`

