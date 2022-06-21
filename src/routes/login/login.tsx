import "styles/global.css";
import "./login.css";
import {NumberInput, NumberInputField, Button, Link} from '@chakra-ui/react';
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {ReactComponent as AccountIcon} from './../../assets/images/userAccount.svg';
import {ReactComponent as Line} from './../../assets/images/line.svg';


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
    <div  className='container' style={{maxWidth: "390px"}}>
        <div style={{padding: "55px 18px"}}>
            <div className="loginAccount">Login Account<AccountIcon style={{margin: "0px 0px 5px 5px"}}/></div>
            <div className="helloAccount">Hello , welcome back to our account !</div>
            <NumberInput style={{margin: "146px 0px 30px 0px"}}>
                <NumberInputField className="numberInputField" placeholder="Enter your phone number" value={input}
                onChange={handleNumber}/>
            </NumberInput>
            <Button className="loginButton" onClick={handleOTPPage}>Send OTP</Button>
            <div className="signup">
                <Line />{" "}Or sign up with{" "}<Line />
            </div>
            <div className="createAccount" style={{marginTop: "50px"}}>
                Not register yet? <b><Link style={{textDecoration: "none", color: "black"}}>Create Account</Link></b>
            </div>
        </div>
    </div>
  )
}

export default Login