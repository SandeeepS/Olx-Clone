import { useState,createContext,} from "react";

export const PostContext= createContext(null)

export default function Post({Children}){
    const [postDetails,setPostDetails]=useState()
    return (
        <PostContext.Provider value={{postDetails,setPostDetails}}>
            {Children}
        </PostContext.Provider>
    )
}