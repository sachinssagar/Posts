import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
    };
    setIsLoading(true);
    axios
      .post("https://flamingo-apis.vercel.app/api/v1/posts", data)
      .then(() => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <BackButton />
      <h1 className="text-3xl font-semibold text-gray-800">Create Post</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-1/2"
        >
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded-md p-2 my-4 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border border-gray-300 rounded-md p-2 my-4 w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-sky-800 text-white rounded-md p-2 my-4 w-full"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePost;
