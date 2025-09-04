import { Box, Heading, HStack, Icon, useColorModeValue, Badge, useToast, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, Text, Flex, Input, InputGroup, InputRightElement, TableContainer, Thead, Table, Tr, Th, Td, Tbody, IconButton, Button, Select } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axiosClient from "../../context/axiosClient";
import LoadingSpinner from "../../components/ui/loading-spinner";
import Swal from "sweetalert2"
import { FaUsers, FaTrashAlt } from "react-icons/fa";




const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const headerBg = "#111";
  const headerColor = "white";
  const headingColor = headerColor;
  const inputBg = useColorModeValue("white", "gray.800");
  const inputBorder = useColorModeValue("gray.300", "gray.600");
  const tableBg = useColorModeValue("white", "gray.900");
  const theadBg = headerBg;
  const thColor = headerColor;
  const trHover = useColorModeValue("gray.50", "gray.700");


  useEffect(()=>{
    const fetchUsers = async ()=>{
      const { data } = await axiosClient.get('http://127.0.0.1:8000/api/users')
      setLoading(false)
      setUsers(data)
    }
    fetchUsers()
  },[])

  useEffect(()=>{ setCurrentPage(1); }, [search])


  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    onOpen();
  };
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await axiosClient.delete(`http://127.0.0.1:8000/api/users/${userToDelete.id}`);
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      toast({ title: "Utilisateur supprimé", status: "success", duration: 3000, isClosable: true });
    } catch (e) {
      toast({ title: "Erreur lors de la suppression", status: "error", duration: 3000, isClosable: true });
    }
    setUserToDelete(null);
    onClose();
  };


  if (loading)  return  <LoadingSpinner />

  // Filtering + pagination calculations
  const filtered = (users || []).filter(u =>
    u.firstname.toLowerCase().includes(search) || u.lastname.toLowerCase().includes(search)
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, total);
  const pageItems = filtered.slice(startIndex, endIndex);

  return (
    <Box maxW="1200px" mx="auto" py={8} px={[2, 4, 8]}>
      <HStack mb={8} spacing={4} align="center" bg={headerBg} borderRadius="lg" px={6} py={5} boxShadow="md">
        <Icon as={FaUsers} boxSize={8} color="red.500" />
        <Heading size="lg" color={headingColor} letterSpacing="wide">Gestion des utilisateurs</Heading>
      </HStack>
      <Flex justify="flex-end" py={2} mb={4}>
        <InputGroup w="350px" shadow="sm">
          <Input
            type="text"
            value={search}
            placeholder="Rechercher un utilisateur..."
            bg={inputBg}
            borderColor={inputBorder}
            onChange={(e)=> setSearch(e.target.value.toLocaleLowerCase())}
            _focus={{ borderColor: "red.500", boxShadow: "0 0 0 1px #e53e3e" }}
          />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <TableContainer borderRadius="lg" shadow="md" bg={tableBg} maxH="70vh" overflowY="auto">
        <Table variant="simple" size="md">
          <Thead bg={theadBg} position="sticky" top={0} zIndex={1}>
            <Tr>
              <Th color={thColor}>Id</Th>
              <Th color={thColor}>Prénom</Th>
              <Th color={thColor}>Nom</Th>
              <Th color={thColor}>Email</Th>
              <Th color={thColor}>Téléphone</Th>
              <Th color={thColor}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageItems.map((user) => (
              <Tr key={user.id} _hover={{ bg: trHover }}>
                <Td><Badge colorScheme="red" px={2}>{user.id}</Badge></Td>
                <Td>{user.firstname}</Td>
                <Td>{user.lastname}</Td>
                <Td><Text fontSize="sm" color="gray.600">{user.email}</Text></Td>
                <Td><Text fontSize="sm" color="gray.600">{user.telephone}</Text></Td>
                <Td>
                  <Tooltip label="Supprimer" hasArrow>
                    <IconButton
                      aria-label="Supprimer"
                      icon={<FaTrashAlt />}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      rounded="full"
                      onClick={() => handleDeleteClick(user)}
                    />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <HStack mt={4} justify="space-between" flexWrap="wrap" gap={3}>
        <Text color="gray.600">
          Affichage {total === 0 ? 0 : startIndex + 1}-{endIndex} sur {total}
        </Text>
        <HStack>
          <Text fontSize="sm" color="gray.600">Lignes par page</Text>
          <Select size="sm" value={rowsPerPage} onChange={e => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
            {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
          </Select>
          <Button size="sm" onClick={()=> setCurrentPage(p=> Math.max(1, p-1))} isDisabled={currentPage===1}>
            Précédent
          </Button>
          <Text fontSize="sm" color="gray.600">{currentPage}/{totalPages}</Text>
          <Button size="sm" onClick={()=> setCurrentPage(p=> Math.min(totalPages, p+1))} isDisabled={currentPage===totalPages}>
            Suivant
          </Button>
        </HStack>
      </HStack>

      {/* Modal de confirmation de suppression */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmer la suppression</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer l'utilisateur <b>{userToDelete?.firstname} {userToDelete?.lastname}</b> ? Cette action est irréversible.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>Supprimer</Button>
            <Button variant="ghost" onClick={onClose}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Users