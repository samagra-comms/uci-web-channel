import "styles/global.css";
import {Button, Link, PinInput, PinInputField, HStack } from '@chakra-ui/react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useState } from "react";
import {useCookies} from 'react-cookie'; 

function OTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');
  const [input3,setInput3] = useState('');
  const [input4,setInput4] = useState('');
  const [cookies, setCookie] = useCookies(['access_token']);

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

  const handleSubmit = async () => {
    const otp = input1+input2+input3+input4;
    if(otp.length===4){
      let res = await fetch(
        `${process.env.REACT_APP_OTP_BASE_URL}/uci/loginOrRegister?phone=${location.state}&otp=${otp}`,
        {
            method: 'get',
        }
        );
        let responseJson = await res.json();
        console.log(responseJson)
        if (responseJson.resp.params.status === 'Success') { 
            navigate('/bot',{state: true})
            let expires = new Date()
            expires.setTime(expires.getTime() + (responseJson.resp.result.data.user.tokenExpirationInstant * 1000))
            setCookie('access_token', responseJson.resp.result.data.user.token, { path: '/',  expires})
        }else{      
            alert('incorrect otp')
            console.error('OTP incorrect')
        }
    }
    else{
      alert('Invalid OTP')
      window.location.reload();
    }
  }

  const handleSendAgain = async () => {
    let res = await fetch(
      `${process.env.REACT_APP_OTP_BASE_URL}/uci/sendOTP?phone=${location.state}`,
      {
          method: 'get',
      }
      );
      if (res.status !== 200) {   
          console.error('OTP not sent')
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
                <Link style={{color: "#E9890A", cursor: "pointer"}} onClick={handleSendAgain}>Send OTP</Link>
            </div>
            <Button className="loginButton" style={{width: "100%"}} onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
  )
}

export default OTP