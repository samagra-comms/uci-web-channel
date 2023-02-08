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
import React, { useState, useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "./OTP.module.css";
import Image from "next/image";
import image1 from "../../../public/empty_otp.png";
import image2 from "../../../public/otp_done.png";
import image3 from "../../../public/wrong_otp.png";

const OTPpage: React.FC = () => {
  const router: NextRouter = useRouter();
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [image, setImage] = useState(image1);
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);


  const handleOTPSubmit: React.FormEventHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputOTP: string = input1 + input2 + input3 + input4;
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
              removeCookie("access_token")
              setCookie("access_token", data.resp.result.data.user.token, {
                path: "/",
                expires,
              });
              router.push("/");
          } else {
            alert("Incorrect OTP");
            setImage(image3)
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOTP1: React.ChangeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput1(e.target.value);
    setImage(image1);
  };
  const handleOTP2: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput2(e.target.value);
    setImage(image1);
  };
  const handleOTP3: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput3(e.target.value);
    setImage(image1);
  };
  const handleOTP4: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput4(e.target.value);
    setImage(image2);
  };

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
