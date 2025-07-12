import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
import Copyright from "./Copyright";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
      <Copyright />
    </div>
  );
};

export default HomePage;
