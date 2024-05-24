import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Box
        className="flex flex-col flex-1"
        bgImage={
          isHomePage ? "url('../woman-6063087_1920 (1).jpg')" : ""
        }
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        color="white"
      >
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </Box>
    </div>
  );
};

export default Layout;
