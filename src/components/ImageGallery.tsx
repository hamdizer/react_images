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
        setImages(images.data.slice(0,10).map((image:Image)=>({...image,like:false})))
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
   const like=(id:number,isLiked:boolean)=>{
    const updatedImages= images.map(image => image.id !== id ? image: {...image,like:!isLiked});
    console.log(updatedImages)
    setImages(updatedImages)
   }
   /*const unlike=(id:number)=>{
    const updatedImages= images.map(image => image.id !== id ? image: {...image,like:false});
     setImages(updatedImages)
   }*/

   return (
    <>
    <button onClick={(e:any)=>{showLikedImagesList(e)}}>Show Liked Images</button>
    <div className="grid grid-cols-4" >
        {images?.map((image:any,index:number)=>(
            <ImageItem   like={()=>like(image.id,image.like) } key={index} image={image} />))
        }
    

    </div>
    </>
   )
}
export default ImageGallery