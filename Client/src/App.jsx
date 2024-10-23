import { BrowserRouter, Routes, Route } from "react-router-dom"
import Weblayout from "./layouts/Weblayout";
import Home from "./pages/Home";
const App = () => {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Weblayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    // // <<<<<<< HEAD
    //     <div className='h-screen flex justify-center bg-black'>
    //       <Navbar/>
    //     </div>
    // // =======
    // //     <>
    // //        <Navbar/>
    // //        <SignInPage></SignInPage>
    // //     </>
    // // >>>>>>> 410400be82656f5b311fcf364e08a3ef7df1cacd
  )
}

export default App
