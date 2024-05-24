import {
  Flex,
  Box,
  Image,
  Spacer,
  Button,
  Container,
  useTheme,
  ButtonGroup,
} from "@chakra-ui/react";

const Header = () => {
  const theme = useTheme();

  return (
    <Box
      as="header"
      color="white"
      bg="transparent"
      overflow="hidden" // Prevents the sidebar scroll from affecting layout
      px="10"
    >
      <Flex align="center">
        <Flex align="center" flex="1">
          <Image src="../drawingcow2.svg" alt="Cow Drawing" />
          <Container
            ml="4"
            fontFamily="mono"
            fontSize="x-large"
            textColor="redWord"
          >
            DIPXATECHNOLOGIES
          </Container>
        </Flex>
        <Spacer />
        <ButtonGroup gap="2">
          <Button
            variant="ghost"
            textColor="beigeWord"
            fontSize="large"
            fontFamily="mono"
          >
            Contact Us
          </Button>
          <Button
            variant="ghost"
            textColor="beigeWord"
            fontSize="large"
            fontFamily="mono"
          >
            About
          </Button>
          <Button
            variant="outline"
            textColor="beigeWord"
            fontSize="large"
            fontFamily="mono"
          >
            Login
          </Button>
          <Button
            variant="solid"
            bg={theme.colors.redWord}
            color="black"
            fontSize="large"
            fontFamily="mono"
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Header;
