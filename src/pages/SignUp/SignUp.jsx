import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const SignUp = () => {
  const toast = useToast();
  const theme = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const signUpData = {
        username,
        fullname,
        email,
        password,
        phone_number: "0123456",
        roles: ["User"],
        profile: "https://picsum.photos/200",
        address: "123 Example Street",
      };

      const response = await api.post("/createUser", signUpData);

      if (response) {
        toast({
          title: "Signed Up.",
          description: "Please log in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate("/");
      } else {
        toast({
          title: "Error Mismatched.",
          description: "An Error Occured.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      if (error.response.status === 409) {
        toast({
          title: "Error.",
          description: "Duplicated Username.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        toast({
          title: "Unexpected Error.",
          description: "An Error Occured.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" direction="column">
      <Heading pb="2%" textColor={theme.colors.beigeWord} fontFamily="mono">
        Sign Up
      </Heading>
      <Box
        maxW="lg"
        width="100%"
        p="2%"
        borderWidth="1px"
        borderRadius="md"
        borderColor={theme.colors.beigeWord}
        color={theme.colors.beigeWord}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password === secondPassword) {
              handleSubmit();
            } else {
              toast({
                title: "Error Mismatched.",
                description: "An Error Occured.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
              });
            }
          }}
        >
          <VStack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="fullName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setSecondPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" bg={theme.colors.redWord} width="full">
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
      <Flex
        justifyContent="flex-end"
        width="25%"
        mt={2}
        pr={4} // Adjust padding-right for spacing
      >
        <Text color="beigeWord">Already have an Account? Click</Text>
        <Text
          color="redWord"
          ml={1}
          cursor="pointer"
          onClick={() => navigate("/login")}
        >
          Here.
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUp;
