import Home from "./pages/Home/Home";
import MainLayout from "./layout/MainLayout";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUs from "./pages/ContactUs/ContactUs";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Box, Flex } from "@chakra-ui/react";
import About from "./pages/About/About";

const App = () => {
  const comp = useRef(null);
  const [welcomeText, setWelcomeText] = useState("Welcome.");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const intervalRef = useRef(null); // Ref for the interval
  const [showWelcome, setShowWelcome] = useState(true); // State to control visibility of welcome

  useEffect(() => {
    const startAnimation = () => {
      let iteration = 0;

      clearInterval(intervalRef.current); // Clear interval using useRef

      intervalRef.current = setInterval(() => {
        setWelcomeText((prevText) => {
          return prevText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return welcomeText[index];
              }

              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        });

        iteration += 1 / 3;

        // If animation is complete, stop interval and fade out welcome
        if (iteration >= welcomeText.length) {
          clearInterval(intervalRef.current);
          gsap.to("#welcome", { opacity: 0, duration: 1, onComplete: () => {
            // After fade out, set showWelcome to false to hide the Flex container
            setShowWelcome(false);
          }});
        }
      }, 30);
    };

    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
        t1.from("#welcome", {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            startAnimation();
          },
        })
        .to("#welcome", {
          opacity: 0,
          duration: 1,
          delay: 2,
        })
        .from("#homePageRouting", {
          opacity: 0,
          duration: 1,
        });
    }, comp);

    return () => {
      clearInterval(intervalRef.current); // Clear interval on unmount
      ctx.revert();
    };
  }, []); // Run once on component mount

  return (
    <>
     <div className="relative" ref={comp}>
      {showWelcome && (
        <Flex
          h="100vh"
          w="100vw"
          bg="blackBg"
          justifyContent="center"
          alignItems="center"
        >
          <h1
            id="welcome"
            className="text-9xl font-bold absolute text-gray-100 font-shareTechMono"
          >
            {welcomeText}
          </h1>
        </Flex>
      )}
      <Box
        id="homePageRouting"
        className="absolute bg-blackBg top-0 left-0"
        minW="100%"
        minH="100vh"
      >
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </div>
    </>
  );
};

export default App;
