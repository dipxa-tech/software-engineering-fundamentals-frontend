import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Heading,
} from "@chakra-ui/react";
import api from "../../api/api";
import { useTheme } from "@emotion/react";
import { useState } from "react";

const ContactUs = () => {
  const toast = useToast();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      const feedbackData = {
        username,
        email,
        message,
      };

      e.preventDefault();

      const response = await api.post("/feedbacks", feedbackData);

      if (response) {
        toast({
          title: "Form submitted.",
          description: "We've received your message.",
          status: "success",
          duration: 5000,
          isClosable: true,
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        w="100vw"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="5%"
      >
        <Heading
          justifyContent="center"
          alignContent="center"
          pb="2%"
          textColor="beigeWord"
        >
          Contact Us
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
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Your name"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Your message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </FormControl>
              <Button type="submit" bg={theme.colors.redWord} width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;
