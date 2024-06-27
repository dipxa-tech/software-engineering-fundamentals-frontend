import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Image,
  Spacer,
  Button,
  useTheme,
  ButtonGroup,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


const Header = ({ loggedIn, setLoggedIn, profile, userID }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const toast = useToast();

  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUserData = Cookies.get('accessToken');
      if (storedUserData) {
        const decodedToken = jwtDecode(storedUserData);
        const userId = decodedToken.UserInfo._id;
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data)
      }
    };

    fetchUserProfile();
  }, [loggedIn])

  const handleLogout = async () => {
    try {
      // Make an API request to the backend logout endpoint
      await api.post("/auth/logout");

      // Remove the access token from cookies
      Cookies.remove("accessToken");

      // Redirect or perform actions after successful logout
      navigate("/");

      toast({
        title: "Logged Out.",
        description: "Have a good day.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Logout failed:", error.message);

      toast({
        title: "Error.",
        description: "An Error Occured.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Flex align="center" px="10">
      <Image src="../drawingcow2.svg" alt="Cow Drawing" />
      <Box
        ml="4"
        fontFamily="mono"
        fontSize="x-large"
        color={theme.colors.redWord}
        cursor="pointer"
        onClick={() => {
          if (location.pathname !== "/") {
            navigate("/");
          }
        }}
      >
        DIPXATECHNOLOGIES
      </Box>
      <Spacer />
      <ButtonGroup gap="2" alignItems="center">
        <Button
          variant="ghost"
          color={theme.colors.beigeWord}
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
          color={theme.colors.beigeWord}
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
        {loggedIn ? (
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              rightIcon={<ChevronDownIcon color={theme.colors.beigeWord} />}
            >
              <Avatar
                size="md"
                name={userData.username}
                src={profile}
                cursor="pointer"
              />
            </MenuButton>
            <MenuList bg="transparent" borderColor={theme.colors.beigeWord}>
              <MenuItem
                bg="transparent"
                _hover={{ bg: theme.colors.redWord }}
                _active={{ bg: theme.colors.redWord }}
                color={theme.colors.beigeWord}
                justifyContent="center"
                onClick={() => {
                  // Handle profile navigation
                  navigate(`/profile/${userID}`);
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                bg="transparent"
                _hover={{ bg: theme.colors.redWord }}
                _active={{ bg: theme.colors.redWord }}
                color={theme.colors.beigeWord}
                justifyContent="center"
                onClick={() => {
                  // Handle management navigation
                  navigate("/management");
                }}
              >
                Management
              </MenuItem>
              <MenuItem
                bg="transparent"
                _hover={{ bg: theme.colors.redWord }}
                _active={{ bg: theme.colors.redWord }}
                color={theme.colors.beigeWord}
                justifyContent="center"
                onClick={() => {
                  // Handle request navigation
                  navigate("/request");
                }}
              >
                Request
              </MenuItem>
              <MenuItem
                bg="transparent"
                _hover={{ bg: theme.colors.redWord }}
                _active={{ bg: theme.colors.redWord }}
                color={theme.colors.beigeWord}
                justifyContent="center"
                onClick={() => {
                  // Handle logout functionality
                  setLoggedIn(false);
                  handleLogout();
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Button
              variant="outline"
              color={theme.colors.beigeWord}
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
          </>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
