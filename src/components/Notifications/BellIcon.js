import * as fire from "../../firebase";
import {Button, Row, Col, Toast} from 'react-bootstrap';
import React, {useState} from "react";

function BellIcon() {
     // ------------- Firebase setup Tutorial ----------------
  // const [show, setShow] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});


  fire.onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    // console.log(payload);
  }).catch(err => console.log('failed: ', err));
  // ------------------------------------------
    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
            position: 'absolute',
            top: 20,
            right: 20,
            minWidth: 200
          }}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{notification.title}</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>{notification.body}</Toast.Body>
          </Toast>
    )
}

export default BellIcon;