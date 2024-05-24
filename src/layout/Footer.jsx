import { Box, Flex, Image } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="header" color="white" bg="transparent">
      <Flex align="center" px="10">
      <Image src="../drawingcow2.svg" alt="Cow Drawing" />
      </Flex>
    </Box>
  );
};

export default Footer;
