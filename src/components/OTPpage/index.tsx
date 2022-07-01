import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  HStack,
  PinInputField,
  PinInput,
  Button,
  Link,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "./OTP.module.css";
import image1 from "../../../public/empty_otp.png";
import image2 from "../../../public/otp_done.png";
import image3 from "../../../public/wrong_otp.png";

const OTPpage = () => {
  const router = useRouter();
  const [correctOTP, setCorrectOTP] = useState("");
  // const [inputOTP, setInputOTP] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [image, setImage] = useState(image1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cookies, setCookie] = useCookies(["access_token"]);

  let correct_otp = "";
  let phone_number = "";
  useEffect(() => {
    correct_otp = localStorage.getItem("otp") || "";
    phone_number = localStorage.getItem("number") || "";

    if (phone_number === "") {
      console.log("phone number is wrong");
    } else {
      setPhoneNumber(phone_number);
    }
    if (correct_otp === "") {
      console.log("OTP isn't recieved");
    } else {
      setCorrectOTP(correct_otp);
    }
  }, []);

  /* 
  const actualOTPSubmit = (event) => {
    fetch(`${process.env.REACT_APP_OTP_BASE_URL}/uci/loginOrRegister?phone=${location.state}&otp=${otp}`,
        {
            method: 'get',
        }).then(reponse => response.json())
        .then(data => {
          if (data.resp.params.status === "Success") {
                        let expires = new Date()
            expires.setTime(expires.getTime() + (responseJson.resp.result.data.user.tokenExpirationInstant * 1000))
            setCookie('access_token', responseJson.resp.result.data.user.token, { path: '/',  expires})
            router.push("/bot",{state: true})
          } else {
            alert("Incorrect OTP");
          } 
        })
  }  
*/

  const handleOTPSubmit = (event: any) => {
    event.preventDefault();
    const inputOTP = input1 + input2 + input3 + input4;
    if (inputOTP.length === 4) {
      fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp: `${inputOTP}`,
          right_otp: `${correctOTP}`,
          number: `${phoneNumber}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.token)
          // console.log(data.number)
          if (data.status === "success") {
            localStorage.setItem("jwtToken", data.token);
            // localStorage.setItem('user',data.number);
            console.log("You are now logged in");
            router.push("/");
          } else {
            console.log("Wrong OTP entered");
          }
        });
    }
  };

  const handleOTP1 = (e: any) => {
    setInput1(e.target.value);
    setImage(image1);
  };
  const handleOTP2 = (e: any) => {
    setInput2(e.target.value);
    setImage(image1);
  };
  const handleOTP3 = (e: any) => {
    setInput3(e.target.value);
    setImage(image1);
  };
  const handleOTP4 = (e: any) => {
    setInput4(e.target.value);
    setImage(image2);
  };
  // const changeOTP = (event: any) => {
  //   setInputOTP(event.target.value);
  // };

  return (
    <div
      className={styles.container}
      style={{ maxWidth: "390px"}}
    >
      <div style={{ padding: "1px", textAlign: "center" , background: `url("${image}")` }}>
        <div className={styles.otpVerify}>OTP Verification</div>
        <div className={styles.otpSent}>
          We will send you a one time password on this <b>Mobile Number</b>
        </div>
        <div style={{ marginTop: "10px" }}>
          <b>+91-{router.query.state}</b>
        </div>
        <HStack style={{ marginTop: "34px", justifyContent: "center" }}>
          <PinInput otp placeholder="">
            <PinInputField
              className={styles.pinInputField}
              value={input1}
              onChange={handleOTP1}
            />
            <PinInputField
              className={styles.pinInputField}
              value={input2}
              onChange={handleOTP2}
            />
            <PinInputField
              className={styles.pinInputField}
              value={input3}
              onChange={handleOTP3}
            />
            <PinInputField
              className={styles.pinInputField}
              value={input4}
              onChange={handleOTP4}
            />
          </PinInput>
        </HStack>
        {/* <div className="timer">
          {timerValue < 10 ? (
            <div>00:0{timerValue}</div>
          ) : (
            <div>00:{timerValue}</div>
          )}
        </div> */}
        {/* {resend ? (
          <div className="resend">
            Do not send OTP?{" "}
            <b>
              <Link
                style={{
                  color: "#080664",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={handleSendAgain}
              >
                Resend OTP
              </Link>
            </b>
          </div>
        ) : (
          <div className="resend" style={{ opacity: "0.3" }}>
            Do not send OTP?{" "}
            <b>
              <Link style={{ color: "#080664", textDecoration: "none" }}>
                Resend OTP
              </Link>
            </b>
          </div>
        )} */}

        <Button
          className={styles.submitButton}
          style={{ marginTop: "43px" }}
          onClick={handleOTPSubmit}
        >
          Submit
        </Button>
      </div>
      <div className={styles.login}>
        You have an account?{" "}
        <b>
          <Link
            style={{
              color: "#FFFFFF",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Login
          </Link>
        </b>
      </div>
    </div>

    // <Box
    //   width="100%"
    //   height="100vh"
    //   backgroundColor="black"
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    // >
    //   <Box p="5rem" color="white" backgroundColor="#202C33">
    //     <form
    //       onSubmit={handleOTPSubmit}
    //       style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    //     >
    //       <Box display="flex" gap="2rem">
    //         <label>OTP</label>
    //         <input
    //           type="text"
    //           value={inputOTP}
    //           onChange={changeOTP}
    //           name="otp"
    //           style={{ color: "black" }}
    //         ></input>
    //       </Box>
    //       <Box>
    //         <button type="submit">Submit</button>
    //       </Box>
    //     </form>
    //   </Box>
    // </Box>
  );
};

export default OTPpage;
