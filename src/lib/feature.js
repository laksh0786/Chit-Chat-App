import moment from "moment";

const fileFormat = (url="")=>{

    const fileExtension = url.split('.').pop();

    if(fileExtension ==="mp4" || fileExtension ==="webm" || fileExtension ==="ogg"){
        return "video";
    }
    if(fileExtension ==="mp3" || fileExtension ==="wav"){
        return "audio";
    }
    if(fileExtension==="png" || fileExtension==="jpg" || fileExtension==="jpeg" || fileExtension==="gif"){
        return "image";
    }

    return "file";

}

const transformImage = (url="" , width=100)=>{
    
    const newUrl = url.replace("upload/" , `upload/dpr_auto/w_${width}/`);

    return newUrl;
}

const getLast7Days = ()=>{
    
    const currentDate = moment();
    
    const last7Days = [];
    
    for(let i=0 ; i<7 ; i++){

        // last7Days.unshift(currentDate.format('dddd'));
        // currentDate.subtract(1 , 'days');

        const dayDate = currentDate.clone().subtract(i , "days").format("dddd");
        last7Days.unshift(dayDate);
    
    }

    return last7Days;

}


const getOrSaveFromLocalStorage = ({key , value, get})=>{

    if(get){
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
    } else{
        localStorage.setItem(key , JSON.stringify(value));
    }

}

export  {fileFormat , transformImage , getLast7Days, getOrSaveFromLocalStorage};