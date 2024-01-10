import { useEffect, useState } from "react";
import { Image } from "../types/Image";
interface ImageData{
    image:Image,
    like:any
}
const ImageItem=(imageData:ImageData)=>{
    const [isLiked,setIsLiked]=useState<boolean>(false)
    
    const handleLikeImage=()=>{
        setIsLiked(!isLiked)
        if(!isLiked)
        imageData.like(imageData.image.id,isLiked)
     

    }
   
  


    return( <div >
        <img width={"20%"} height={"20%"} src={imageData.image.thumbnailUrl} alt={imageData.image.title}/>
        <button  onClick={handleLikeImage} >{isLiked?"Unlike":"Like"}</button>
    </div>)
}
export default ImageItem