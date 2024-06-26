import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Request = () => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [assetType, setAssetType] = useState("");
  const [others, setOthers] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can send the form data to your backend API

    toast({
      title: "Loan request submitted.",
      description: "We've received your loan request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Clear the form
    setUsername("");

    setAmount("");
    setAssetType("");
  };

  const handleCancel = () => {
    // Clear the form
    setUsername("");

    setAmount("");
    setAssetType("");
    navigate("/");
  };

  return (
    <Box
      w="100vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt="5%"
    >
      <Heading pb="2%" color="beigeWord" fontFamily="mono">
        Request Page
      </Heading>
      <Box
        width="500px"
        p="5"
        bg="transparent"
        borderRadius="lg"
        borderWidth="1px"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel color="beigeWord">Username</FormLabel>
              <Input
                bg="#222222"
                border="none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="amount" isRequired>
              <FormLabel color="beigeWord">Amount to Loan</FormLabel>
              <Input
                bg="#222222"
                type="number"
                border="none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
            <FormControl id="assetType" isRequired>
              <FormLabel color="beigeWord">Type of Assets</FormLabel>
              <Select
                color="beigeWord"
                colorScheme="gray"
                bg="#222222"
                border="none"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
              >
                <option style={{ backgroundColor: "#333333" }} value="Chairs">Chairs</option>
                <option style={{ backgroundColor: "#333333" }} value="Tables">Tables</option>
                <option style={{ backgroundColor: "#333333" }} value="Classrooms">Classrooms</option>
                <option style={{ backgroundColor: "#333333" }} value="others">Others</option>
              </Select>
            </FormControl>
            <FormControl id="others">
              <FormLabel color="beigeWord">
                Others information (if needed)
              </FormLabel>
              <Textarea
                background="#222222"
                size="lg"
                border="none"
                borderRadius="10px"
                height="150px"
                value={others}
                onChange={(e) => setOthers(e.target.value)}
              />
            </FormControl>
            <Stack direction="row" justifyContent="space-between">
              <Button
                bg="transparent"
                color="beigeWord"
                border="1px"
                borderColor="beigeWord"
                width="20vh"
                _hover={{ bg: "redWord", color: "blackBg" }}
                fontWeight="600"
                borderRadius="10px"
                type="submit"
              >
                Submit
              </Button>
              <Button
                color="beigeWord"
                borderColor="beigeWord"
                variant="outline"
                width="20vh"
                _hover={{
                  bg: "redWord",
                  color: "blackBg",
                }}
                fontWeight="600"
                borderRadius="10px"
                onClick={handleCancel}
              >
                Clear
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Request;
