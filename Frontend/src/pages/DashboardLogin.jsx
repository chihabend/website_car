import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../context/axiosClient";
import { useNavigate } from "react-router-dom";

function DashboardLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setAdminToken } = useStateContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const admin = {
      username,
      password,
    };

    if (!admin.username || !admin.password) {
      return Swal.fire({
        icon: "error",
        title: "Fields are required",
      });
    }

    try {
      const { data } = await axiosClient.post(
        'http://127.0.0.1:8000/api/admin/login',
        admin
      );

      setAdminToken(data.admin_token);
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
      return Swal.fire({
        icon: "error",
        title: e.response.data.message,
      });
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.900">
      <Box
        width="400px"
        bg="gray.800"
        color="white"
        boxShadow="lg"
        rounded="md"
        p={6}
      >
        <Heading mb={6} textAlign="center" color="red.600">
          Admin Login
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl isRequired>
            <FormLabel>Admin username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              focusBorderColor="red.400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: "red.400" }}
              _focus={{ borderColor: "red.500" }}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              focusBorderColor="red.400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: "red.400" }}
              _focus={{ borderColor: "red.500" }}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="red"
            bg="red.600"
            width="full"
            mt={6}
            _hover={{ bg: "red.700" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default DashboardLogin;
