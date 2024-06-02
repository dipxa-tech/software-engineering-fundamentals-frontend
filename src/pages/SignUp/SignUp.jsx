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
  } from "@chakra-ui/react";
  import { useTheme } from "@emotion/react";
  
  const SignUp = () => {
    const toast = useToast();
    const theme = useTheme();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      toast({
        title: "Form submitted.",
        description: "We've received your message.",
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

      >
        <Heading
          pb="2%"
          textColor={theme.colors.beigeWord}
        >
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
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" placeholder="Username" />
              </FormControl>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input placeholder="Full Name" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Your email" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" />
              </FormControl>
              <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm password" />
              </FormControl>
              <Button type="submit" bg={theme.colors.redWord} width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    );
  };
  
  export default SignUp;
  