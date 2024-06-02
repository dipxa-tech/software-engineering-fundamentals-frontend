import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxW="70%" h="100%" pt="6%" display="flex" alignItems="center">
      <Stack direction="column" alignItems="start">
        <Heading
          lineHeight={1.1}
          mb="2%"
          fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
        >
          <Text
            maxW="40%"
            color={theme.colors.beigeWord}
            position="relative"
            fontFamily={theme.fonts.mplus}
          >
            Elevate Your Experience Managing Assets with
          </Text>
          <Box>
            <Text color={theme.colors.redWord} fontFamily={theme.fonts.moul}>
              Trust.
            </Text>
          </Box>
        </Heading>
        <Text align="justify" width="40%" color={theme.colors.beigeWord}>
          Welcome to DipxaTechnologies - where we do our absolute best in terms
          of giving what we can for the people around the world with our
          passion!
        </Text>
        <Button
          width="300px"
          mt="2%"
          size="lg"
          fontWeight="normal"
          variant="solid"
          bg={theme.colors.redWord}
          color="black"
          fontFamily={theme.fonts.moul}
          onClick={() => {
            if (location.pathname !== "/about") {
              navigate("/about");
            }
          }}
        >
          Get Started
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
