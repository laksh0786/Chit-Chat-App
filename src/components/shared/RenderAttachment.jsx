import React from 'react'
import { transformImage } from '../../lib/feature';
import { FileOpen as FileOpenIcon} from '@mui/icons-material';

const RenderAttachment = ({file, url}) => {

    switch (file) {
        case "video":
            return <video src={url} preload='none' width="150px" controls />
            

        case "image":
            return <img src={transformImage(url, 200)} alt="attachment" width="150px" height={"150px"} style={{
                objectFit: "contain",
                borderRadius: "1rem",
            }} />

        case "audio":
            return <audio src={url} preload='none' controls />
            

        default:
            return <FileOpenIcon />

    }

}

export default RenderAttachment