import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import SongList from "./Components/SongList";
import Navbar from "./Components/Navbar";
import SongState from "./Context/songs/SongState";
import "./App.css";
import PlayList from "./Components/PlayList";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="w-screen h-screen bg-richblack-900 flex flex-col">
      <SongState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/" element={<SongList />} />
            <Route exact path="/playlist" element={<PlayList />} />
          </Routes>
          <Footer />
        </Router>
      </SongState>
    </div>
  );
}

export default App;
