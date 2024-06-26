import { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const Management = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Box w="100vw" p={4}>
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled">
        <TabList>
          <Tab
            mx="1vh"
            borderRadius="xl"
            width="10vh"
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
            mr="1vh"
            borderRadius="xl"
            width="10vh"
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
            mr="1vh"
            borderRadius="xl"
            width="10vh"
            bg="transparent"
            color="beigeWord"
            border="1px"
            borderColor="beigeWord"
            _hover={{ bg: "redWord", color: "blackBg" }}
            _selected={{ bg: "redWord", color: "blackBg" }}
            fontWeight="600"
          >
            Maintenance
          </Tab>
          <Tab
            mr="1vh"
            borderRadius="xl"
            width="10vh"
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
            mr="1vh"
            borderRadius="xl"
            width="10vh"
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
            width="10vh"
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
              <Table variant="unstyled">
                <Thead>
                  <Tr>
                    <Th>Header 1</Th>
                    <Th>Header 2</Th>
                    <Th>Header 3</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Data 1</Td>
                    <Td>Data 2</Td>
                    <Td>Data 3</Td>
                  </Tr>
                  <Tr>
                    <Td>Data 4</Td>
                    <Td>Data 5</Td>
                    <Td>Data 6</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <Table variant="unstyled">
                <Thead>
                  <Tr>
                    <Th>Header A</Th>
                    <Th>Header B</Th>
                    <Th>Header C</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Data A1</Td>
                    <Td>Data B1</Td>
                    <Td>Data C1</Td>
                  </Tr>
                  <Tr>
                    <Td>Data A2</Td>
                    <Td>Data B2</Td>
                    <Td>Data C2</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box p={4}>
              <Table variant="unstyled">
                <Thead>
                  <Tr>
                    <Th>Header X</Th>
                    <Th>Header Y</Th>
                    <Th>Header Z</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Data X1</Td>
                    <Td>Data Y1</Td>
                    <Td>Data Z1</Td>
                  </Tr>
                  <Tr>
                    <Td>Data X2</Td>
                    <Td>Data Y2</Td>
                    <Td>Data Z2</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Management;
