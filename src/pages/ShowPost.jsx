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
    axios
      .get(`https://flamingo-apis.vercel.app/api/v1/posts${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something went wrong");
        console.log(err);
      });
  }, [id]);

  return (
    <div className="flex flex-col items-center">
      <BackButton />
      <h1 className="text-3xl font-semibold text-gray-800">Post</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
          <p className="text-gray-800">{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default ShowPost;
