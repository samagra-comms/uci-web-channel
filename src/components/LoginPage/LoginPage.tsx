import styles from "./login.module.css";
import {
  NumberInput,
  NumberInputField,
  Button,
  Link,
  Container,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Router, useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useColorModeValue } from "@chakra-ui/react";
import Login from "../../assets/images/login.png";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const textColor = useColorModeValue("#636363", "#fff");
  // Setting the input value
  const handleNumber: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };

  const handleOTPPage: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (input.length !== 10) {
      alert("Enter a 10 digit number");
    } else {
      fetch(
        // `${process.env.NEXT_PUBLIC_OTP_BASE_URL}uci/sendOTP?phone=${input}`,
        `https://user-service.chakshu-rd.samagra.io/uci/sendOTP?phone=${input}`,
        { method: "GET" }
      ).then((response) => {
        if (response.status === 200) {
          router.push({ pathname: "/otp", query: { state: input } });
        } else {
          alert("OTP not sent");
        }
      });
    }
  };
  const backgroundColorToggle = useColorModeValue(
    styles.lightContainer,
    styles.darkContainer
  );
  const buttonToggle = useColorModeValue("darkGreen", "#080664");
  return (
    <div className={`${styles.main} ${backgroundColorToggle}`}>
      <Container
        className={styles.container}
        style={{ maxWidth: "340px", background: "white" }}
      >
        <div style={{ padding: "40px 18px" }}>
          <Image className={styles.loginImage} src={Login} alt="" />
          <Box
            fontWeight="700"
            fontSize="24px"
            marginBottom="7px"
            textAlign={"center"}
            color="#000"
          >
            Login Account <FontAwesomeIcon icon={faUser} />
          </Box>
          <Box
            fontWeight="400"
            fontSize="13px"
            color="#000"
            textAlign={"center"}
          >
            Hello , welcome back to our account !
          </Box>
          <NumberInput style={{ margin: "40px 0px 0px 0px" }}>
            <NumberInputField
              height="45px"
              padding="18px 16px"              
              filter="drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))"
              borderRadius="0px"
              fontWeight="400"
              fontSize="14px"
              color="#6f6f6f"
              placeholder="Enter your phone number"
              value={input}
              onChange={handleNumber}
            />
          </NumberInput>
          <Button
            className={styles.submitButton}
            background={buttonToggle}
            style={{
              marginTop: "43px",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "0px",
            }}
            onClick={handleOTPPage}
          >
            Send OTP
          </Button>
          <div className={styles.signup}>
            <div>-------------&nbsp;&nbsp;</div>
            <div>Or sign up with</div>
            <div>&nbsp;&nbsp;-------------</div>
          </div>
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
    </div>
  );
};

export default LoginPage;
