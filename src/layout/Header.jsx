import {
  Flex,
  Box,
  Image,
  Spacer,
  Button,
  useTheme,
  ButtonGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Flex align="center" px="10">
        <Image src="../drawingcow2.svg" alt="Cow Drawing" />
        <Box
          ml="4"
          fontFamily="mono"
          fontSize="x-large"
          textColor="redWord"
          onClick={() => {
            if (location.pathname !== "/") {
              navigate("/");
            }
          }}
        >
          DIPXATECHNOLOGIES
        </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button
          variant="ghost"
          textColor="beigeWord"
          fontSize="large"
          fontFamily="mono"
          onClick={() => {
            if (location.pathname !== "/contactus") {
              navigate("/contactus");
            }
          }}
        >
          Contact Us
        </Button>
        <Button
          variant="ghost"
          textColor="beigeWord"
          fontSize="large"
          fontFamily="mono"
          onClick={() => {
            if (location.pathname !== "/about") {
              navigate("/about");
            }
          }}
        >
          About
        </Button>
        <Button
          variant="outline"
          textColor="beigeWord"
          fontSize="large"
          fontFamily="mono"
          onClick={() => {
            if (location.pathname !== "/login") {
              navigate("/login");
            }
          }}
        >
          Login
        </Button>
        <Button
          variant="solid"
          bg={theme.colors.redWord}
          color="black"
          fontSize="large"
          fontFamily="mono"
          onClick={() => {
            if (location.pathname !== "/signup") {
              navigate("/signup");
            }
          }}
        >
          Sign Up
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
