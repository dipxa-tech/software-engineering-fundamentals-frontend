import {
    Box,
    Heading,
    Text,
    VStack,
    Flex,
  } from "@chakra-ui/react";
  
  const About = () => {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="blackBg"
        p="1%"
      >
        <Box maxWidth="60%" textAlign="center" mb="2%">
          <Heading as="h1" size="2xl" mb={4} textColor="redWord">
            About Us
          </Heading>
          <Text fontSize="lg" textColor="beigeWord">
            Our mission is to ensure the efficient and effective management of campus assets, providing a safe and well-maintained environment for all students, staff, and visitors. We strive to achieve excellence in our services by continuously improving our processes and embracing innovation.
          </Text>
        </Box>
        <Box
          bg="blackBg"
          p="2%"
          width="100%"
          maxWidth="60%"
          borderWidth="1px"
          borderColor="beigeWord"
        >
          <VStack spacing={4} align="start">
            <Heading as="h2" size="lg" textColor="redWord">
              Our Mission
            </Heading>
            <Text fontSize="md" textColor="beigeWord">
              We aim to provide exceptional asset management services that support the educational mission of our institution. Our team is dedicated to maintaining and enhancing the campus infrastructure, ensuring a conducive environment for learning and growth.
            </Text>
            <Heading as="h2" size="lg" textColor="redWord">
              What We Do
            </Heading>
            <Text fontSize="md" textColor="beigeWord">
              Our responsibilities include the management of campus buildings, facilities, and equipment. We oversee maintenance, repairs, and upgrades, ensuring that all assets are in optimal condition. Our goal is to maximize the value and lifespan of campus assets while minimizing costs and risks.
            </Text>
            <Heading as="h2" size="lg" textColor="redWord">
              Our Team
            </Heading>
            <Text fontSize="md" textColor="beigeWord">
              Our team consists of experienced professionals in asset management, facilities management, and maintenance services. We are committed to upholding the highest standards of quality and integrity in all our operations.
            </Text>
            <Heading as="h2" size="lg" textColor="redWord">
              Contact Us
            </Heading>
            <Text fontSize="md" textColor="beigeWord">
              For any inquiries or assistance, please reach out to us at:
            </Text>
            <Text fontSize="md" textColor="beigeWord">
              Email: campusassets@example.com
            </Text>
            <Text fontSize="md" textColor="beigeWord">
              Phone: (123) 456-7890
            </Text>
          </VStack>
        </Box>
      </Flex>
    );
  };
  
  export default About;
  