import React from "react";
import ReactDom from "react-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import styles from "./index.module.css";


interface ModalProps {
  onSubmitForm: (e: React.FormEvent) => void
  onHideModal: (e: React.MouseEvent) => void
}

const Modal: React.FC<ModalProps> = ({onSubmitForm, onHideModal}) => {

  const modalContainerToggle = useColorModeValue(
    styles.lightModalContainer,
    styles.darkModalContainer
  );

  const cancelButtonToggle = useColorModeValue(
    styles.lightCancelButton,
    styles.darkCancelButton
  );

  const inputToggle = useColorModeValue(
    styles.lightInputBox,
    styles.darkInputBox
  )

  return ReactDom.createPortal(
    <React.Fragment>
      {/* Background Div */}
      <Box className={styles.backdrop}></Box>

      {/* Modal */}
      <Box className={`${styles.modalContainer} ${modalContainerToggle}`}>
        <h1>Add Contact</h1>
        <form onSubmit={onSubmitForm}>
          <label>Name: </label>
          <input className={inputToggle} type="text" name="Name" required></input>
          <label>Phone Number: </label>
          <input className={inputToggle} type="text" name="phoneNumber"></input>
          <Box className={styles.modalActionContainer}>
            <button className={`${cancelButtonToggle}`} onClick={onHideModal} type="button">Cancel</button>
            <button className={`${styles.submitButton}`} type="submit">Submit</button>
          </Box>
        </form>
      </Box>
    </React.Fragment>,
    document.getElementById("modal_portal") as HTMLDivElement
  );
};

export default Modal;
