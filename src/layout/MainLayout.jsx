import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ setLoggedIn, loggedIn, profile, userID, setUserID }) => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      bgImage={isHomePage ? "url('../woman-6063087_1920 (1).jpg')" : ""}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} profile={profile} userID={userID} setUserID={setUserID} />
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
