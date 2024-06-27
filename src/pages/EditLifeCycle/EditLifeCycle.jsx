import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

const EditLifeCycle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [lifecycle, setLifecycle] = useState({
    trackingId: "",
    product: "",
    customer: "",
    date: "",
    quantity: "",
    status: "",
    action: "",
    others: "",
  });

  useEffect(() => {
    const fetchLifecycle = async () => {
      try {
        const response = await api.get(`/lifecycles/${id}`);
        if (response && response.data) {
          setLifecycle(response.data);
        } else {
          throw new Error("Failed to fetch lifecycle details");
        }
      } catch (error) {
        console.error("Error fetching lifecycle details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch lifecycle details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchLifecycle();
  }, [id, toast]);

  const handleAccept = async () => {
    try {
      await api.patch(`/lifecycles/${id}`, {
        status: "Delivered",
      });
      toast({
        title: "Success",
        description: "Lifecycle record accepted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/management");
    } catch (error) {
      console.error("Error accepting lifecycle record:", error);
      toast({
        title: "Error",
        description: "Failed to accept lifecycle record",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDecline = async () => {
    try {
      await api.patch(`/lifecycles/${id}`, {
        status: "Rejected",
      });
      toast({
        title: "Success",
        description: "Lifecycle record declined",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/management");
    } catch (error) {
      console.error("Error declining lifecycle record:", error);
      toast({
        title: "Error",
        description: "Failed to decline lifecycle record",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" maxW="700px" mx="auto" mt="10">
      <Heading as="h1" size="xl" mb="8" color="beigeWord">
        View Lifecycle
      </Heading>
      <VStack spacing="4">
        <FormControl id="ID" isReadOnly>
          <FormLabel color="white">ID</FormLabel>
          <Input
            color="beigeWord"
            value={lifecycle._id || ""}
            bg="#222222"
          />
        </FormControl>
        <FormControl id="trackingId" isReadOnly>
          <FormLabel color="white">Tracking ID</FormLabel>
          <Input
            color="beigeWord"
            value={lifecycle.trackingId || ""}
            bg="#222222"
          />
        </FormControl>
        <FormControl id="product" isReadOnly>
          <FormLabel color="white">Product</FormLabel>
          <Input
            color="beigeWord"
            value={lifecycle.product || ""}
            bg="#222222"
          />
        </FormControl>
        <FormControl id="customer" isReadOnly>
          <FormLabel color="white">Customer</FormLabel>
          <Input
            color="beigeWord"
            value={lifecycle.customer.username || ""}
            bg="#222222"
          />
        </FormControl>
        <FormControl id="date" isReadOnly>
          <FormLabel color="white">Date</FormLabel>
          <Input
            color="beigeWord"
            value={
              lifecycle.dateCreated
                ? new Date(lifecycle.dateCreated).toLocaleDateString()
                : ""
            }
            bg="#222222"
          />
        </FormControl>
        <FormControl id="quantity" isReadOnly>
          <FormLabel color="white">Quantity</FormLabel>
          <Input
            color="beigeWord"
            value={lifecycle.quantity || ""}
            bg="#222222"
          />
        </FormControl>
        <FormControl id="others" isReadOnly>
          <FormLabel color="white">Others</FormLabel>
          <Input
            color="beigeWord"
            value={lifecycle.others || ""}
            bg="#222222"
          />
        </FormControl>
        <HStack spacing="4" mt="8">
          <Button
            bg="transparent"
            color="beigeWord"
            border="1px"
            borderColor="beigeWord"
            width="20vh"
            _hover={{ bg: "redWord", color: "blackBg" }}
            fontWeight="600"
            borderRadius="10px"
            onClick={handleAccept}
          >
            Accept
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
            onClick={handleDecline}
          >
            Decline
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
      </VStack>
    </Box>
  );
};

export default EditLifeCycle;
