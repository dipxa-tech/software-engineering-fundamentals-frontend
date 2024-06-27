import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Button,
    ButtonGroup,
    Icon,
    Badge,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { MdOutlineDelete } from "react-icons/md";
  import api from "../../api/api";
  import { IoSearchOutline } from "react-icons/io5";
  
  const ReceiptsInfoPage = ({ navigate, userRoles = [], userID }) => {
    const [receipts, setReceipts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const receiptsPerPage = 10;
  
    // Fetch receipts for admin
    const fetchAdminReceipts = async () => {
      try {
        const response = await api.get("/receipts");
        if (!response) {
          throw new Error("Failed to fetch receipts");
        }
        const reversedReceipts = response.data.reverse();
        setReceipts(reversedReceipts);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };
  
    // Fetch receipts for user
    const fetchUserReceipts = async () => {
      try {
        // Adjust the API endpoint or logic based on user's permissions
        const response = await api.get(`/receipts/${userID}`);
        if (!response) {
          throw new Error("Failed to fetch user-specific receipts");
        }
        const reversedReceipts = response.data.reverse();
        setReceipts(reversedReceipts);
      } catch (error) {
        console.error("Error fetching user-specific receipts:", error);
      }
    };
  
    useEffect(() => {
      if (userRoles.includes("Admin")) {
        fetchAdminReceipts();
      } else {
        fetchUserReceipts();
      }
    }); 
  
    const indexOfLastReceipt = currentPage * receiptsPerPage;
    const indexOfFirstReceipt = indexOfLastReceipt - receiptsPerPage;
    const currentReceipts = receipts.slice(
      indexOfFirstReceipt,
      indexOfLastReceipt
    );
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const handleView = (id) => {
      navigate(`/receipts/${id}`);
    };
  
    const handleDelete = async (id) => {
      try {
        await api.delete("/receipts", { data: { id } });
        console.log(`Deleted receipt with ID: ${id}`);
        if (userRoles.includes("Admin")) {
          fetchAdminReceipts();
        } else {
          fetchUserReceipts();
        }
      } catch (error) {
        console.error(`Error deleting receipt with ID ${id}:`, error);
      }
    };
  
    return (
      <>
        <Table variant="unstyled">
          <Thead>
            <Tr color="white" fontWeight="600" fontSize="sm">
              <Td>Receipt ID</Td>
              <Td>User</Td>
              <Td>Asset</Td>
              <Td>Date</Td>
              <Td>Quantity</Td>
              <Td>Status</Td>
              <Td>Action</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody color="beigeWord">
            {currentReceipts.map((receipt) => (
              <Tr key={receipt._id}>
                <Td>{receipt.receiptId}</Td>
                <Td>{receipt.userId?.username}</Td>
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
                <Td>{receipt.action}</Td>
                <Td>
                  <ButtonGroup spacing="4">
                    <Icon
                      cursor="pointer"
                      color="#624DE3"
                      as={IoSearchOutline}
                      boxSize="1.5em"
                      onClick={() => handleView(receipt._id)}
                    />
                    {userRoles.includes("Admin") && (
                      <Icon
                        cursor="pointer"
                        color="#A30D11"
                        as={MdOutlineDelete}
                        boxSize="1.5em"
                        onClick={() => handleDelete(receipt._id)}
                      />
                    )}
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* Pagination controls */}
        {receipts.length > receiptsPerPage && (
          <ButtonGroup mt={4} spacing="2" justifyContent="center">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              color="beigeWord"
              borderColor="beigeWord"
              variant="outline"
              _hover={{ bg: "#624DE3", color: "blackBg" }}
              bg={currentPage === 1 ? "transparent" : "#141432"}
              fontWeight="600"
              borderRadius="10px"
            >
              Previous
            </Button>
            {Array.from(
              { length: Math.ceil(receipts.length / receiptsPerPage) },
              (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  color="beigeWord"
                  borderColor="beigeWord"
                  variant="outline"
                  _hover={{ bg: "#624DE3", color: "blackBg" }}
                  bg={currentPage === i + 1 ? "#624DE3" : "#141432"}
                  fontWeight="600"
                  borderRadius="10px"
                >
                  {i + 1}
                </Button>
              )
            )}
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(receipts.length / receiptsPerPage)
              }
              color="beigeWord"
              borderColor="beigeWord"
              variant="outline"
              _hover={{ bg: "#624DE3", color: "blackBg" }}
              bg={
                currentPage === Math.ceil(receipts.length / receiptsPerPage)
                  ? "transparent"
                  : "#141432"
              }
              fontWeight="600"
              borderRadius="10px"
            >
              Next
            </Button>
          </ButtonGroup>
        )}
      </>
    );
  };
  
  export default ReceiptsInfoPage;
  