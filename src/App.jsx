import Home from "./pages/Home/Home";
import MainLayout from "./layout/MainLayout";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactUs from "./pages/ContactUs/ContactUs";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import { Box, Flex } from "@chakra-ui/react";
import About from "./pages/About/About";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../src/api/api";
import Request from "./pages/Request/Request";
import Management from "./pages/Management/Management";


const App = () => {
  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUserData = Cookies.get('accessToken');
      if (storedUserData) {
        const decodedToken = jwtDecode(storedUserData);
        const userId = decodedToken.UserInfo._id;
        const response = await api.get(`/users/${userId}`);
        setProfile(response.data.profile)
      }
    };

    fetchUserProfile();
  }, [])

  //animation states
  const comp = useRef(null);
  const [welcomeText, setWelcomeText] = useState("Welcome.");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const intervalRef = useRef(null); // Ref for the interval
  const [showWelcome, setShowWelcome] = useState(true); // State to control visibility of welcome
  
  //login states
  const [loggedIn, setLoggedIn] = useState(false);

  //profile states
  const [profile, setProfile] = useState("");

  //handles and check if user accidentally refreshes the page to maintain the logged in status
  useEffect(() => {
    // Check if user is logged in on component mount
    const loggedInStatus = Cookies.get("accessToken");
    setLoggedIn(loggedInStatus);
  }, []);

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

        // if (iteration >= welcomeText.length) {
        //   clearInterval(intervalRef.current);
        //   // Reset to "Welcome" after animation
        //   setTimeout(() => {
        //     setWelcomeText("Welcome.");
        //     startAnimation(); // Start animation again
        //   }, 3000); // Change 3000 to desired duration before resetting
        // }

        iteration += 1 / 3;
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
          duration: 0.5,
          onComplete: () => {
            setShowWelcome(false);
          },
        });
    }, comp);

    return () => {
      clearInterval(intervalRef.current); // Clear interval on unmount
      ctx.revert();
    };
  }, []); // Run once on component mount

  // useEffect(() => {
  //   console.log(animationComplete);
  // }, [animationComplete]);
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
              <Route
                path="/"
                element={
                  <MainLayout
                    setLoggedIn={setLoggedIn}
                    loggedIn={loggedIn}
                    profile={profile}
                  />
                }
              >
                <Route index element={<Home />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route
                  path="/login"
                  element={<Login setLoggedIn={setLoggedIn}  setProfile={setProfile}/>}
                />
                <Route
                  path="/signup"
                  element={<SignUp setLoggedIn={setLoggedIn} />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/request" element={<Request />} />
                <Route path="/management" element={<Management />} />
                <Route
                  path="/profile"
                  element={
                    <Profile profile={profile} setProfile={setProfile} />
                  }
                />
              </Route>
            </Routes>
          </Router>
        </Box>
      </div>
    </>
  );
};

export default App;
