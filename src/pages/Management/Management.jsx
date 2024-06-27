import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import AssetsInfoPage from "../AssetsInfoPage/AssetsInfoPage";
import UsersInfoPage from "../UserInfoPage/UserInfoPage";
import LifeCycleInfoPage from "../LifeCycleInfoPage/LifeCycleInfoPage";
import ReceiptsInfoPage from "../ReceiptInfoPage/ReceiptInfoPage";
import FeedbackInfoPage from "../FeedbackInfoPage/FeedbackInfoPage";
import NewUserModal from "../../layout/NewUserModal";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import NewAssetModal from "../../layout/NewAssetModal";

const Management = ({ userID }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userRoles, setUserRoles] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUserData = Cookies.get("accessToken");
      if (storedUserData) {
        const decodedToken = jwtDecode(storedUserData);
        const roles = decodedToken.UserInfo.roles;
        setUserRoles(roles);
      }
    };

    fetchUserProfile();
  }, []);

  // Admin view
  const renderAdminView = () => (
    <Box w="100vw" p={4}>
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled">
        <Flex justifyContent="space-between">
          <TabList>
            <Tab
              mx="1em"
              borderRadius="xl"
              width="10vw"
              bg="transparent"
              color="beigeWord"
              border="1px"
              borderColor="beigeWord"
              _hover={{ bg: "redWord", color: "blackBg" }}
              _selected={{ bg: "redWord", color: "blackBg" }}
              fontWeight="600"
            >
              User
            </Tab>
            <Tab
              mr="1em"
              borderRadius="xl"
              width="10vw"
              bg="transparent"
              color="beigeWord"
              border="1px"
              borderColor="beigeWord"
              _hover={{ bg: "redWord", color: "blackBg" }}
              _selected={{ bg: "redWord", color: "blackBg" }}
              fontWeight="600"
            >
              LifeCycle
            </Tab>
            <Tab
              mr="1em"
              borderRadius="xl"
              width="10vw"
              bg="transparent"
              color="beigeWord"
              border="1px"
              borderColor="beigeWord"
              _hover={{ bg: "redWord", color: "blackBg" }}
              _selected={{ bg: "redWord", color: "blackBg" }}
              fontWeight="600"
            >
              FeedBack
            </Tab>
            <Tab
              mr="1em"
              borderRadius="xl"
              width="10vw"
              bg="transparent"
              color="beigeWord"
              border="1px"
              borderColor="beigeWord"
              _hover={{ bg: "redWord", color: "blackBg" }}
              _selected={{ bg: "redWord", color: "blackBg" }}
              fontWeight="600"
            >
              Assets
            </Tab>
            <Tab
              width="10vw"
              borderRadius="xl"
              bg="transparent"
              color="beigeWord"
              border="1px"
              borderColor="beigeWord"
              _hover={{ bg: "redWord", color: "blackBg" }}
              _selected={{ bg: "redWord", color: "blackBg" }}
              fontWeight="600"
            >
              Receipts
            </Tab>
          </TabList>
          <Button
            colorScheme="purple"
            onClick={onOpen}
            mr="4%"
            mb={4}
            float="right"
          >
            {tabIndex === 3 ? "Create New Asset" : "Add New User"}
          </Button>
          {tabIndex === 3 ? (
            <NewAssetModal isOpen={isOpen} onClose={onClose} />
          ) : (
            <NewUserModal isOpen={isOpen} onClose={onClose} />
          )}
        </Flex>

        <TabPanels>
          <TabPanel>
            <Box p={4}>
              <UsersInfoPage navigate={navigate} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <LifeCycleInfoPage navigate={navigate} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <FeedbackInfoPage navigate={navigate} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <AssetsInfoPage navigate={navigate} />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <ReceiptsInfoPage
                navigate={navigate}
                userID={userID}
                userRoles={userRoles}
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );

  return userRoles.includes("Admin") ? renderAdminView() : null;
};

export default Management;
