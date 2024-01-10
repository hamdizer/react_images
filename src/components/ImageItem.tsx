import { useEffect, useState } from "react";
import { Image } from "../types/Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';

interface ImageData{
    image:Image,
    like:(id:number,isLiked:boolean)=>void
}
const ImageItem=(imageData:ImageData)=>{
    const [isLiked,setIsLiked]=useState<boolean>(false)
    
    const handleLikeImage=()=>{
        setIsLiked(!isLiked)
        imageData.like(imageData.image.id,isLiked)
     

    }
   
  useEffect(()=>{
    console.log(imageData.image)
  },[isLiked])


    return( <div className="flex flex-col items-center" >
        <img width={"50%"} height={"50%"} src={imageData.image.thumbnailUrl} alt={imageData.image.title}/>
            
            <button className="bg-blue-200 mb-4 h-1/2 w-1/2">
            {isLiked?<><FontAwesomeIcon  onClick={handleLikeImage} icon={faThumbsDown} />
      <span> Unlike</span></>:
     <>
      <FontAwesomeIcon onClick={handleLikeImage} icon={faThumbsUp} />
      <span> like</span>
      </>}
      </button>
    </div> 
    )
}
      

export default ImageItem