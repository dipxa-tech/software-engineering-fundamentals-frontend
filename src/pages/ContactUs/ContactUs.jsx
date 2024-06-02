import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";

const ContactUs = () => {
  const toast = useToast();
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    toast({
      title: "Form submitted.",
      description: "We've received your message.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
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
                <Input placeholder="Your name" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Your email" />
              </FormControl>
              <FormControl id="message" isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea placeholder="Your message" />
              </FormControl>
              <Button type="submit" bg={theme.colors.redWord} width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default ContactUs;
