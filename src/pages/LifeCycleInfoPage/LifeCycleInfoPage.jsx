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

const LifecycleInfoPage = ({ navigate }) => {
  const [lifecycleRecords, setLifecycleRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Fetch lifecycle records from API
  const fetchLifecycleRecords = async () => {
    try {
      const response = await api.get("/lifecycles");
      if (!response || !response.data) {
        throw new Error("Failed to fetch lifecycle records");
      }
      // Reverse the order of lifecycle records fetched from API
      const reversedRecords = response.data.reverse();
      setLifecycleRecords(reversedRecords);
    } catch (error) {
      console.error("Error fetching lifecycle records:", error);
      // Handle error state or toast message
    }
  };

  useEffect(() => {
    fetchLifecycleRecords();
  }, []); // Run once on component mount

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = lifecycleRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (id) => {
    navigate(`/lifecycles/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/lifecycles`, { data: { id } });
      // Refetch lifecycle records after deletion
      fetchLifecycleRecords();
      console.log(`Deleted lifecycle record with ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting lifecycle record with ID ${id}:`, error);
    }
  };

  return (
    <>
      <Table variant="unstyled">
        <Thead>
          <Tr color="white" fontWeight="600" fontSize="sm">
            <Td>Tracking ID</Td>
            <Td>Product</Td>
            <Td>Customer</Td>
            <Td>Date Created</Td>
            <Td>Quantity</Td>
            <Td>Status</Td>
            <Td>Action</Td>
            <Td>Information</Td>
            <Td>Actions</Td>
          </Tr>
        </Thead>
        <Tbody color="beigeWord">
          {currentRecords.map((record) => (
            <Tr key={record._id}>
              <Td>{record.trackingId}</Td>
              <Td>{record.product.join(", ")}</Td>
              <Td>{record.customer ? record.customer.username : "Unknown"}</Td>
              <Td>{new Date(record.dateCreated).toLocaleDateString()}</Td>
              <Td>{record.quantity}</Td>
              <Td>
                <Badge
                  px="15%"
                  py="5%"
                  borderRadius="xl"
                  colorScheme={
                    record.status === "Delivered"
                      ? "green"
                      : record.status === "Rejected"
                      ? "red"
                      : record.status === "Returned"
                      ? "blue"
                      : "orange"
                  }
                >
                  {record.status}
                </Badge>
              </Td>
              <Td>{record.action}</Td>
              <Td>{record.others}</Td>
              <Td>
                <ButtonGroup spacing="4">
                  <Icon
                    cursor="pointer"
                    color="#624DE3"
                    as={IoSearchOutline}
                    boxSize="1.5em"
                    onClick={() => handleEdit(record._id)}
                  />
                  <Icon
                    cursor="pointer"
                    color="#A30D11"
                    as={MdOutlineDelete}
                    boxSize="1.5em"
                    onClick={() => handleDelete(record._id)}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Pagination controls */}
      {lifecycleRecords.length > recordsPerPage && (
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
            { length: Math.ceil(lifecycleRecords.length / recordsPerPage) },
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
            disabled={currentPage === Math.ceil(lifecycleRecords.length / recordsPerPage)}
            color="beigeWord"
            borderColor="beigeWord"
            variant="outline"
            _hover={{ bg: "#624DE3", color: "blackBg" }}
            bg={currentPage === Math.ceil(lifecycleRecords.length / recordsPerPage) ? "transparent" : "#141432"}
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

export default LifecycleInfoPage;
