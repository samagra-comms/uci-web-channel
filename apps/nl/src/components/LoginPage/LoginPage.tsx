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
import Login from "../../assets/images/krushak_odisha.png";
import GovtOfOdisha from "../../assets/images/logo.png";
import KrishiMela from "../../assets/images/KrishiMela.png";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState("");

  // const textColor = useColorModeValue("var(--grey)", "white");
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
  const buttonToggle = useColorModeValue("darkGreen", 'var(--darkblue)');
  return (
    <div className={`${styles.main} ${backgroundColorToggle}`}>
      <Container
        className={styles.container}
        style={{ maxWidth: "340px", background: "white" }}
      >
        <div style={{ padding: "40px 10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "40px",
              marginTop: "-20px"
            }}
          >
            <Image
              className={styles.loginImage}
              src={GovtOfOdisha}
              alt=""
              width={70}
              height={70}
            />
            <Image
              className={styles.loginImage}
              src={KrishiMela}
              alt=""
              width={70}
              height={70}
            />
          </div>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <Image
              className={styles.loginImage}
              src={Login}
              alt=""
              width={140}
              height={180}
            />
          </div>

          <Box
            fontWeight="700"
            fontSize="20px"
            marginBottom="20px"
            textAlign={"center"}
            color="darkgreen"
          >
            KONNECT Ama KrushAI Chat Bot
          </Box>
          <Box
            fontWeight="700"
            fontSize="24px"
            marginBottom="7px"
            textAlign={"center"}
            color="black"
          >
            Login Account <FontAwesomeIcon icon={faUser} />
          </Box>
          <Box
            fontWeight="400"
            fontSize="13px"
            color="black"
            textAlign={"center"}
          >
            Hello, welcome back to our account !
          </Box>
          <NumberInput style={{ margin: "40px 0px 0px 0px", border: '1px solid grey' }}>
            <NumberInputField
              height="45px"
              padding="18px 16px"
              filter="drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12))"
              borderRadius="0px"
              fontWeight="400"
              fontSize="14px"
              color='var(--grey)'
              placeholder="Enter your phone number"
              value={input}
              onChange={handleNumber}
            />
          </NumberInput>
          <button
            className={styles.submitButton}
            style={{
              marginTop: "40px",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "0px",
              backgroundColor: `${buttonToggle}`
            }}
            onClick={handleOTPPage}
          >
            Send OTP
          </button>
          {/* <div className={styles.signup}>
            <div>-------------&nbsp;&nbsp;</div>
            <div>Or sign up with</div>
            <div>&nbsp;&nbsp;-------------</div>
          </div> */}
          {/* <div className={styles.createAccount} style={{ marginTop: "50px" }}>
            Not register yet?{" "}
            <b>
              <Link style={{ textDecoration: "none", color: "black" }}>
                Create Account
              </Link>
            </b>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
