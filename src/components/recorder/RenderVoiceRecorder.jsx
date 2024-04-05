import { useState, useEffect } from "react";
import stop from "./stop2.gif";
import start from "./start2.svg";
import styles from "./styles.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import {
  logToAndroid,
  triggerEventInAndroid,
} from "../../utils/android-events";
import FullScreenLoader from "../FullScreenLoader";

const RenderVoiceRecorder = ({ setInputMsg }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [apiCallStatus, setApiCallStatus] = useState("idle");
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
                startRecording()
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
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderVoiceRecorder;
