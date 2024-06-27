import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import api from "../api/api";
  
  const NewAssetModal = ({ isOpen, onClose }) => {
    const [newAsset, setNewAsset] = useState({
      genre: "",
      date: "",
      description: "",
      amount: "",
      status: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewAsset({
        ...newAsset,
        [name]: value,
      });
    };
  
    const handleAddAsset = async () => {
      try {
        const response = await api.post("/assets", newAsset);
        if (response.status === 201) {
          setNewAsset({
            genre: "",
            date: "",
            description: "",
            amount: "",
            status: "",
          });
          onClose();
        } else {
          console.error("Failed to add asset:", response);
        }
      } catch (error) {
        console.error("Error adding asset:", error);
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#222222" color="white">
          <ModalHeader>Add New Asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Genre</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="text"
                name="genre"
                value={newAsset.genre}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Date</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="date"
                name="date"
                value={newAsset.date}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Textarea
                bg="#333333"
                color="white"
                name="description"
                value={newAsset.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Amount</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="number"
                name="amount"
                value={newAsset.amount}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Status</FormLabel>
              <Select
                bg="#333333"
                color="white"
                value={newAsset.status}
                name="status"
                onChange={handleInputChange}
              >
                <option style={{ backgroundColor: "#333333" }} value="Available">Available</option>
                <option style={{ backgroundColor: "#333333" }} value="Maintenance">Maintenance</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bg="redWord" color="white" mr={3} onClick={handleAddAsset}>
              Add Asset
            </Button>
            <Button bg="redWord" color="white" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default NewAssetModal;
  