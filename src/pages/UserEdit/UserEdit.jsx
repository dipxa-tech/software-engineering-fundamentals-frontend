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
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
    fullname: "",
    phone_number: "",
    roles: [],
    address: "",
    profile: "",
  });
  const [receipts, setReceipts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5); // Items per page

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        if (response && response.data) {
          setUser(response.data);
        } else {
          throw new Error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user details",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    const fetchReceipts = async () => {
      try {
        const response = await api.get(`/receipts/${id}`);
        if (response && response.data) {
          const reversedRecords = response.data.reverse();
          setReceipts(reversedRecords);
        } else {
          throw new Error("Failed to fetch associated receipts");
        }
      } catch (error) {
        console.error("Error fetching associated receipts:", error);
        toast({
          title: "Error",
          description: "Failed to fetch associated receipts",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUser();
    fetchReceipts();
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const indexOfLastReceipt = currentPage * perPage;
  const indexOfFirstReceipt = indexOfLastReceipt - perPage;
  const currentReceipts = receipts.slice(
    indexOfFirstReceipt,
    indexOfLastReceipt
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box w="100%" maxW="700px" mx="auto" mt="10">
      <Heading as="h1" size="xl" mb="8" color="beigeWord">
        View User
      </Heading>
      <form>
        <VStack spacing="4">
          <FormControl id="username" isRequired>
            <FormLabel color="white">Username</FormLabel>
            <Input
              readOnly
              color="beigeWord"
              name="username"
              value={user.username}
              onChange={handleChange}
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
              value={user.email}
              onChange={handleChange}
              bg="#222222"
            />
          </FormControl>
          <FormControl id="fullname" isRequired>
            <FormLabel color="white">Full Name</FormLabel>
            <Input
              readOnly
              color="beigeWord"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
              bg="#222222"
            />
          </FormControl>
          <FormControl id="phone_number" isRequired>
            <FormLabel color="white">Phone Number</FormLabel>
            <Input
              readOnly
              color="beigeWord"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
              bg="#222222"
            />
          </FormControl>
          <FormControl id="roles" isRequired>
            <FormLabel color="white">Role</FormLabel>
            <Input
              readOnly
              color="beigeWord"
              name="roles"
              value={user.roles.join(", ")}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "roles",
                    value: e.target.value.split(",").map((role) => role.trim()),
                  },
                })
              }
              bg="#222222"
            />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel color="white">Address</FormLabel>
            <Input
              readOnly
              color="beigeWord"
              name="address"
              value={user.address}
              onChange={handleChange}
              bg="#222222"
            />
          </FormControl>
        </VStack>
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
            onClick={() => navigate("/management")}
          >
            Return
          </Button>
        </HStack>
      </form>

      <Box mt="10">
        <Heading as="h2" size="lg" mb="4" color="beigeWord">
          Associated Receipts
        </Heading>
        <Table variant="unstyled">
          <Thead>
            <Tr color="white" fontWeight="600" fontSize="sm">
              <Td>Receipt ID</Td>
              <Td>Asset</Td>
              <Td>Date</Td>
              <Td>Quantity</Td>
              <Td>Status</Td>
            </Tr>
          </Thead>
          <Tbody color="beigeWord">
            {currentReceipts.map((receipt) => (
              <Tr key={receipt._id}>
                <Td>{receipt.receiptId}</Td>
                <Td>{receipt.assetType.join(", ")}</Td>
                <Td>{new Date(receipt.date).toLocaleDateString()}</Td>
                <Td>{receipt.quantity}</Td>
                <Td>
                  <Badge
                    px="15%"
                    py="5%"
                    borderRadius="xl"
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
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {receipts.length > perPage && (
          <HStack mt="4" spacing="2">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              color="beigeWord"
              borderColor="beigeWord"
              variant="outline"
              _hover={{
                bg: "redWord",
                color: "blackBg",
              }}
              fontWeight="600"
              borderRadius="10px"
            >
              Previous
            </Button>
            {Array.from(
              { length: Math.ceil(receipts.length / perPage) },
              (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  color={currentPage === i + 1 ? "blackBg" : "beigeWord"}
                  bg={currentPage === i + 1 ? "redWord" : "transparent"}
                  border={currentPage === i + 1 ? "1px" : "none"}
                  borderColor="beigeWord"
                  _hover={{
                    bg: "redWord",
                    color: "blackBg",
                  }}
                  fontWeight="600"
                  borderRadius="10px"
                >
                  {i + 1}
                </Button>
              )
            )}
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(receipts.length / perPage)}
              color="beigeWord"
              borderColor="beigeWord"
              variant="outline"
              _hover={{
                bg: "redWord",
                color: "blackBg",
              }}
              fontWeight="600"
              borderRadius="10px"
            >
              Next
            </Button>
          </HStack>
        )}
      </Box>
    </Box>
  );
};

export default UserEdit;
