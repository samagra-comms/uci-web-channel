import { Box, Button, Input } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/global.css";
import { useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const TextBar = (props: any) => {
  const input: any = useRef(null);
  const sendMessage = (e: any) => {
      e.preventDefault();
      const message = input.current.value;
      if(input.current.value.trim().length === 0) {
        toast.error("Please enter a valid message");
      }
      else if (message.length > 0 ){
        props?.onSend && props.onSend(input.current.value);
      }
      input.current.value = "";
    };
  const sendMessageIfEnter = (e: any) => {
    if (e.keyCode === 13 && input.current.value.length > 0) {
      sendMessage(e);
    }
    
  };

  const uploadMedia = async (fileObj: any) => {
    const data = new FormData();
    data.append('file',fileObj);
    try{
        let res = await fetch(
        `${process.env.REACT_APP_INBOUND_BASE_URL}/cdn/minioSignedUrl`,
        {
            method: 'post',
            body: data,
        }
        );
        let responseJson = await res.json();
        if (res.status === 200) {
            props.onSend(null, responseJson)
        }else{      
            console.log('image not uploaded')
        }
    }
    catch{
        console.error('no response received');
    }    
  };

  return (
    <>
      {/* <div className="chat__footer" onBlur={handleBlur} >
	        <form>
	            <input
	            	ref={inputRef}
	                value={input}
	                onClick={handleFocus}
	                onChange={!recording ? change : null}
	                onKeyPress={recording ? () => false : null}
	                onFocus={() => setFocus(true)}
	                placeholder="Type a message"
	            />
	           
		        	<>
		        		<label
			        		for="capture"  
			            	class="send__btn" 
			            >
			                {btnIcons}
			            </label> 
			        	<input
			        		style={{display: "none"}} 
				        	type="file" 
				            id="capture"  {navigator.mediaDevices.getUserMedia && window.MediaRecorder ?
                      <button 
                        type="submit" 
                        class="send__btn" 
                        onClick={input !== "" || (input === "" && image) ? sendMessage : startRecording}
                      >
                          {btnIcons}
                      </button>	
                  
				            accept="audio/*" 
				            capture
				            onChange={audioInputChange}  
			            />
		        	</>
		        
	            
	        </form>
	        
	    </div> */}
      <ToastContainer />
      <div className="chat__footer">
        <form>
          <input
            placeholder="Type your message"
            ref={input}
            onKeyDown={sendMessageIfEnter}
          />  
          <div className="file btn btn-primary" style={{position: "relative", overflow: "hidden", marginRight: '7px', paddingTop: '10px'}}>
							Upload
							<input type="file" name="file" style={{position: "absolute", fontSize: "50px", opacity: "0", right: "0", top: "0"}}
                onChange={(event) => {
                  uploadMedia(event.target.files[0])
                }}/>
						</div>       
        <button className="send__btn" onClick={sendMessage} type="submit">
          Send
        </button>
        </form>
      </div>
    </>
  );
};

export default TextBar;
