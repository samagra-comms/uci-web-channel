import styles from "./profile.module.css";
import avatar from "../../../public/avatar.jpg";
import { Box,Text } from "@chakra-ui/react";
import Image from "next/image";
import { useColorModeValue } from "@chakra-ui/react";

const Profile = (props: any) => {
    const box_color = useColorModeValue("#38FF81","#111B21");
    const back_color = useColorModeValue("#07A340","#0B1216");
    const headingColor = useColorModeValue("#000000","#979DA1");
    const paraColor = useColorModeValue("#000000","#FFFFFF");

  const clickHandler = () => {
    props.removeProfile(false);
  };

  return (
    <>
    <div onClick={clickHandler} className={styles.backdrop} />
    <div className={styles.body}>
      <Box bgColor={back_color} className={styles.profile}>
        <Box bgColor={box_color} className={styles.img__box}>
          <Image
            src={avatar}
            className={styles.avatar}
            height="160px"
            width="160px"
            alt="This is a avatar"
          />
          <Text fontSize="lg" fontWeight="bold">Chakshu Gautam</Text>
          <Text fontSize="sm">+91 1234567890</Text>
        </Box>
        <Box bgColor={box_color} className={styles.about__section}>
          <Text color={headingColor} fontWeight="bold" fontSize="lg">About</Text>
          <Text color={paraColor} fontSize="sm">Hi! I am using UCI :)</Text>
        </Box>
      </Box>
    </div>
    </>
  );
};

export default Profile;
