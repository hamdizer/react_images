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
        setImages(images.data)
     })
     .catch(error=>{
         console.log(error)
     })
   },[])
   const showLikedImagesList=(event:any)=>{
    event.preventDefault();
    setIsShowLikedImages(!isShowLikedImages);
    const likedImages=images.filter((image:any)=>image.like===true)
    setImages(likedImages)

   }
   const like=(id:number)=>{
    const updatedImages= images.map(image => image.id !== id ? image: {...image,like:true});
    console.log(updatedImages)
   // setImages(updatedImages)
   }
   /*const unlike=(id:number)=>{
    const updatedImages= images.map(image => image.id !== id ? image: {...image,like:false});
     setImages(updatedImages)
   }*/

   return (
    <>
    <button style={{float:"right"}} onClick={(e:any)=>{showLikedImagesList(e)}}>Show Liked Images</button>
    <div className="grid grid-cols-4" >
        {images?.map((image:Image,index:number)=>(
            <ImageItem   like={like(image.id)} key={index} image={image} />))
        }
    

    </div>
    </>
   )
}
export default ImageGallery