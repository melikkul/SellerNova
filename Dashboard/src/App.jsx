import "./App.css";
import React, { useState } from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Slidebar from './SlideBar/Slidebar.jsx'
import Screen from './Mainscreen/Screen.jsx'
function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [slidebarWidth, setSlidebarWidth] = useState(0);
  return (
    <>
      <Navbar setNavbarHeight={setNavbarHeight} />
      <Slidebar
        navbarHeight={navbarHeight}
        setSlidebarWidth={setSlidebarWidth}
      />
      <Screen navbarHeight={navbarHeight} slidebarWidth={slidebarWidth} />
    </>
  );
}

export default App;
