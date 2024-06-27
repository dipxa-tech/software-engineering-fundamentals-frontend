import {
    Box,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Badge,
    Flex,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import api from "../../api/api";
  import { IoArrowBack } from "react-icons/io5";
  
  const EditReceipt = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [receipt, setReceipt] = useState({
      _id: "",
      receiptId: "",
      userId: {
        username: "",
        fullname: "",
        email: "",
        phone_number: "",
        roles: [],
        address: "",
        profile: "",
      },
      assetType: [],
      date: "",
      quantity: "",
      status: "",
    });
  
    useEffect(() => {
      const fetchReceipt = async () => {
        try {
          const response = await api.get(`/receipts/specific/${id}`);
          if (response) {
            setReceipt(response.data);
          } else {
            throw new Error("Failed to fetch receipt details");
          }
        } catch (error) {
          console.error("Error fetching receipt details:", error);
        }
      };
  
      fetchReceipt();
    }, []);
  
    if (!receipt.userId) {
      return <Box>Loading...</Box>;
    }
  
    return (
      <Box w="100%" maxW="700px" mx="auto" mt="10">
        <Flex alignItems="center" mb={4}>
          <Button
            leftIcon={<IoArrowBack />}
            colorScheme="purple"
            onClick={() => navigate(-1)}
            mr={4}
          >
            Back
          </Button>
          <Heading size="md" color="beigeWord">
            Receipt Details
          </Heading>
        </Flex>
        <form>
          <VStack spacing="4">
            <FormControl id="receiptId" isRequired>
              <FormLabel color="white">Receipt ID</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="receiptId"
                value={receipt.receiptId}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="username" isRequired>
              <FormLabel color="white">Username</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="username"
                value={receipt.userId.username}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="fullname" isRequired>
              <FormLabel color="white">Full Name</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="fullname"
                value={receipt.userId.fullname}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel color="white">Email</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="email"
                type="email"
                value={receipt.userId.email}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="phone_number" isRequired>
              <FormLabel color="white">Phone Number</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="phone_number"
                value={receipt.userId.phone_number}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="roles" isRequired>
              <FormLabel color="white">Role</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="roles"
                value={receipt.userId.roles.join(", ")}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="address" isRequired>
              <FormLabel color="white">Address</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="address"
                value={receipt.userId.address}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="assetType" isRequired>
              <FormLabel color="white">Asset</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="assetType"
                value={Array.isArray(receipt.assetType) ? receipt.assetType.flat().join(", ") : "N/A"}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="date" isRequired>
              <FormLabel color="white">Date</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="date"
                value={new Date(receipt.date).toLocaleDateString()}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="quantity" isRequired>
              <FormLabel color="white">Quantity</FormLabel>
              <Input
                readOnly
                color="beigeWord"
                name="quantity"
                value={receipt.quantity}
                bg="#222222"
              />
            </FormControl>
            <FormControl id="status" isRequired>
              <FormLabel color="white">Status</FormLabel>
              <Badge
                px="8px"
                variant="subtle"
                colorScheme={
                  receipt.status === "Delivered"
                    ? "green"
                    : receipt.status === "Rejected"
                    ? "red"
                    : receipt.status === "Returned"
                    ? "blue"
                    : "orange"
                }
              >
                {receipt.status}
              </Badge>
            </FormControl>
          </VStack>
        </form>
      </Box>
    );
  };
  
  export default EditReceipt;
  