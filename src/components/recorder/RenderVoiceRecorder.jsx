import { useContext, useState, useEffect } from "react";

// import { Grid, CircularProgress, Backdrop } from '@material-ui/core';

import stop from "./stop2.gif";
import processing from "./process.gif";
import error from "./error.gif";
import start from "./start2.svg";
import styles from "./styles.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  logToAndroid,
  triggerEventInAndroid,
} from "../../utils/android-events";
import FullScreenLoader from "../FullScreenLoader";
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
const RenderVoiceRecorder = ({ setInputMsg }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [apiCallStatus, setApiCallStatus] = useState("idle");
  const userId = uuidv4();
  const conversationId = uuidv4();
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("chuChu:",{stream ,navigator})
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("hola event.data", event.data);
          makeComputeAPICall(event.data);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error(error);
      setApiCallStatus("error");
      toast.error(`Something went wrong in recording audio`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  //   const makeComputeAPICall = async (blob) => {
  //     try {
  //       setApiCallStatus('processing');
  //       console.log('base', blob);
  //       toast.success(`प्रतीक्षा करें ...`);

  //       const apiEndpoint = process.env.NEXT_PUBLIC_BASE_URL;

  //       const formData = new FormData();
  //       formData.append('file', blob, 'audio.wav');
  //       let base64 = await fetch(apiEndpoint + '/aitools/base64', {
  //         method: 'POST',
  //         body: formData,
  //       });
  //  // @ts-ignore
  //       base64 = await base64.text();
  //       const resp = await axios.post(
  //         apiEndpoint + '/prompt',
  //         {
  //           text: '',
  //           media: {
  //             category: 'base64audio',
  //             text: base64,
  //           },
  //           inputLanguage: context?.locale || 'en'
  //         },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'user-id': localStorage.getItem('userID'),
  //             'Conversation-id': context?.newConversationId
  //           },
  //         }
  //       );
  //       console.log(resp);
  //       if (resp.status === 201) {
  //         if (resp.data.text === '')
  //           throw new Error('Unexpected end of JSON input');
  //         setInputMsg(resp.data.text);
  //       } else {
  //         toast.error(`Something went wrong`);
  //         console.log(resp);
  //       }
  //       setApiCallStatus('idle');
  //     } catch (error) {
  //       console.error(error);
  //       setApiCallStatus('error');
  //       toast.error(`Something went wrong :${error.message}`);
  //     }
  //   };

  // const makeComputeAPICall = async (blob) => {
  //   try {
  //     setApiCallStatus('processing');
  //     toast.success(`प्रतीक्षा करें ...`);
  //    // const apiEndpoint = localStorage.getItem('promptUrl') || process.env.REACT_APP_BASE_URL;
  //      const apiEndpoint ='https://api.staging.nl.samagra.io/api/bashini'
  //     const formData = new FormData();
  //     formData.append('file', blob, 'audio.wav');
  //     let base64 = await fetch(apiEndpoint + '/aitools/base64', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //   //  @ts-ignore
  //    base64 = await base64.text();
  //     const resp = await axios.post(
  //       apiEndpoint + '/prompt',
  //       {
  //         text: '',
  //         media: {
  //           category: 'base64audio',
  //           text: base64,
  //         },
  //         inputLanguage: 'hi'
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'user-id': userId,
  //           'Conversation-Id': conversationId
  //         },
  //       }
  //     );

  //     if (resp.status === 201) {
  //       if (resp.data.text === '')
  //         throw new Error('Unexpected end of JSON input');
  //       setInputMsg(resp.data.text);
  //     } else {
  //       toast.error(`error`);
  //     }
  //     setApiCallStatus('idle');
  //   } catch (error) {
  //     console.error(error);
  //     setApiCallStatus('error');
  //     toast.error(`error`);
  //   }
  // };

  const makeComputeAPICall = async (blob) => {
    setApiCallStatus('processing');
    toast.success(`प्रतीक्षा करें ...`);
    let data = new FormData();
    data.append("file", blob, "audio.wav");
    data.append("disablePostProcessor", "true");

    const apiEndpoint = localStorage.getItem('promptUrl') || process.env.REACT_APP_BASE_URL;
    const authToken = localStorage.getItem('promptToken');
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiEndpoint}/aitools/asr?language=hi`,
      headers: {
        // Authorization:
        //   "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5LcFg1MF9zNlVPNUlTZm8xdDlveVZ0TVNHSSJ9.eyJhdWQiOiI3NDQ4YmQ5Mi1iMDU1LTQ3N2YtYjczNS1lODVjMTQ1MDI2YTciLCJleHAiOjE3MTQwNDQwNDUsImlhdCI6MTcwNjE1NDA0NSwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIwYzM0YmJiYi01OTE4LTQ4MDktYjczNi0wOWU1ODViNjlhNjEiLCJqdGkiOiIxMWJjNGIzNy0wMDU0LTQyYzItYjhmZS0wNmFkODU1ZDEwMGMiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsInByZWZlcnJlZF91c2VybmFtZSI6Ijk1NTAzNjAyNzciLCJhcHBsaWNhdGlvbklkIjoiNzQ0OGJkOTItYjA1NS00NzdmLWI3MzUtZTg1YzE0NTAyNmE3Iiwicm9sZXMiOltdLCJhdXRoX3RpbWUiOjE3MDYxNTQwNDUsInRpZCI6IjgzZDZmYmY4LTY5NGMtNThmZC1mNjdlLWEyZWIyMzgxMTY4NCJ9.Efa37CaebxRFIlxjfPLDeZbXjqV-hvxVR8pDqKeeUPqjFXMc92HAZ3YwkbOYw0jQzRhm1YDkwda9jl4GnnHDJpkCSpa1RpazcUCPKnjai-tEc9ROe46lMVTnHHhbRRcTk7Y_VeauqL5o8rGLTig4CUqWoUbEXm2SdzfqcA9b7oaltJfWfxQGSC4s3k6xMU7sQFCmFNUkzi-xZuBcYQYybrTOZSqzW0ZORrOsonbwHSykNfiC36rbzNENdmSp3fVS9z6FS7l97iMHjWXm2TaFNtya7ik77be5eaxgJgyKWzf0GPwrmkrh0-w3eDP4Ya63kefLjBKI42MEITK0gPwP8w",
        'Authorization': `Bearer ${authToken}`,
      },
      data: data,
    };

    function replaceDandaCharacter(inputString) {
      const regex = /।/g;
      const replacedString = inputString.replace(regex, "");
      return replacedString;
    }

    axios
      .request(config)
      .then((response) => {
        setInputMsg(replaceDandaCharacter(response.data.text));
        setApiCallStatus("idle");
      })
      .catch((error) => {
        console.log(error);
        setApiCallStatus("error");
        toast.error(`Something went wrong :${error.message}`);
      });
  };

  // const makeComputeAPICall = async (blob) => {
  //   const base64 = await blobToBase64(blob);
  //   console.log("hola:", base64)
  //   const _data = {
  //     "pipelineTasks": [
  //       {
  //         "taskType": "asr",
  //         "config": {
  //           "language": {
  //             "sourceLanguage": "hi"
  //           },
  //           "serviceId": "ai4bharat/conformer-hi-gpu--t4",
  //           "audioFormat": "flac",
  //           "samplingRate": 16000
  //         }
  //       }
  //     ],
  //     "inputData": {
  //       "audio": [
  //         {
  //           "audioContent":
  //             base64
  //         }
  //       ]
  //     }
  //   }
  //   let config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline',
  //     headers: {
  //       'Accept': '*/*',
  //       'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  //       'Authorization': 'sLAFJehUCZQ72NIM4nDZNCya7TQVzittLgJEU0vIf-69rp0gFUcGu5sjwAaOSUfa',
  //       'Content-Type': 'application/json'
  //     },
  //     data: _data
  //   };

  //   axios.request(config)
  //     .then((response) => {
  //       console.log("hola", JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log("hola", error);
  //     });
  // }
  return (
    <div>
      {apiCallStatus === "processing" && <FullScreenLoader loading />}
      <div>
        {mediaRecorder && mediaRecorder.state === "recording" ? (
          <div className={styles.center}>
            <img
              src={stop}
              alt="stopIcon"
              width="30px"
              onClick={() => {
                stopRecording();
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        ) : (
          <div className={styles.center}>
            <img
              src={start}
              alt="startIcon"
              onClick={async(ev) => {
                ev.preventDefault();
                logToAndroid(`debug isPermissionGranted`);
                try {
                  const isAvailable = await window?.androidInteract?.isPermissionGranted();
                  logToAndroid(`debug isPermissionGranted return value:${isAvailable}`);
                  if(isAvailable){
                    logToAndroid(`debug isPermissionGranted available`);
                    startRecording()
                  }
                  else
                { 
                   logToAndroid(`debug isPermissionGranted false`);
                   triggerEventInAndroid("onMicClick");}
                } catch (err) {
                  logToAndroid(
                    `debug error in getting mic permission:${JSON.stringify(err)}`
                  );
                }
               // startRecording();
              }}
              // width="30px"
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={4}
            sm={12}
            md={2}
            lg={2}
            xl={2}
            className={styles.flexEndStyle}></Grid>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default RenderVoiceRecorder;
