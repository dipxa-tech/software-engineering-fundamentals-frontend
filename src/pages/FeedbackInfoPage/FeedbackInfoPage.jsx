import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Button,
    ButtonGroup,
    Icon,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { MdOutlineDelete } from "react-icons/md";
  import api from "../../api/api";
import { IoSearchOutline } from "react-icons/io5";
  
  const FeedbackInfoPage = ({ navigate }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 10;
  
    const fetchFeedbacks = async () => {
      try {
        const response = await api.get("/feedbacks");
        if (!response) {
          throw new Error("Failed to fetch feedbacks");
        }
        // Reverse the order of feedbacks fetched from API
        const reversedFeedbacks = response.data.reverse();
        setFeedbacks(reversedFeedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        // Handle error state or toast message
      }
    };
  
    useEffect(() => {
      fetchFeedbacks();
    }, []);
  
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbacks.slice(
      indexOfFirstFeedback,
      indexOfLastFeedback
    );
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const handleEdit = (id) => {
      navigate(`/feedbacks/${id}`);
    };
  
    const handleDelete = async (id) => {
      try {
        await api.delete(`/feedbacks`, { data: { id } });
        console.log(`Deleted feedback with ID: ${id}`);
        fetchFeedbacks();
      } catch (error) {
        console.error(`Error deleting feedback with ID ${id}:`, error);
      }
    };
  
    return (
      <>
        <Table variant="unstyled">
          <Thead>
            <Tr color="white" fontWeight="600" fontSize="sm">
              <Td>Username</Td>
              <Td>Email</Td>
              <Td>Message</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody color="beigeWord">
            {currentFeedbacks.map((feedback) => (
              <Tr key={feedback._id}>
                <Td>{feedback.username}</Td>
                <Td>{feedback.email}</Td>
                <Td>{feedback.message}</Td>
                <Td>
                  <ButtonGroup spacing="4">
                    <Icon
                      cursor="pointer"
                      color="#624DE3"
                      as={IoSearchOutline}
                      boxSize="1.5em"
                      onClick={() => handleEdit(feedback._id)}
                    />
                    <Icon
                      cursor="pointer"
                      color="#A30D11"
                      as={MdOutlineDelete}
                      boxSize="1.5em"
                      onClick={() => handleDelete(feedback._id)}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* Pagination controls */}
        {feedbacks.length > feedbacksPerPage && (
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
              { length: Math.ceil(feedbacks.length / feedbacksPerPage) },
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
              disabled={currentPage === Math.ceil(feedbacks.length / feedbacksPerPage)}
              color="beigeWord"
              borderColor="beigeWord"
              variant="outline"
              _hover={{ bg: "#624DE3", color: "blackBg" }}
              bg={
                currentPage === Math.ceil(feedbacks.length / feedbacksPerPage)
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
  
  export default FeedbackInfoPage;
  