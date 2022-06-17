import "styles/global.css";
import {NumberInput, NumberInputField, Button, Link} from '@chakra-ui/react';
import { useState } from "react";
import {useNavigate} from "react-router-dom";


function Login() {
    const [input, setInput] = useState('')
    let navigate = useNavigate();

    const handleNumber = (e: any) => {
        setInput(e.target.value);
    }

    const handleOTPPage = async () => {
        if(input.length!==10){
            alert('enter 10 digit number')
        }
        else{
            let res = await fetch(
                `${process.env.REACT_APP_OTP_BASE_URL}/uci/sendOTP?phone=${input}`,
                {
                    method: 'get',
                }
                );
                if (res.status === 200) {
                    navigate('/otp',{state: input})
                }else{      
                    console.error('OTP not sent')
                }
        }
    }

  return (
    <div  className='container' style={{maxWidth: "400px"}}>
        <div style={{padding: "50px", textAlign: "center"}}>
            <h2 style={{marginBottom: "5px"}}>Login Account</h2>
            <p>Hello , welcome back to our account !</p>
            <NumberInput style={{margin: "50px 0px 20px 0px"}}>
                <NumberInputField className="numberInputField" placeholder="Enter your phone number" value={input}
                onChange={handleNumber}/>
            </NumberInput>
            <Button className="loginButton" style={{width: "100%"}} onClick={handleOTPPage}>Send OTP</Button>
            <div style={{  textAlign: "center"}}>
                or signup with
                <div style={{marginTop: "50px"}}>
                    Not register yet? <b><Link>Create Account</Link></b>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login