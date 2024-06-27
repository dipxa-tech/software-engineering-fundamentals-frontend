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
  import { IoSearchOutline } from "react-icons/io5";
  import { MdOutlineDelete } from "react-icons/md";
  import api from "../../api/api";
  
  const UsersInfoPage = ({ navigate }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
  
    // Fetch users from your API endpoint
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        if (!response) {
          throw new Error("Failed to fetch users");
        }
        // Reverse the order of users fetched from API
        const reversedUsers = response.data.reverse();
        setUsers(reversedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error state or toast message
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const renderRoles = (roles) => {
      return roles.join(", ");
    };
  
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const handleView = (id) => {
      navigate(`/users/${id}`);
    };
  
    const handleDelete = async (id) => {
      try {
        await api.delete(`/users`, { data: { id } });
        console.log(`Deleted user with ID: ${id}`);
        fetchUsers();
      } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
      }
    };
  
    return (
      <>
        <Table variant="unstyled">
          <Thead>
            <Tr color="white" fontWeight="600" fontSize="sm">
              <Td>Username</Td>
              <Td>Email</Td>
              <Td>Full Name</Td>
              <Td>Phone Number</Td>
              <Td>Role</Td>
              <Td>Address</Td>
              <Td>Actions</Td>
            </Tr>
          </Thead>
          <Tbody color="beigeWord">
            {currentUsers.map((user) => (
              <Tr key={user._id}>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>{user.fullname}</Td>
                <Td>{user.phone_number}</Td>
                <Td>
                  {user.roles && user.roles.length > 0 ? (
                    <Badge
                      px="15%"
                      py="5%"
                      borderRadius="xl"
                      colorScheme={
                        renderRoles(user.roles) === "Admin" ? "green" : "purple"
                      }
                    >
                      {renderRoles(user.roles)}
                    </Badge>
                  ) : (
                    <span>No Role</span>
                  )}
                </Td>
                <Td>{user.address}</Td>
                <Td>
                  <ButtonGroup spacing="4">
                    <Icon
                      cursor="pointer"
                      color="#624DE3"
                      as={IoSearchOutline}
                      boxSize="1.5em"
                      onClick={() => handleView(user._id)}
                    />
                    <Icon
                      cursor="pointer"
                      color="#A30D11"
                      as={MdOutlineDelete}
                      boxSize="1.5em"
                      onClick={() => handleDelete(user._id)}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {/* Pagination controls */}
        {users.length > usersPerPage && (
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
              { length: Math.ceil(users.length / usersPerPage) },
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
              disabled={currentPage === Math.ceil(users.length / usersPerPage)}
              color="beigeWord"
              borderColor="beigeWord"
              variant="outline"
              _hover={{ bg: "#624DE3", color: "blackBg" }}
              bg={
                currentPage === Math.ceil(users.length / usersPerPage)
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
  
  export default UsersInfoPage;
  