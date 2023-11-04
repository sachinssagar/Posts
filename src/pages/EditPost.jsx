import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`https://flamingo-apis.vercel.app/api/v1/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, [id]);

  const handleEdit = () => {
    const data = {
      title,
      content,
    };
    setIsLoading(true);

    axios
      .put(`https://flamingo-apis.vercel.app/api/v1/posts/${id}`, data)
      .then(() => {
        console.log(data);
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
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Post</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Context</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-fulll"
            />
          </div>
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEdit}>
          Edit Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
