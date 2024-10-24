import { BrowserRouter, Routes, Route } from "react-router-dom"
import Weblayout from "./layouts/Weblayout";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from './pages/SignUpPage';
const App = () => {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Weblayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in-page" element={<SignInPage />} />
            <Route path="/sign-up-page" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
