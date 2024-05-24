import Home from "./pages/Home/Home";
import MainLayout from "./layout/MainLayout";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const comp = useRef(null);
  const [welcomeText, setWelcomeText] = useState("Welcome.");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const intervalRef = useRef(null); // Ref for the interval

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
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet> */}
      <div className="relative" ref={comp}>
        <div className="h-screen w-screen flex bg-gray-950 justify-center place-items-center">
          <h1
            id="welcome"
            className="text-9xl font-bold absolute text-gray-100 font-shareTechMono"
          >
            {welcomeText}
          </h1>
        </div>
        <div id="homePageRouting" className="absolute top-0 left-0 bg-gray-950 h-screen w-screen">
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
