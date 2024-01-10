import { useEffect, useState } from "react"
import { Image } from "../types/Image"
import axios from "axios"
import ImageItem from "./ImageItem"

const ImageGallery=()=>{
    const [isShowLikedImages,setIsShowLikedImages]=useState<boolean>(false)
   const [images,setImages]=useState<Image[]>([])
   useEffect(()=>{
     axios.get("https://jsonplaceholder.typicode.com/photos")
     .then((images)=>{
        setImages(images.data.map((image:Image)=>({...image,like:false})))
     })
     .catch(error=>{
         console.log(error)
     })
   },[])
   const showLikedImagesList=(event: React. MouseEvent<HTMLElement>)=>{
    event.preventDefault();
    setIsShowLikedImages(!isShowLikedImages);
    const likedImages=images.filter((image:any)=>image.like===true)
    setImages(likedImages)
   }
   const like=(id:number,isLiked:boolean)=>{
    const updatedImages= images.map(image => image.id !== id ? image: {...image,like:!isLiked});
    setImages(updatedImages)
   }


   return (
    <>
    <div className="flex justify-between mb-4 px-2 py-2">
    <button className="bg-blue-500 rounded-md rounded-md flex  items-center justify-center px-2 h-[30%]"  onClick={showLikedImagesList}><span>Show Liked Images</span></button>

    </div>
    <div className="grid grid-cols-4" >
        {images?.map((image:any,index:number)=>(
            <ImageItem   like={()=>like(image.id,image.like) } key={index} image={image} />))
        }
    

    </div>
    </>
   )
}
export default ImageGallery