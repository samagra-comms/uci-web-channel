import "styles/global.css";
import "./otp.css";
import {Button, Link, PinInput, PinInputField, HStack } from '@chakra-ui/react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import {useCookies} from 'react-cookie'; 
import image1 from '../../assets/images/otp.png';
import image2 from '../../assets/images/otpDone.png';
import image3 from '../../assets/images/resend.png';

function OTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const [input1,setInput1] = useState('');
  const [input2,setInput2] = useState('');
  const [input3,setInput3] = useState('');
  const [input4,setInput4] = useState('');
  const [cookies, setCookie] = useCookies(['access_token']);
  const [image, setImage] = useState(image1);
  const [timerValue, setTimerValue] = useState(30);
  const [resend, setResend] = useState(false);

  const handleOTP1 = (e: any) => {
    setInput1(e.target.value)
    setImage(image1);
  }
  const handleOTP2 = (e: any) => {
    setInput2(e.target.value)
    setImage(image1);

  }
  const handleOTP3 = (e: any) => {
    setInput3(e.target.value);
    setImage(image1);
  }
  const handleOTP4 = (e: any) => {
    setInput4(e.target.value)
    setImage(image2);

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
    setImage(image1);
    setResend(false);
    const interval = setInterval(() => {
      a = a - 1;
      setTimerValue(a);
      if(a===0){
        clearInterval(interval);
        setImage(image3);
        setResend(true);
      }
    },1000);
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

  var a = 30;
  useEffect(() => {
    const interval = setInterval(() => {
      a = a - 1;
      setTimerValue(a);
      if(a===0){
        clearInterval(interval);
        setImage(image3);
        setResend(true);
      }
    },1000);
  }, []);

  const timer = () => {
    
  }


  return (   
    <div  className='container' style={{maxWidth: "390px", background: `url(${image})` }}>
        <div style={{padding: "1px", textAlign: "center"}}>
            <div className="otpVerify">OTP Verification</div>
            <div className="otpSent">We will send you a one time password on this <b>Mobile Number</b></div>
            <div style={{marginTop: "10px"}}>
              <b>+91-{location.state}</b>
            </div>
            <HStack style={{marginTop: "34px", justifyContent: "center"}}>
            <PinInput otp placeholder="">
                <PinInputField className="pinInputField" value={input1} onChange={handleOTP1}/>
                <PinInputField className="pinInputField" value={input2} onChange={handleOTP2}/>
                <PinInputField className="pinInputField" value={input3} onChange={handleOTP3}/>
                <PinInputField className="pinInputField" value={input4} onChange={handleOTP4}/>
            </PinInput>
            </HStack>
            <div className="timer">
              {(timerValue<10) ? 
              (
                <div>00:0{timerValue}</div>
              ) : (
                <div>00:{timerValue}</div>
              )
              }              
            </div>
            {resend ? 
            (<div className="resend">
              Do not send OTP? {" "}
              <b><Link style={{color: "#080664",textDecoration: "none", cursor: "pointer"}} onClick={handleSendAgain}>Resend OTP</Link></b>
            </div>
            ) :(
              <div className="resend" style={{opacity: "0.3"}}>
                Do not send OTP? {" "}
                <b><Link style={{color: "#080664",textDecoration: "none"}}>Resend OTP</Link></b>
              </div>
            )            
            }
            
            <Button className="submitButton" style={{marginTop: "43px"}} onClick={handleSubmit}>Submit</Button>
        </div>
        <div className="login">
          You have an account? {" "}
          <b><Link style={{color: "#FFFFFF",textDecoration: "none", cursor: "pointer"}}>Login</Link></b>
        </div>
    </div>
  )
}

export default OTP