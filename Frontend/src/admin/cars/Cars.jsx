import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Button,
  Flex, Input, InputGroup, InputRightElement, Select, HStack, Text
} from "@chakra-ui/react";
import { SearchIcon,AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axiosClient from "../../context/axiosClient";
import LoadingSpinner from "../../components/ui/loading-spinner";
import CarItem from "./CarItem";
import AddCar from "./AddCar";
import Swal from "sweetalert2";


const Cars = () => {

  const [cars, setcars] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isOpen, setisOpen] = useState(false)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(()=>{
    const fetchcars = async ()=>{
      const { data } = await axiosClient.get('http://127.0.0.1:8000/api/cars')
      setLoading(false)
      setcars(data.data)
    }
    fetchcars()
  },[])

  useEffect(()=>{ setCurrentPage(1); }, [search])

  
  const deleteCar = async (id) => {
     Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to get this user back",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!",
     }).then(async (result) => {
       if (result.isConfirmed) {
         try {
           await axiosClient.delete(`http://localhost:8000/api/cars/${id}`);
           setcars(cars.filter((car) => car.id !== id));
           Swal.fire("Deleted!", "", "success");
         } catch (e) {
           console.error(e);
         }
       }
     });
   
  };



  if (loading)  return  <LoadingSpinner />

  const filtered = (cars || []).filter(c => c.brand.toLowerCase().includes(search));
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, total);
  const pageItems = filtered.slice(startIndex, endIndex);
  
  return (
    <TableContainer p={10} maxH="70vh" overflowY="auto">
      <Flex justify="space-between" py={2} mb={4}>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          onClick={() => setisOpen(true)}
        >
          Add car
        </Button>
        <InputGroup w="300px">
          <Input
            type="text"
            value={search}
            placeholder="Search for cars"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </Flex>

      <AddCar
        isOpen={isOpen}
        setisOpen={setisOpen}
        cars={cars}
        setcars={setcars}
      />

      <Table variant="striped">
        <Thead position="sticky" top={0} zIndex={1} bg="white">
          <Tr>
            <Th>Id</Th>
            <Th>Photo</Th>
            <Th>brand</Th>
            <Th>category</Th>
            <Th>model</Th>
            <Th>gearbox</Th>
            <Th>type</Th>
            <Th>price</Th>
            <Th>availability</Th>
            <Th>operations</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pageItems &&
            pageItems
              .map((car) => (
                <CarItem car={car} key={car.id} deleteCar={deleteCar} cars={cars} setcars={setcars} />
              ))}
        </Tbody>
      </Table>

      <HStack mt={4} justify="space-between" flexWrap="wrap" gap={3}>
        <Text color="gray.600">
          Showing {total === 0 ? 0 : startIndex + 1}-{endIndex} of {total}
        </Text>
        <HStack>
          <Text fontSize="sm" color="gray.600">Rows per page</Text>
          <Select size="sm" value={rowsPerPage} onChange={e => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
            {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
          </Select>
          <Button size="sm" onClick={()=> setCurrentPage(p=> Math.max(1, p-1))} isDisabled={currentPage===1}>
            Prev
          </Button>
          <Text fontSize="sm" color="gray.600">{currentPage}/{totalPages}</Text>
          <Button size="sm" onClick={()=> setCurrentPage(p=> Math.min(totalPages, p+1))} isDisabled={currentPage===totalPages}>
            Next
          </Button>
        </HStack>
      </HStack>
    </TableContainer>
  );
}

export default Cars