import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

        if (iteration >= welcomeText.length) {
          clearInterval(intervalRef.current);
          // Reset to "Welcome" after animation
          setTimeout(() => {
            setWelcomeText("Welcome.");
            startAnimation(); // Start animation again
          }, 3000); // Change 3000 to desired duration before resetting
        }

        iteration += 1 / 3;
      }, 30);
    };

    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        yPercent: "100",
        duration: 1.3,
        delay: 0.3,
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
          onComplete: startAnimation, // Start the animation when welcome text is fully visible
        });
    }, comp);

    return () => {
      clearInterval(intervalRef.current); // Clear interval on unmount
      ctx.revert();
    };
  }, [welcomeText]); // Run once on component mount

  return (
    <div className="relative" ref={comp}>
      <div
        id="intro-slider"
        className="h-screen p-10 bg-gray-50 absolute top-0 left-0 font-shareMono z-10 w-full flex flex-col gap-10 tracking-tight"
      >
        <h1 className="text-9xl" id="title-1">
          Software 
        </h1>
        <h1 className="text-9xl" id="title-2">
        Engineering
        </h1>
        <h1 className="text-9xl" id="title-3">
          Fundementals
        </h1>
      </div>
      <div className="h-screen flex bg-gray-950 justify-center place-items-center">
        <h1
          id="welcome"
          className="text-9xl font-bold text-gray-100 font-shareMono"
        >
          {welcomeText}
        </h1>
      </div>
    </div>
  );
};

export default App;
