import React from "react";

import Navigation from "../layouts/navigation/Navbar"
import Footer from "../layouts/Footer";
import useCustomMove from "../hooks/useCustomMove";
import LandingPageMain from "../component/landingpage/LandingPageMain";
import SlideShowCase from "../component/landingpage/SlideShowCase";

const LandingPage = () => {
  const { moveToMain } = useCustomMove();
  return (
    <div>
      <Navigation />
      <LandingPageMain />
      <SlideShowCase />
      <Footer />
    </div>
  );
};

export default LandingPage;
