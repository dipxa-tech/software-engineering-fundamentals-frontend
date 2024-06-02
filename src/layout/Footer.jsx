import { Box, Flex, Image } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="transparent">
      <Flex align="center" justifyContent="flex-start" px="10" >
        <Image src="../drawingcow2.svg" alt="Cow Drawing" />
      </Flex>
    </Box>
  );
};

export default Footer;
