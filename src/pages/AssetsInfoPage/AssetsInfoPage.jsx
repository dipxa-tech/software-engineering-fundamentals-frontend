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
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import api from "../../api/api";

const AssetsInfoPage = ({ navigate }) => {
  const [assets, setAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const assetsPerPage = 10;

  // Fetch assets from your API endpoint
  const fetchAssets = async () => {
    try {
      const response = await api.get("/assets");
      if (!response) {
        throw new Error("Failed to fetch assets");
      }
      // Reverse the order of assets fetched from API
      const reversedAssets = response.data.reverse();
      setAssets(reversedAssets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      // Handle error state or toast message
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  const indexOfLastAsset = currentPage * assetsPerPage;
  const indexOfFirstAsset = indexOfLastAsset - assetsPerPage;
  const currentAssets = assets.slice(indexOfFirstAsset, indexOfLastAsset);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (id) => {
    navigate(`/assets/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/assets`, { data: { id } });
      console.log(`Deleted assets with ID: ${id}`);
      fetchAssets();
    } catch (error) {
      console.error(`Error deleting assets with ID ${id}:`, error);
    }
  };

  const handleRefresh = () => {
    fetchAssets();
  };

  return (
    <>
    <Button onClick={handleRefresh} mb={4}>
          Refresh Assets
        </Button>
      <Table variant="unstyled">
        <Thead>
          <Tr color="white" fontWeight="600" fontSize="sm">
            <Td>ID</Td>
            <Td>Asset Type</Td>
            <Td>Date</Td>
            <Td>Amount</Td>
            <Td>Status</Td>
            <Td>Actions</Td>
          </Tr>
        </Thead>
        <Tbody color="beigeWord">
          {currentAssets.map((asset) => (
            <Tr key={asset._id}>
              <Td>{asset._id}</Td>
              <Td>{asset.genre}</Td>
              <Td>{formatDate(asset.date)}</Td>
              <Td>{asset.amount}</Td>
              <Td>
                <Badge
                  px="5%"
                  py="1%"
                  borderRadius="xl"
                  colorScheme={
                    asset.status === "Available" ? "green" : "purple"
                  }
                >
                  {asset.status}
                </Badge>
              </Td>
              <Td>
                <ButtonGroup spacing="4">
                  <Icon
                    cursor="pointer"
                    color="#624DE3"
                    as={FaRegEdit}
                    boxSize="1.5em"
                    onClick={() => handleEdit(asset._id)}
                  />
                  <Icon
                    cursor="pointer"
                    color="#A30D11"
                    as={MdOutlineDelete}
                    boxSize="1.5em"
                    onClick={() => handleDelete(asset._id)}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* Pagination controls */}
      {assets.length > assetsPerPage && (
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
            { length: Math.ceil(assets.length / assetsPerPage) },
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
              currentPage === Math.ceil(assets.length / assetsPerPage)
            }
            color="beigeWord"
            borderColor="beigeWord"
            variant="outline"
            _hover={{ bg: "#624DE3", color: "blackBg" }}
            bg={
              currentPage === Math.ceil(assets.length / assetsPerPage)
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

export default AssetsInfoPage;
