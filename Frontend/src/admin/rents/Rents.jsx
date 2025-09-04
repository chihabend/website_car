import {
  TableContainer,
  Thead,
  Table,
  Tr,
  Th,
  Tbody,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Select,
  HStack,
  Text
} from "@chakra-ui/react";
import { SearchIcon, UpDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import axiosClient from "../../context/axiosClient";
import LoadingSpinner from "../../components/ui/loading-spinner";
import RentItem from "./RentItem";


const Rents = () => {
  const [rents, setrents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ascPrice , setAscPrice] = useState(false)
  const [ascReturnDate , setascReturnDate] = useState(false)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchrents = async () => {
      const { data } = await axiosClient.get("http://127.0.0.1:8000/api/rents");
      setLoading(false);
      setrents(data);
    };
    fetchrents();
  }, []);

  // Sort the data array in ascending/ descending order by total price
  useEffect(()=>{
       if (ascPrice) {
         const sortedData = [...rents].sort((a, b) => a.total - b.total);
         setrents(sortedData);
       } else {
         const sortedData = [...rents].sort((a, b) => b.total - a.total);
         setrents(sortedData);
       }
  },[ascPrice]) 
  
  // Sort the data array in ascending/ descending order by return date
  useEffect(() => {
    if (ascReturnDate) {
      const sortedData = [...rents].sort(
        (a, b) => new Date(a.return_date) - new Date(b.return_date)
      );
      setrents(sortedData);
    } else {
      const sortedData = [...rents].sort(
        (a, b) => new Date(b.return_date) - new Date(a.return_date)
      );
      setrents(sortedData);
    }
  }, [ascReturnDate]);

  useEffect(()=>{ setCurrentPage(1); }, [search])

  if (loading) return <LoadingSpinner />;

  const filtered = (rents||[]).filter(r =>
    r.brand.toLowerCase().includes(search) || r.firstname.toLowerCase().includes(search)
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, total);
  const pageItems = filtered.slice(startIndex, endIndex);

  return (
    <TableContainer p={10} maxH="70vh" overflowY="auto">
      <Flex justify="end" py={2} mb={4}>
        <InputGroup w="300px">
          <Input
            type="text"
            value={search}
            placeholder="Search for rents"
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Table variant="striped">
        <Thead position="sticky" top={0} zIndex={1} bg="white">
          <Tr>
            <Th>id</Th>
            <Th>photo</Th>
            <Th>brand</Th>
            <Th>price</Th>
            <Th>firstname</Th>
            <Th>telephone</Th>
            <Th>rental date</Th>
            <Th>
              return date
              <IconButton
                ml={2}
                aria-label="order_price"
                icon={<UpDownIcon />}
                onClick={() => setascReturnDate(!ascReturnDate)}
              />
            </Th>
            <Th>
              total
              <IconButton
                ml={2}
                aria-label="order_price"
                icon={<UpDownIcon />}
                onClick={() => setAscPrice(!ascPrice)}
              />
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pageItems && pageItems.map((rent) => (
            <RentItem
              rent={rent}
              key={rent.id}
              rents={rents}
              setrents={setrents}
            />
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
};

export default Rents;
