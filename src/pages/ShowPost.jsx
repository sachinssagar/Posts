import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowPost = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://flamingo-apis.vercel.app/api/v1/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Posts</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{post._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{post.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Content</span>
            <span>{post.content}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(post.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(post.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPost;
