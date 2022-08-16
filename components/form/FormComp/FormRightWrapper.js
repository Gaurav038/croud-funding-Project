import {useState, useContext } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FormState } from '../Form';


const FormRightWrapper = () => {

    const Handler = useContext(FormState)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const uploadFiles = async(e) => {
      e.preventDefault()
      setUploadLoading(true)
      let formData;

      if(Handler.form.story !== ''){
        try {
          var data = JSON.stringify({
            "pinataOptions": {
              "cidVersion": 1
            },
            "pinataMetadata": {
              "name": "StoryURLS",
              "keyvalues": {
                "customKey": "customValue",
                "customKey2": "customValue2"
              }
            },
            "pinataContent": Handler.form.story
          });
          const config = {
                    method: "POST",
                    headers: {
                      'Content-Type': 'application/json', 
                      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
                      pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
                    },
                    body: data,
          };
          const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", config);
          const result = await response.json();
          Handler.setStoryUrl(result.IpfsHash)
        } catch (error) {
          toast.warn('Error Uploading Story')
        }
      }

      if(Handler.image !== ''){
        try {
          formData = new FormData();
          formData.append("file", Handler.image);
          const config = {
                    method: "POST",
                    maxContentLength: Infinity,
                    headers: {
                      pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
                      pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
                    },
            body: formData,
          };
          const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", config);
          const data = await response.json();
          Handler.setImageUrl(data.IpfsHash)
        } catch (error) {
          toast.warn('Error Uploading Image')
        }
      }

      setUploadLoading(false)
      setUploaded(true)
      Handler.setUploaded(true)
      toast.success("Files Uploaded SuccessFully")
    }
  
  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount in Ether</label>
            <Input onChange={Handler.FormHandler} value={Handler.form.requiredAmount } name="requiredAmount" type={'number'} placeholder='Required Amount'></Input>
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select onChange={Handler.FormHandler} value={Handler.form.category } name="category">
              <option>Education</option>
              <option>Health</option>
              <option>Bussiness</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      <FormInput>
        <label>Select Image</label>
        <Image onChange={Handler.ImageHandler} alt="dapp" type={'file'} accept='image/*'>
        </Image>
      </FormInput>
       {uploadLoading == true ?  <Button><TailSpin color='#fff' height={20} /></Button> : 
         uploaded == false ? 
          <Button onClick={uploadFiles}>
            Upload Files to IPFS
          </Button>  
          : <Button style={{cursor: "no-drop"}}>Files uploaded Sucessfully</Button>
        }    
      <Button onClick={Handler.startCampaign}>
        Start Campaign
      </Button>

    </FormRight>
  )
}

const FormRight = styled.div`
  width:45%;
`

const FormInput = styled.div`
  display:flex ;
  flex-direction:column;
  font-family:'poppins';
  margin-top:10px ;
`

const FormRow = styled.div`
  display: flex;
  justify-content:space-between;
  width:100% ;
`

const Input = styled.input`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
` 

const RowFirstInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const RowSecondInput = styled.div`
  display:flex ;
  flex-direction:column ;
  width:45% ;
`

const Select = styled.select`
  padding:15px;
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;
`

const Image = styled.input`
  background-color:${(props) => props.theme.bgDiv} ;
  color:${(props) => props.theme.color} ;
  margin-top:4px;
  border:none ;
  border-radius:8px ;
  outline:none;
  font-size:large;
  width:100% ;

  &::-webkit-file-upload-button {
    padding: 15px ;
    background-color: ${(props) => props.theme.bgSubDiv} ;
    color: ${(props) => props.theme.color} ;
    outline:none ;
    border:none ;
    font-weight:bold ;
  }  
`

const Button = styled.button`
  display: flex;
  justify-content:center;
  width:100% ;
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

export default FormRightWrapper