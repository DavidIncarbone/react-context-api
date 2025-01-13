// IMPORT
import './App.css'
import DefaultLayout from "./pages/DefaultLayout";
import Main from "./pages/Main";
import Home from "./pages/Home";
import About from "./pages/About";
import PostInfo from "./pages/PostInfo";
import AddPost from "./pages/AddPost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import { GlobalProvider } from "./context/GlobalContext";




function App() {
  return (
    <GlobalProvider>
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
    </GlobalProvider>


  )
}

export default App
