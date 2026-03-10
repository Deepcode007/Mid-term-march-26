import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from "./components/pages/Signin";
import { Signup } from "./components/pages/Signup";
import { Home } from "./components/pages/Home";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />

        {/* Enter other Routes in here */}
        <Route path = "/signup" element={<Signup/>}/>
        <Route path = "/home" element={<Home/>}/>
        
        <Route path="*" element={<div className="p-6">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
