import { useState } from "react";
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
   
 


    return( <div className="flex flex-col items-center" >
        <img width={"90%"} height={"90%"} src={imageData.image.thumbnailUrl} alt={imageData.image.title}/>
            
            <button data-testid={`like-button-${imageData.image.id}`}  className="bg-blue-200 mb-4 w-[90%] h-[90%] ">
            {isLiked?<><FontAwesomeIcon  onClick={handleLikeImage} icon={faThumbsDown} />
      <span> Unlike</span></>:
     <>
      <FontAwesomeIcon data-testid={`like-icon-${imageData.image.id}`} onClick={handleLikeImage} icon={faThumbsUp} />
      <span> like</span>
      </>}
      </button>
    </div> 
    )
}
      

export default ImageItem