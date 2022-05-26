import { useRef } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/global.css";


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
        <button className="send__btn" onClick={sendMessage} type="submit">
          Send
        </button>
        </form>
      </div>
    </>
  );
};

export default TextBar;
