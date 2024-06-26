import { useState, useEffect } from "react";
import {
  Breadcrumb,
  Textarea,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
  Avatar,
  Divider,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Flex,
  IconButton,
  Stack,
  HStack,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "../../api/api";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Profile({ profile, setProfile }) {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userData, setUserData] = useState({});
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [tempProfile, setTempProfile] = useState("");

  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [oldUsername, setOldUsername] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = Cookies.get("accessToken");
        if (storedUserData) {
          const decodedToken = jwtDecode(storedUserData);
          const userId = decodedToken.UserInfo._id;
          const response = await api.get(`/users/${userId}`);
          const userData = response.data;
          setUserData(userData);
          setUsername(userData.username || "");
          setOldUsername(userData.username || "");
          setFullName(userData.fullname || "");
          setPhoneNumber(userData.phone_number || "");
          setEmail(userData.email || "");
          setAddress(userData.address || "");
          setRoles(userData.roles || []);
          setProfile(userData.profile || "");
          setTempProfile(userData.profile || "");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
  }, []);
  const handleClick = (passType) => {
    if (passType === "old") {
      setShowOldPass(!showOldPass);
    } else if (passType === "new") {
      setShowNewPass(!showNewPass);
    } else if (passType === "confirm") {
      setShowConfirmPass(!showConfirmPass);
    }
  };

  const handleProfileSave = async () => {
    setProfile(tempProfile);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Prepare updateData with the fields you want to update
    const id = userData._id;
    let updateData = {
      id: id,
      username,
      fullname,
      phone_number,
      address,
      email,
      profile,
      roles,
    };

    try {
      // Only authenticate if the old password input is not empty
      if (oldPassword) {
        // Make an API request to authenticate the user with the old password
        const response = await api.post("/auth", {
          username: oldUsername,
          password: oldPassword,
        });

        // If the old password is incorrect, the API should return an error
        if (response.error) {
          console.error("Old password is incorrect.");
          return;
        }

        // Check if the new password and the confirmation password match
        if (password === secondPassword) {
          updateData = { ...updateData, password };
        } else {
          console.error("New passwords do not match.");
          throw new Error("New passwords do not match.");
        }
      }

      // Update user data in the database
      await api.patch(`/users`, updateData);

      // // Make a new API request to get updated user data after patching
      // const response = await api.get(`/users/${id}`);
      // setUserData(response.data);

      const signUpResponse = await api.post("/auth", {
        username: updateData.username,
        password: password,
      });

      const { accessToken } = signUpResponse.data;

      // Check if the accessToken already exists in Cookies
      if (Cookies.get("accessToken")) {
        // If accessToken already exists, update it
        Cookies.set("accessToken", accessToken, { expires: 1 });
      } else {
        Cookies.set("accessToken", accessToken, { expires: 1 });
      }

      navigate("/");

      toast({
        title: "User Info Updated.",
        description: "Changes Saved.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error saving new changes:", error);
    }
  };

  const handleDiscard = () => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setAddress("");
    setOldPassword("");
    setPassword("");
    setSecondPassword("");
  };

  return (
    <Box w="100vw">
      <Box display="flex" justifyContent="center" w="60%" mb="1%">
        <Flex justifyContent="space-between" w="60%">
          <Breadcrumb separator="/" fontSize="2xl" fontWeight="600">
            <BreadcrumbItem isCurrentPage color="beigeWord">
              <BreadcrumbLink>User</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage color="redWord">
              <BreadcrumbLink>Profile</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
      <form onSubmit={handleSave}>
        <Box display="flex" justifyContent="center">
          <Flex justifyContent="space-between" w="60%">
            <Box>
              <Text fontSize="lg" fontWeight="600" color="beigeWord">
                Avatar
              </Text>
              <Divider margin="5px 0" color="beigeWord" />
              <Box>
                <Tooltip label="Edit" placement="right">
                  <Avatar size="2xl" src={profile} onClick={onOpen} />
                </Tooltip>
                <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                  <ModalOverlay />
                  <ModalContent bg="#222222">
                    <ModalHeader color="white">Avatar Link</ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody>
                      <Input
                        border="1px"
                        borderColor="beigeWord"
                        size="lg"
                        borderRadius="10px"
                        color="white"
                        value={tempProfile}
                        onChange={(e) => setTempProfile(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        bg="redWord"
                        mr={3}
                        onClick={() => {
                          handleProfileSave();
                          onClose();
                        }}
                      >
                        Replace
                      </Button>
                      <Button bg="redWord" onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
              <Text fontSize="lg" fontWeight="600" mt="10vh" color="beigeWord">
                Password
              </Text>
              <Divider margin="5px 0" color="beigeWord" />
              <Stack mt="10px">
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Old password
                </Text>
                <InputGroup>
                  <Input
                    background="#333333"
                    color="beigeWord"
                    border="none"
                    type={showOldPass ? "text" : "password"}
                    size="lg"
                    borderRadius="10px"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <InputRightElement marginTop="5px">
                    {showOldPass ? (
                      <IconButton
                        icon={<ViewOffIcon color="white" />}
                        onClick={() => handleClick("old")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    ) : (
                      <IconButton
                        icon={<ViewIcon color="white" />}
                        onClick={() => handleClick("old")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack mt="10px">
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  New password
                </Text>
                <InputGroup>
                  <Input
                    background="#333333"
                    color="beigeWord"
                    border="none"
                    type={showNewPass ? "text" : "password"}
                    size="lg"
                    borderRadius="10px"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement marginTop="5px">
                    {showNewPass ? (
                      <IconButton
                        icon={<ViewOffIcon color="white" />}
                        onClick={() => handleClick("new")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    ) : (
                      <IconButton
                        icon={<ViewIcon color="white" />}
                        onClick={() => handleClick("new")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack mt="10px">
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Confirm new password
                </Text>
                <InputGroup>
                  <Input
                    background="#333333"
                    color="beigeWord"
                    border="none"
                    type={showConfirmPass ? "text" : "password"}
                    size="lg"
                    borderRadius="10px"
                    value={secondPassword}
                    onChange={(e) => setSecondPassword(e.target.value)}
                  />
                  <InputRightElement marginTop="5px">
                    {showConfirmPass ? (
                      <IconButton
                        icon={<ViewOffIcon color="white" />}
                        onClick={() => handleClick("confirm")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    ) : (
                      <IconButton
                        icon={<ViewIcon color="white" />}
                        onClick={() => handleClick("confirm")}
                        style={{ backgroundColor: "transparent" }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <HStack mt="4vh">
                <Button
                  bg="transparent"
                  color="beigeWord"
                  border="1px"
                  borderColor="beigeWord"
                  width="20vh"
                  _hover={{ bg: "redWord", color: "blackBg" }}
                  fontWeight="600"
                  borderRadius="10px"
                  type="submit"
                >
                  Save changes
                </Button>
                <Button
                  color="beigeWord"
                  borderColor="beigeWord"
                  variant="outline"
                  width="15vh"
                  _hover={{
                    bg: "redWord",
                    color: "blackBg",
                  }}
                  fontWeight="600"
                  borderRadius="10px"
                  onClick={handleDiscard}
                >
                  Discard
                </Button>
              </HStack>
            </Box>
            <Box className="internal-box">
              <Text fontSize="lg" fontWeight="600" color="beigeWord">
                User info
              </Text>
              <Divider margin="5px 0" color="beigeWord" />
              <HStack>
                <Stack>
                  <Text
                    marginTop="5px"
                    color="grey"
                    fontSize="small"
                    fontWeight="600"
                  >
                    Full Name
                  </Text>
                  <Input
                    type="text"
                    color="beigeWord"
                    background="#333333"
                    border="none"
                    size="lg"
                    borderRadius="10px"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Stack>
                <Stack>
                  <Text
                    marginTop="5px"
                    color="grey"
                    fontSize="small"
                    fontWeight="600"
                  >
                    Username
                  </Text>
                  <Input
                    background="#333333"
                    color="beigeWord"
                    border="none"
                    size="lg"
                    borderRadius="10px"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Stack>
              </HStack>
              <Stack>
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Contact
                </Text>
                <Input
                  background="#333333"
                  color="beigeWord"
                  border="none"
                  size="lg"
                  borderRadius="10px"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Stack>
              <Stack>
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Email Address
                </Text>
                <Input
                  type="email"
                  background="#333333"
                  color="beigeWord"
                  border="none"
                  size="lg"
                  borderRadius="10px"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Stack>
              <Stack>
                <Text
                  marginTop="5px"
                  color="grey"
                  fontSize="small"
                  fontWeight="600"
                >
                  Residency Address
                </Text>
                <Textarea
                  background="#333333"
                  color="beigeWord"
                  border="none"
                  size="lg"
                  borderRadius="10px"
                  height="150px"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Stack>
            </Box>
          </Flex>
        </Box>
      </form>
    </Box>
  );
}
