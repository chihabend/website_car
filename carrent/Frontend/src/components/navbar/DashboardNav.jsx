import { Box, Flex, Spacer, Button, Icon, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';
import axiosAdminClient from '../../context/axiosAdminClient';

const SIDEBAR_WIDTH = 220;
const NAVBAR_HEIGHT = 64;

function DashboardNav() {
  const { setAdminToken }  = useStateContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosAdminClient.post("http://127.0.0.1:8000/api/admin/logout");
      setAdminToken(null);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex
      as="nav"
      justifyContent="space-between"
      alignItems="center"
      bg="#111"
      p={4}
      color="white"
      boxShadow="md"
      minH={`${NAVBAR_HEIGHT}px`}
      position="fixed"
      top={0}
      left={`${SIDEBAR_WIDTH}px`}
      w={`calc(100% - ${SIDEBAR_WIDTH}px)`}
      zIndex={200}
    >
      <Box>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Text fontWeight="bold" fontSize="1.4rem" letterSpacing="wide" color="white">
            Dashboard
          </Text>
        </Link>
      </Box>
      <Spacer />
      <Button
        color="white"
        colorScheme="whiteAlpha"
        variant="ghost"
        leftIcon={<Icon as={MdLogout} color="white" boxSize={5} />}
        _hover={{ bg: "red.600", color: "white" }}
        onClick={handleLogout}
        fontWeight="bold"
        fontSize="md"
        px={5}
        borderRadius="md"
      >
        Logout
      </Button>
    </Flex>
  );
}

export default DashboardNav;
