//url : http://localhost:3000/blog/1



// url : http://localhost:3000/Create



import { createElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { CustomCard } from "../ui/custom-card";

interface getPostResponse {
  message: string;
  blogs: {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    imageUrl: string | null;
    author: string;
  }[]
}




export function getBlog(){
    
    const [post, setPost] = useState([{}]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    async function handleClick() {
        setIsLoading(true);
        setErrorMessage("");
    
        try {
          const response = await apiClient.get<getPostResponse>("/blogs/blogs");

          setPost(response.data.blogs);
    
        } catch(e:any) {

          setErrorMessage("Post failed. Server error");
        } finally {
          setIsLoading(false);
        }
      }

    return (
        <div>
            <button
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
            >
                Refresh
            </button>

            {post.map((x: any) => <CustomCard key={x.id} title={x.title} description={x.content} imageUrl={x.imageUrl} />)}
            {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

        </div>
    )
}
