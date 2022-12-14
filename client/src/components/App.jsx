import Registration from "./registration/registration";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./navbar/navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='app'>
          <Navbar/>
          <div className="wrap">
            <Routes>
              <Route path="/registration" element={<Registration/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
