import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://flamingo-apis.vercel.app/api/v1/posts")
      .then((res) => {
        setPosts(res.data);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Posts List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Context
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id} className="h-8">
                <td className="border border-slate-600 rounded-md">
                  {index + 1}
                </td>
                <td className="border border-slate-600 rounded-md">
                  {post.title}
                </td>
                <td className="border border-slate-600 rounded-md max-md:hidden">
                  {post.body}
                </td>
                <td className="border border-slate-600 rounded-md">
                  <Link to={`/posts/${post.id}`}>
                    <BsInfoCircle className="text-sky-800 text-2xl" />
                  </Link>
                  <Link to={`/posts/${post.id}/edit`}>
                    <AiOutlineEdit className="text-sky-800 text-2xl" />
                  </Link>
                  <Link to={`/posts/${post.id}/delete`}>
                    <MdOutlineDelete className="text-sky-800 text-2xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
