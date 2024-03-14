import { useState, useEffect } from "react";

import stop from "./stop2.gif";
import processing from "./process.gif";
import error from "./error.gif";
import start from "./start2.svg";
import styles from "./styles.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { logToAndroid, triggerEventInAndroid } from "../../utils/android-events";
const RenderVoiceRecorder = ({ setInputMsg, tapToSpeak = true }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [apiCallStatus, setApiCallStatus] = useState("idle");
  const [userClickedError, setUserClickedError] = useState(false);

  const userId =  uuidv4();
  const conversationId =  uuidv4();
  let VOICE_MIN_DECIBELS = -35;
  let DELAY_BETWEEN_DIALOGS = 2500;
  let DIALOG_MAX_LENGTH = 60 * 1000;
  let IS_RECORDING = false;

  const startRecording = async () => {
    IS_RECORDING = true;
    record();
  };

  const stopRecording = () => {
    IS_RECORDING = false;
    if (mediaRecorder !== null) {
      mediaRecorder.stop();
      setMediaRecorder(null); // Set mediaRecorder state to null after stopping
    }
  };

  //record:
  function record() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      //start recording:
      const recorder = new MediaRecorder(stream);
      recorder.start();
      setMediaRecorder(recorder);

      //save audio chunks:
      const audioChunks = [];
      recorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      //analisys:
      const audioContext = new AudioContext();
      const audioStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.minDecibels = VOICE_MIN_DECIBELS;
      audioStreamSource.connect(analyser);
      const bufferLength = analyser.frequencyBinCount;
      const domainData = new Uint8Array(bufferLength);

      //loop:
      let time = new Date();
      let startTime,
        lastDetectedTime = time.getTime();
      let anySoundDetected = false;
      const detectSound = () => {
        //recording stoped by user:
        if (!IS_RECORDING) return;

        time = new Date();
        let currentTime = time.getTime();

        //time out:
        if (currentTime > startTime + DIALOG_MAX_LENGTH) {
          recorder.stop();
          return;
        }

        //a dialog detected:
        if (
          anySoundDetected === true &&
          currentTime > lastDetectedTime + DELAY_BETWEEN_DIALOGS
        ) {
          recorder.stop();
          return;
        }

        //check for detection:
        analyser.getByteFrequencyData(domainData);
        for (let i = 0; i < bufferLength; i++)
          if (domainData[i] > 0) {
            anySoundDetected = true;
            time = new Date();
            lastDetectedTime = time.getTime();
          }

        //continue the loop:
        window.requestAnimationFrame(detectSound);
      };
      window.requestAnimationFrame(detectSound);

      //stop event:
      recorder.addEventListener("stop", () => {
        //stop all the tracks:
        stream.getTracks().forEach((track) => track.stop());
        if (!anySoundDetected) return;

        //send to server:
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        makeComputeAPICall(audioBlob);
      });
    });
  }

  const makeComputeAPICall = async (blob) => {
    try {
      setApiCallStatus('processing');
      toast.success(`प्रतीक्षा करें ...`);
      const apiEndpoint = localStorage.getItem('promptUrl') || process.env.REACT_APP_BASE_URL;

      const formData = new FormData();
      formData.append('file', blob, 'audio.wav');
      let base64 = await fetch(apiEndpoint + '/aitools/base64', {
        method: 'POST',
        body: formData,
      });

      // @ts-ignore
      base64 = await base64.text();
      const resp = await axios.post(
        apiEndpoint + '/prompt',
        {
          text: '',
          media: {
            category: 'base64audio',
            text: base64,
          },
          inputLanguage:   'hi'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'user-id': userId,
            'Conversation-Id': conversationId
          },
        }
      );
 
      if (resp.status === 201) {
        if (resp.data.text === '')
          throw new Error('Unexpected end of JSON input');
        setInputMsg(resp.data.text);
      } else {
        toast.error(`error`);
      }
      setApiCallStatus('idle');
    } catch (error) {
      console.error(error);
      setApiCallStatus('error');
      toast.error(`error`);
    }
  };

  return (
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
              style={{ cursor: "pointer"}}
            />
          </div>
        ) : (
          <div className={styles.center}>
            {apiCallStatus === "processing" ? (
              <img
                src={processing}
                alt="processingIcon"
                width="30px"
                style={{ cursor: "pointer" }}
              />
            ) : apiCallStatus === "error" ? (
              <img
                src={error}
                alt="errorIcon"
                width="30px"
                onClick={() => {
                  // try {
                  //   triggerEventInAndroid("onMicClick");
                  // } catch (err) {
                  //   logToAndroid(
                  //     `error in getting mic permission:${JSON.stringify(err)}`
                  //   );
                  // }
                  setUserClickedError(true);
                  startRecording();
                }}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <>
                <img
                  src={start}
                  alt="startIcon"
                  onClick={() => {
                    try {
                      triggerEventInAndroid("onMicClick");
                    } catch (err) {
                      logToAndroid(
                        `error in getting mic permission:${JSON.stringify(err)}`
                      );
                    }
                    setUserClickedError(true);
                    startRecording();
                  }}
                  // width="30px"
                  style={{ cursor: "pointer" }}
                />
                {tapToSpeak ? (
                  <p
                    style={{
                      color: "black",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    Tap to Speak
                  </p>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        )}
   
    </div>
  );
};

export default RenderVoiceRecorder;
