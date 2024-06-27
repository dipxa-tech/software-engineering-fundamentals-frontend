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

const EditFeedback = () => {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({
    username: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await api.get(`/feedbacks/${id}`);
        if (!response.data) {
          throw new Error("Feedback not found");
        }
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        toast({
          title: "Error fetching feedback",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchFeedback();
  }, [id, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/feedbacks/${id}`, feedback);
      toast({
        title: "Feedback updated",
        description: "Feedback details have been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/management");
    } catch (error) {
      console.error("Error updating feedback:", error);
      toast({
        title: "Error updating feedback",
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
          Edit Feedback
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel color="white">Username</FormLabel>
            <Input
              bg="#222222"
              color="beigeWord"
              type="text"
              name="username"
              value={feedback.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel color="white">Email</FormLabel>
            <Input
              bg="#222222"
              color="beigeWord"
              type="email"
              name="email"
              value={feedback.email}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel color="white">Message</FormLabel>
            <Input
              bg="#222222"
              color="beigeWord"
              as="textarea"
              name="message"
              value={feedback.message}
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
              Update Feedback
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
              onClick={() => navigate("/feedbacks")}
            >
              Cancel
            </Button>
          </HStack>
        </form>
      </Box>
    </Flex>
  );
};

export default EditFeedback;
