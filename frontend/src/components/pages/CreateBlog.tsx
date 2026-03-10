// url : http://localhost:3000/Create



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

interface CreatePostResponse {
  message: string;
  blog: {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    imageUrl: string | null;
    author: string;
  }
}




export function CreateBlog(){
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    async function handleClick() {
        setIsLoading(true);
        setErrorMessage("");
    
        try {
            console.log(title.length)
            if(title.length==0 || content.length==0)
            {
                setIsLoading(false);
                setErrorMessage("Enter necessary Feilds.")
                return
            }

            
    
        } catch(e:any) {

          setErrorMessage("Post failed. Server error");
        } finally {
          setIsLoading(false);
        }
      }

    return (
        <div>
        <input
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value.trim())}
            placeholder="Title"
            className="w-full rounded border p-2"
        />

        <input
            type="text"
            value={content}
            onChange={event => setContent(event.target.value.trim())}
            placeholder="Description"
            className="w-full rounded border p-2"
        />

        <input
            type="text"
            value={image}
            onChange={event => setImage(event.target.value.trim())}
            placeholder="Image URL"
            className="w-full rounded border p-2"
        />

        <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
      >
        Post
      </button>

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

        </div>
    )
}
