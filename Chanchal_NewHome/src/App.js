import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Luxury from "./Components/Luxury/Luxury";
import Driver from "./Components/Driver/Driver";
import About from "./Components/About/About";
import Works from "./Components/Works/Works";
import Experience from "./Components/Experience/Experience";
import Contact from "./Components/Contact/Contact";
import Feed from "./Components/Feed/Feed";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <div className="link">
        <p>
          <a
            className="log"
            href="https://tse2.mm.bing.net/th?id=OIP.aqSVE7TUcbsLCQdF_FPfRgHaEK&pid=Api&P=0&h=180"
            target="blank"
          >
            log In
          </a>
        </p>
        <p>
          <a
            className="log"
            href="https://tse2.mm.bing.net/th?id=OIP.aqSVE7TUcbsLCQdF_FPfRgHaEK&pid=Api&P=0&h=180"
            target="blank"
          >
            signup
          </a>
        </p>
      </div>
      <About />
      <Works />
      <Driver />
      <Luxury />
      <Experience />
      <Feed />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
