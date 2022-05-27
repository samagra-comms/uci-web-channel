import { Box, Button, Input } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileUploader } from "./file-uploader";

const TextBar = (props: any) => {
  const input: any = useRef(null);
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const sendMessage = (e: any) => {
    e.preventDefault();
    props?.onSend && props.onSend(input.current.value);
    input.current.value = "";
  };
  const sendMessageIfEnter = (e: any) => {
    if (e.keyCode === 13) {
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
                  setSelectedImage(event.target.files[0])
                }}/>
						</div>       
        <button className="send__btn" onClick={sendMessage} type="submit">
          Send
        </button>
        </form>
        {selectedImage && <FileUploader file={selectedImage} sendMedia={props.onSend}/>}
      </div>
    </>
  );
};

export default TextBar;
