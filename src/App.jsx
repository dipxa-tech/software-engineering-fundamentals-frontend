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
import {jwtDecode} from "jwt-decode";
import api from "../src/api/api";
import Request from "./pages/Request/Request";
import Management from "./pages/Management/Management";
import UserEdit from "./pages/UserEdit/UserEdit";
import EditLifeCycle from "./pages/EditLifeCycle/EditLifeCycle";
import EditAsset from "./pages/EditAssets/EditAssets";
import EditFeedback from "./pages/EditFeedBacks/EditFeedBacks";
import EditReceipt from "./pages/EditReceipt/EditReceipt";

const App = () => {
  const comp = useRef(null);
  const [welcomeText, setWelcomeText] = useState("Welcome.");
  const [userID, setUserID] = useState("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const intervalRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState("");

  const fetchUserProfile = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    setProfile(response.data.profile);
  };

  useEffect(() => {
    const storedUserData = Cookies.get("accessToken");
    if (storedUserData) {
      const decodedToken = jwtDecode(storedUserData);
      const userId = decodedToken.UserInfo._id;
      setUserID(userId);
      fetchUserProfile(userId);
    }
  }, []);

  useEffect(() => {
    const loggedInStatus = Cookies.get("accessToken");
    setLoggedIn(!!loggedInStatus); // Fix to ensure boolean value
  }, []);

  useEffect(() => {
    const startAnimation = () => {
      let iteration = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setWelcomeText((prevText) =>
          prevText
            .split("")
            .map((letter, index) =>
              index < iteration ? welcomeText[index] : letters[Math.floor(Math.random() * 26)]
            )
            .join("")
        );
        iteration += 1 / 3;
      }, 30);
    };

    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#welcome", {
        opacity: 0,
        duration: 1,
        onComplete: () => startAnimation(),
      })
        .to("#welcome", {
          opacity: 0,
          duration: 1,
          delay: 2,
        })
        .from("#homePageRouting", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setShowWelcome(false),
        });
    }, comp);

    return () => {
      clearInterval(intervalRef.current);
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative" ref={comp}>
      {showWelcome && (
        <Flex h="100vh" w="100vw" bg="blackBg" justifyContent="center" alignItems="center">
          <h1 id="welcome" className="text-9xl font-bold absolute text-gray-100 font-shareTechMono">
            {welcomeText}
          </h1>
        </Flex>
      )}
      <Box id="homePageRouting" className="absolute bg-blackBg top-0 left-0" minW="100%" minH="100vh">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout
                  setLoggedIn={setLoggedIn}
                  loggedIn={loggedIn}
                  profile={profile}
                  setUserID={setUserID}
                  userID={userID}
                />
              }
            >
              <Route index element={<Home />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route
                path="/login"
                element={<Login setLoggedIn={setLoggedIn} setUserID={setUserID} setProfile={setProfile} />}
              />
              <Route
                path="/signup"
                element={<SignUp setLoggedIn={setLoggedIn} setUserID={setUserID} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/request" element={<Request />} />
              <Route path="/management" element={<Management userID={userID} />} />
              <Route
                path={`/profile/${userID}`}
                element={<Profile profile={profile} setProfile={setProfile} />}
              />
              <Route path="/users/:id" element={<UserEdit />} />
              <Route path="/lifecycles/:id" element={<EditLifeCycle />} />
              <Route path="/feedbacks/:id" element={<EditFeedback />} />
              <Route path="/assets/:id" element={<EditAsset />} />
              <Route path="/receipts/:id" element={<EditReceipt userID={userID} />} />
            </Route>
          </Routes>
        </Router>
      </Box>
    </div>
  );
};

export default App;
