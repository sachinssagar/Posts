import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CretePost from "./pages/CreatePost";
import ShowPost from "./pages/ShowPost";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/create-post" element={<CretePost />} />
      <Route path="/posts/:id" element={<ShowPost />} />
      <Route path="/posts/:id/edit" element={<EditPost />} />
      <Route path="/posts/:id/delete" element={<DeletePost />} />
    </Routes>
  );
};

export default App;
