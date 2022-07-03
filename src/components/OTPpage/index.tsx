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
import Image from "next/image";
import image1 from "../../../public/empty_otp.png";
import image2 from "../../../public/otp_done.png";
import image3 from "../../../public/wrong_otp.png";

const OTPpage: React.FC = () => {
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
    
  }  
*/

  const handleOTPSubmit = (event: any) => {
    event.preventDefault();
    const inputOTP = input1 + input2 + input3 + input4;
    if (inputOTP.length === 4) {
      fetch(
        `${process.env.NEXT_PUBLIC_OTP_BASE_URL}uci/loginOrRegister?phone=${router.query.state}&otp=${inputOTP}`,
        {
          method: "get",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.resp.params.status === "Success") {
            let expires = new Date();
              expires.setTime(
                expires.getTime() +
                  data.resp.result.data.user.tokenExpirationInstant * 1000
              );
              setCookie("access_token", data.resp.result.data.user.token, {
                path: "/",
                expires,
              });
              router.push({ pathname: "/", query: { state: true } });
          } else {
            alert("Incorrect OTP");
          }
        })
        .catch((err) => console.log(err));
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
    <Box
      display="flex"
      flexWrap="wrap"
      alignContent="center"
      justifyContent="center"
    >
      <Box
        width="30%"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        boxShadow="0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);"
      >
        <Box
          className="hi"
          borderWidth="2px"
          height="200px"
          width="100%"
          flex="2"
          backgroundImage={`"${image.src}"`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        >
          {/* <Image src="/empty_otp.png" objectFit="cover" width="100%" height="100px" /> */}
        </Box>
        <Box
          padding={1}
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignContent="center"
          justifyContent="center"
        >
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
          <Box width="100%">
            {" "}
            <Button
              className={styles.submitButton}
              background="#080664"
              style={{ marginTop: "43px" }}
              onClick={handleOTPSubmit}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box alignSelf="">
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
        </Box>
      </Box>
    </Box>
  );
};

export default OTPpage;
