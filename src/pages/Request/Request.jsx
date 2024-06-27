import { useState, useEffect } from "react";
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
import api from "../../api/api"; // Adjust the import path as needed
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

const Request = () => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0);
  const [assetId, setAssetId] = useState(""); // Store asset ID
  const [others, setOthers] = useState("");
  const [assetTypes, setAssetTypes] = useState([]); // Store asset types
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch asset types from the backend
    const fetchAssetTypes = async () => {
      try {
        const response = await api.get("/assets");
        const filteredAssets = response.data.filter(
          (asset) => asset.status === "Available"
        );
        setAssetTypes(filteredAssets);
      } catch (error) {
        toast({
          title: "An error occurred.",
          description: "Unable to fetch asset types.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchAssetTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedUserData = Cookies.get("accessToken");
      if (storedUserData) {
        const decodedToken = jwtDecode(storedUserData);
        const userId = decodedToken.UserInfo._id;

        // Construct the request data
        const receiptData = {
          userId: userId,
          assetId: assetId,
          date: new Date().toISOString(),
          quantity: amount,
          status: "Pending",
          others,
        };

        // Send the form data to your backend API
        await api.post("/lifecycles", receiptData);

        // Display success toast
        toast({
          title: "Loan request submitted.",
          description: "We've received your loan request.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear the form
        setUsername("");
        setAmount(0);
        setAssetId(""); // Clear asset ID
        setOthers("");

        // Navigate to home or another page if needed
        navigate("/");
      }
    } catch (error) {
      // Handle error
      toast({
        title: "An error occurred.",
        description: "Unable to submit loan request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    // Clear the form
    setUsername("");
    setAmount(0);
    setAssetId(""); // Clear asset ID
    setOthers("");
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
                color="beigeWord"
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
                color="beigeWord"
                bg="#222222"
                type="number"
                border="none"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
              />
            </FormControl>
            <FormControl id="assetType" isRequired>
              <FormLabel color="beigeWord">Type of Assets</FormLabel>
              <Select
                color="beigeWord"
                colorScheme="gray"
                bg="#222222"
                border="none"
                value={assetId} // Use asset ID
                onChange={(e) => {
                  setAssetId(e.target.value); // Set asset ID
                }}
              >
                <option style={{ backgroundColor: "#333333" }} value="">
                  Select asset type
                </option>
                {assetTypes.map((asset) => (
                  <option
                    key={asset._id}
                    style={{ backgroundColor: "#333333" }}
                    value={asset._id} // Use asset ID as value
                  >
                    {asset.genre}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="others">
              <FormLabel color="beigeWord">
                Others information (if needed)
              </FormLabel>
              <Textarea
                color="beigeWord"
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
