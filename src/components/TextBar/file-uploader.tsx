import App from "App";
import { useEffect, useState } from "react";
import {send} from "websocket";

export const FileUploader = (props: any) => {
    // const [media, setMedia] = useState(null);
    useEffect(()=>{
        let uploadMedia = async () => {
            const data = new FormData();
            data.append('file',props.file);
            try{
                let res = await fetch(
                'http://uci-inbound-server-svn28.ngrok.samagra.io/cdn/minioSignedUrl',
                {
                    method: 'post',
                    body: data,
                }
                );
                let responseJson = await res.json();
                if (res.status === 200) {
                    // setMedia(responseJson);
                    console.log('this is responseJson');
                    console.log(responseJson)
                    send(null,props.session, responseJson)
                }else{      
                    console.log('image not uploaded')
                }
            }
            catch{
                console.log('no response received');
                // setMedia({data: 'https://cdn.samagra.io/pdf-make-outputs/2d153764-c…7b10f403059b99baf7f696b559f6acbb95a6473b83cf9d793', mimeType: 'image/jpeg'})          
            }    
        };
        uploadMedia();
    },[props.file, props.session])
    return (
        <>  
            {/* {console.log(media)} */}
            {/* {media && <TextBar media={media}/>} */}
            {/* {media && <App media={media}/>} */}
            {/* {media && send(null,props.session, media)} */}
            {/* {media && props.sendMedia(null, media)} */}
        </>
    )
}