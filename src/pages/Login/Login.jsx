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

const Login = () => {
  const toast = useToast();
  const theme = useTheme();

  const handleLogin = (event) => {
    event.preventDefault();
    // Here you would handle the login logic, e.g., API call
    toast({
      title: "Logged in successfully.",
      description: "Welcome back!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
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
