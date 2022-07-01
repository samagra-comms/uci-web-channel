import styles from "./login.module.css";
import {
  NumberInput,
  NumberInputField,
  Button,
  Link,
  Container,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  // Setting the input value
  const handleNumber = (e: any) => {
    setInput(e.target.value);
  };

  /* 
   const realHandleOTPPage = () => {
    else {
      fetch(`${process.env.REACT_APP_OTP_BASE_URL}/uci/sendOTP?phone=${input}`.
      { method: "GET"})
      .then(response => {
        if (response.status === 200) {
          router.push("/otp",{state: input})
        } else {
          alert("OTP not sent")
        }
      })
    }
   }
   */
  const handleOTPPage = () => {
    if (input.length !== 10) {
      alert("Enter a 10 digit number");
    } else {
        fetch(`${process.env.REACT_APP_OTP_BASE_URL}/uci/sendOTP?phone=${input}`,
        { method: "GET"})
        .then(response => {
          if (response.status === 200) {
            router.push({pathname:"/otp",query:{state: input}})
          } else {
            alert("OTP not sent")
          }
        })
      }
      // console.log(`Phone number is ${input}`);
      // console.log("Sending OTP...");
      // let temp_otp = "";
      // for (let i = 0; i < 4; i++) {
      //   temp_otp = temp_otp + Math.floor(Math.random()*10).toString();
      // }
      // localStorage.setItem("otp", temp_otp);
      // localStorage.setItem("number",input);
      // console.log(`otp is ${temp_otp}`);
      // router.push("/otp");
    }

  return (
    <Container className={styles.container} style={{ maxWidth: "390px" }}>
      <div style={{ padding: "55px 18px" }}>
        <Box fontWeight="700" fontSize="20px" marginBottom="7px">
          Login Account
        </Box>
        <Box fontWeight="400" fontSize="13px" color="#636363">
          Hello , welcome back to our account !
        </Box>
        <NumberInput style={{ margin: "146px 0px 30px 0px" }}>
          <NumberInputField
            height="55px"
            padding="18px 16px"
            border="3px solid #818181"
            filter="drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))"
            borderRadius="12px"
            fontWeight="400"
            fontSize="14px"
            color="#6f6f6f"
            placeholder="Enter your phone number"
            value={input}
            onChange={handleNumber}
          />
        </NumberInput>
        <Button
          width="100%"
          background="#080664"
          borderRadius="12px"
          height="55px"
          marginBottom="27px"
          color="#fff"
          fontWeight="600"
          fontSize="18px"
          onClick={handleOTPPage}
        >
          Send OTP
        </Button>
        <div className={styles.signup}>Or sign up with</div>
        <div className={styles.createAccount} style={{ marginTop: "50px" }}>
          Not register yet?{" "}
          <b>
            <Link style={{ textDecoration: "none", color: "black" }}>
              Create Account
            </Link>
          </b>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;
