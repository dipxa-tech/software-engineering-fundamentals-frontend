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
    Select,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import api from "../api/api";
  
  const AddUserModal = ({ isOpen, onClose }) => {
    const [newUser, setNewUser] = useState({
      username: "",
      email: "",
      fullname: "",
      phone_number: "",
      address: "",
      roles: ["User"],
      profile: "https://picsum.photos/200",
      password: "admin"
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUser({
        ...newUser,
        [name]: value,
      });
    };
  
    const handleRoleChange = (e) => {
      const { value } = e.target;
      setNewUser({
        ...newUser,
        roles: [value],
      });
    };
  
    const handleAddUser = async () => {
      try {
        const response = await api.post("/createUser", newUser);
        if (response.status) {
          setNewUser({
            username: "",
            email: "",
            fullname: "",
            phone_number: "",
            address: "",
            roles: ["User"],
            profile: "https://picsum.photos/200",
          });
          onClose();
        } else {
          console.error("Failed to add user:", response);
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#222222">
          <ModalHeader color="white">Add New User</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel color="white">Username</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel color="white">Email</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel color="white">Full Name</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="text"
                name="fullname"
                value={newUser.fullname}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel color="white">Phone Number</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="tel"
                name="phone_number"
                value={newUser.phone_number}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel color="white">Address</FormLabel>
              <Input
                bg="#333333"
                color="white"
                type="text"
                name="address"
                value={newUser.address}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel color="white">Role</FormLabel>
              <Select
                bg="#333333"
                color="white"
                value={newUser.roles[0]}
                onChange={handleRoleChange}
              >
                <option style={{ backgroundColor: "#333333", color : "beigeWord" }} value="User">User</option>
                <option style={{ backgroundColor: "#333333", color : "beigeWord" }} value="Admin">Admin</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="redWord"
              color="white"
              mr={3}
              onClick={handleAddUser}
            >
              Add User
            </Button>
            <Button bg="redWord" color="white" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default AddUserModal;
  