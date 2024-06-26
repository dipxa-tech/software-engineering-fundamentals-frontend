import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Login = ({ setLoggedIn, setProfile }) => {
  const toast = useToast();
  const theme = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const loginData = {
        username,
        password,
      };

      // Make an API request to authenticate the user and obtain a token
      const response = await api.post("/auth", loginData);

      // Extract the token and user data from the response
      const { accessToken } = response.data;

      // Store the token and user data in a secure manner (e.g., in cookies or local storage)
      Cookies.set("accessToken", accessToken);


      if (response) {
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
        toast({
          title: "Logged In.",
          description: "Welcome back.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
        setLoggedIn(true);
        navigate("/");
      } else {
        toast({
          title: "Error Mismatched account.",
          description: "An Error Occured.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
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
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="100%"
      height="100%"
    >
      <Heading
        justifyContent="center"
        alignContent="center"
        pb="2%"
        textColor={theme.colors.beigeWord}
        fontFamily="mono"
      >
        Login
      </Heading>
      <Box
        maxW="lg"
        width="100%"
        p="2%"
        boxShadow="md"
        borderWidth="1px"
        borderRadius="md"
        borderColor={theme.colors.beigeWord}
        color={theme.colors.beigeWord}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              bg={theme.colors.redWord}
              size="lg"
              fontSize="md"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
