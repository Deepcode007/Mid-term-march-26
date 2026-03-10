//url : http://localhost:3000/

// url : http://localhost:3000/signup


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";
import { CreateBlog } from "./CreateBlog";
import { getBlog } from "./GetBlog";

export function Home() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  async function handleClick() {
    setIsLoading(true);
    setIsVisible(prev => !prev)
    setErrorMessage("");
  }

  return (
    <section className="mx-auto max-w-md space-y-4">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        <div  style={{display: "flex", flexDirection: "column"}}>

            <button
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                className="rounded bg-black px-4 py-2 text-white disabled:opacity-60 cursor-pointer"
                >
                Create Post
            </button>
            {isVisible? <CreateBlog/> : null}

            {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
        </div>
        <div>
            <h1>Blogs</h1>
            {(isLoading? "Ughjvvkb,": getBlog())}
        </div>
    </section>
  );
}