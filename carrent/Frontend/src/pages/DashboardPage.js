import {
  Box,
  Container,
  VStack,
  HStack,
  List,
  ListItem,
  Text,
  Icon,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { FaUsers, FaCar, FaClipboardList } from "react-icons/fa";
import { useStateContext } from "../context/ContextProvider";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import DashboardNav from "../components/navbar/DashboardNav";

function Dashboard() {
  const { adminToken } = useStateContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!adminToken) {
      return navigate("/admin/login");
    }
  }, []);

  // Palette du site (rouge)
  const sidebarBg = "#111";
  const sidebarColor = "white";
  const activeBg = "red.700";
  const activeColor = "white";
  const hoverBg = "red.500";
  const mainBg = useColorModeValue("gray.50", "gray.900");
  const dashboardContentBg = mainBg;
  const sidebarWidth = 220;

  const menu = [
    { label: "Utilisateurs", icon: FaUsers, path: "/dashboard" },
    { label: "Voitures", icon: FaCar, path: "/dashboard/cars" },
    { label: "Locations", icon: FaClipboardList, path: "/dashboard/rents" },
  ];

  return (
    <Box bg={mainBg} minH="100vh">
      <DashboardNav />
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        h="100vh"
        w={`${sidebarWidth}px`}
        bg={sidebarBg}
        color={sidebarColor}
        py={8}
        px={6}
        boxShadow="2xl"
        zIndex={100}
        display={["none", "flex"]}
        flexDirection="column"
        alignItems="stretch"
      >
        <Flex align="center" mb={8} justify={"center"}>
          <Icon as={FaCar} boxSize={8} color="white" mr={2} />
          <Text fontWeight="bold" fontSize="xl" display={["none", "block"]} letterSpacing="wide">
            Admin
          </Text>
        </Flex>
        <List spacing={2}>
          {menu.map((item) => {
            const isActive = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/dashboard");
            return (
              <ListItem
                key={item.label}
                display="flex"
                alignItems="center"
                px={3}
                py={3}
                borderRadius="md"
                cursor="pointer"
                fontWeight={isActive ? "bold" : "normal"}
                bg={isActive ? activeBg : "transparent"}
                color={isActive ? activeColor : sidebarColor}
                _hover={{ bg: hoverBg }}
                transition="all 0.2s"
                onClick={() => navigate(item.path)}
              >
                <Icon as={item.icon} boxSize={5} mr={3} color={isActive ? "white" : "whiteAlpha.800"} />
                <Text display={["none", "block"]}>{item.label}</Text>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box ml={[0, `${sidebarWidth}px`]} mt="64px" p={[2, 8]} bg={dashboardContentBg} minH="100vh">
        <Outlet />
      </Box>
    </Box>
  );
}
export default Dashboard;
