import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";
import api from "../../api/api";

const EditAsset = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [asset, setAsset] = useState({
    genre: [""],
    date: "",
    amount: 0,
    status: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await api.get(`/assets/${id}`);
        if (!response.data) {
          throw new Error("Asset not found");
        }
        setAsset(response.data);
      } catch (error) {
        console.error("Error fetching asset:", error);
        // Handle error state or toast message
        toast({
          title: "Error fetching asset",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchAsset();
  }, [id, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset({
      ...asset,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/assets/${id}`, asset);
      toast({
        title: "Asset updated",
        description: "Asset details have been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/management")
    } catch (error) {
      console.error("Error updating asset:", error);
      // Handle error state or toast message
      toast({
        title: "Error updating asset",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justify="center" align="center" h="80vh">
      <Box w="50%">
        <Heading mb="4" color="beigeWord">
          Edit Asset
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel color="white">Asset Type</FormLabel>
            <Input
              bg="#222222"
              color="beigeWord"
              type="text"
              name="genre"
              value={asset.genre}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel color="white">Date</FormLabel>
            <Input
              bg="#222222"
              color="beigeWord"
              type="date"
              name="date"
              value={formatDate(asset.date)}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel color="white">Amount</FormLabel>
            <Input
              bg="#222222"
              color="beigeWord"
              type="number"
              name="amount"
              value={asset.amount}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel color="white">Status</FormLabel>
            <Input
              bg="#222222"
              color="beigeWord"
              type="text"
              name="status"
              value={asset.status}
              onChange={handleInputChange}
            />
          </FormControl>
          <HStack>
            <Button
              type="submit"
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
            >
              Update Asset
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
              onClick={() => navigate("/management")}
            >
              Cancel
            </Button>
          </HStack>
        </form>
      </Box>
    </Flex>
  );
};

export default EditAsset;
