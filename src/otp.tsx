import "styles/global.css";
import {Button, Link, PinInput, PinInputField, HStack } from '@chakra-ui/react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useState } from "react";

function OTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');
  const [input3,setInput3] = useState('');
  const [input4,setInput4] = useState('');

  const handleOTP1 = (e: any) => {
    setInput1(e.target.value)
  }
  const handleOTP2 = (e: any) => {
    setInput2(e.target.value)

  }
  const handleOTP3 = (e: any) => {
    setInput3(e.target.value)

  }
  const handleOTP4 = (e: any) => {
    setInput4(e.target.value)

  }

  const handleSubmit = () => {
    const otp = input1+input2+input3+input4;
    if(otp.length===4){
      navigate('/bot')
    }
    else{
      alert('Invalid OTP')
      window.location.reload();
    }
  }

  return (
    <div  className='container' style={{maxWidth: "400px"}}>
        <div style={{padding: "50px", textAlign: "center"}}>
            <h2 style={{marginBottom: "5px"}}>OTP Verification</h2>
            <p>We have sent you a one time password on your <b>Mobile Number</b></p>
            <div>
              <b>+91-{location.state}</b>
            </div>
            <HStack style={{margin: "50px 0px 20px 0px", justifyContent: "center"}}>
            <PinInput otp>
                <PinInputField className="numberInputField" style={{width: "50px"}} value={input1} onChange={handleOTP1}/>
                <PinInputField className="numberInputField" style={{width: "50px"}} value={input2} onChange={handleOTP2}/>
                <PinInputField className="numberInputField" style={{width: "50px"}} value={input3} onChange={handleOTP3}/>
                <PinInputField className="numberInputField" style={{width: "50px"}} value={input4} onChange={handleOTP4}/>
            </PinInput>
            </HStack>
            <div style={{  textAlign: "center", margin: "50px 0px 20px 0px"}}>
                Do not send OTP? {" "}
                <Link style={{color: "#E9890A"}}>Send OTP</Link>
            </div>
            <Button className="loginButton" style={{width: "100%"}} onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
  )
}

export default OTP