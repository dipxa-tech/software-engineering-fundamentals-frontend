import { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import AssetsInfoPage from "../AssetsInfoPage/AssetsInfoPage";
import UsersInfoPage from "../UserInfoPage/UserInfoPage";
import LifeCycleInfoPage from "../LifeCycleInfoPage/LifeCycleInfoPage";
import ReceiptsInfoPage from "../ReceiptInfoPage/ReceiptInfoPage";
import FeedbackInfoPage from "../FeedbackInfoPage/FeedbackInfoPage";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box w="100vw" p={4}>
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled">
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
            Reciepts
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box p={4}>
              <UsersInfoPage navigate={navigate}/>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <LifeCycleInfoPage navigate={navigate}/>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <FeedbackInfoPage navigate={navigate}/>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
                <AssetsInfoPage navigate={navigate}/>              
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <ReceiptsInfoPage navigate={navigate}/>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Management;
