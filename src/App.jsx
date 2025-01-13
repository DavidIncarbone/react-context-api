import DefaultLayout from "./pages/DefaultLayout";
import Main from "./pages/Main";
import Home from "./pages/Home";
import About from "./pages/About";
import PostInfo from "./pages/PostInfo";
import AddPost from "./pages/AddPost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import './App.css'
function App() {

  // const myPosts = posts
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts">
              <Route index element={<Main />} />
              <Route path="create" element={<AddPost />} />
              <Route path=":id" element={<PostInfo />} />
            </Route>

          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
