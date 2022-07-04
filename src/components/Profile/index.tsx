import styles from "./profile.module.css";
import avatar from "../../../public/avatar.jpg";
import { Box,Text } from "@chakra-ui/react";
import Image from "next/image";
import { useColorModeValue } from "@chakra-ui/react";

interface profileProps {
  removeProfile: (a:boolean) => void,
  name: string,
  number: string,
  bio: string
}

const Profile: React.FC<profileProps> = (props) => {
    const box_color = useColorModeValue("#38FF81","#111B21");
    const back_color = useColorModeValue("#07A340","#0B1216");
    const headingColor = useColorModeValue("#000000","#979DA1");
    const paraColor = useColorModeValue("#000000","#FFFFFF");

  const clickHandler: React.MouseEventHandler = (event: React.MouseEvent) => {
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
          <Text className={styles.profile__title} fontSize="lg" fontWeight="bold">{props.name}</Text>
          <Text fontSize="sm">{props.number}</Text>
        </Box>
        <Box bgColor={box_color} className={styles.about__section}>
          <Text color={headingColor} fontWeight="bold" fontSize="lg">About</Text>
          <Text color={paraColor} fontSize="sm">{props.bio}</Text>
        </Box>
      </Box>
    </div>
    </>
  );
};

export default Profile;
