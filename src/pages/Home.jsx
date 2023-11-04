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

  console.log(import.meta.env.VITE_SOME_KEY); // 123
  console.log(import.meta.env.DB_PASSWORD); // undefined
  useEffect(() => {
    axios
      .get("https://flamingo-apis.vercel.app/api/v1/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
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
        <Link to="/posts/create">
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
                <td className="border border-slate-600 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-600 rounded-md text-center">
                  {post.title}
                </td>
                <td className="border border-slate-600 rounded-md max-md:hidden text-center">
                  {post.content}
                </td>
                <td className="border border-slate-600 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/posts/details/${post.id}`}>
                      <BsInfoCircle className="text-green-800 text-2xl" />
                    </Link>
                    <Link to={`/posts/edit/${post.id}`}>
                      <AiOutlineEdit className="text-yellow-800 text-2xl" />
                    </Link>
                    <Link to={`/posts/delete/${post.id}`}>
                      <MdOutlineDelete className="text-red-800 text-2xl" />
                    </Link>
                  </div>
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
