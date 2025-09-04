import {
  Button,
  Heading,
  HStack,
  Image,
  Text,
  Box,
  Divider,
  SimpleGrid,
  GridItem,
  VStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaCar, FaCalendarAlt, FaTachometerAlt, FaGasPump, FaCog } from "react-icons/fa";

const CarCard = ({ props }) => {
  const navigate = useNavigate();
  
  return (
    <Box
      className="vehicle-card"
      position="relative"
      overflow="hidden"
      borderRadius="xl"
      bg="white"
      boxShadow="0 4px 20px rgba(0,0,0,0.1)"
      border="1px solid #f0f0f0"
      transition="all 0.3s ease"
      zIndex={0} // Ajouté pour stacking context
      _hover={{
        zIndex: 20, // Mettre la carte au-dessus des autres au hover
        transform: "translateY(-8px)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        bg: "linear-gradient(90deg, #dc2626, #b91c1c)",
        zIndex: 1
      }}
      role="group"
    >
      <div className="details">
        <div className="thumb-gallery">
          <Box bg="red.200" w="full" h="full" position="relative">
            <Image
              objectFit="cover"
              h={"215px"}
              w={"full"}
              borderTopRadius="xl"
              src={
                props.photo1
                  ? `http://localhost:8000/images/${props.photo1}`
                  : props.photo2
                  ? `http://localhost:8000/images/${props.photo2}`
                  : "/assets/images/default-car.jpg"
              }
              alt={`${props.brand} ${props.model}`}
            />
            {/* Overlay avec détails supplémentaires au hover */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="rgba(0,0,0,0.7)"
              opacity="0"
              transition="opacity 0.3s ease"
              _groupHover={{ opacity: 1 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={30} // Encore plus haut pour l'overlay
              pointerEvents="auto"
            >
              <VStack spacing={3} color="white" textAlign="center">
                <Icon as={FaCar} boxSize={8} color="red.400" />
                <Text fontSize="lg" fontWeight="bold">
                  {props.brand} {props.model}
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  {props.category} • {props.fuel_type}
                </Text>
                <Badge colorScheme="red" variant="solid" px={3} py={1}>
                  {props.available ? "Disponible" : "Non disponible"}
                </Badge>
              </VStack>
            </Box>
          </Box>
        </div>

        <Box p={4} borderColor="red">
          <HStack alignItems="baseline" spacing={"auto"}>
            <Heading size={"md"} fontWeight="600">
              {props.brand}
            </Heading>
            <Heading size={"sm"} fontWeight="600">
              {props.model}
            </Heading>
          </HStack>
          <HStack py={3}>
            <Heading size={"md"} fontWeight="600" color="gray.600">
              {props.price} MAD
            </Heading>
            <Text color="gray.400">/day</Text>
          </HStack>
          <Button 
            w="full" 
            backgroundColor="red" 
            color="white" 
            onClick={() => navigate(`/cars/${props.id}`)}
            _hover={{
              bg: "red.600",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)"
            }}
            transition="all 0.2s ease"
          >
            Rent now
          </Button>
          <Divider borderColor="red.300" py={3} />

          <SimpleGrid columns={3} py={4} textAlign="center">
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                Gearbox
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.gearbox}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                Type
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.fuel_type}
              </Text>
            </GridItem>
            <GridItem>
              <Heading fontWeight="400" color="gray.400" size="xs">
                Available
              </Heading>
              <Text fontWeight="500" color="gray.600">
                {props.available ? "yes" : "no"}
              </Text>
            </GridItem>
          </SimpleGrid>

          {/* Détails supplémentaires qui apparaissent au hover */}
          <Box
            mt={3}
            pt={3}
            borderTop="1px solid"
            borderColor="red.200"
            opacity="0"
            maxH="0"
            overflow="hidden"
            transition="all 0.3s ease"
            _groupHover={{
              opacity: 1,
              maxH: "200px"
            }}
          >
            <SimpleGrid columns={2} spacing={3} textAlign="center">
              <VStack spacing={1}>
                <Icon as={FaCalendarAlt} color="red.500" />
                <Text fontSize="xs" color="gray.500">Année</Text>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  {props.year || "2024"}
                </Text>
              </VStack>
              <VStack spacing={1}>
                <Icon as={FaTachometerAlt} color="red.500" />
                <Text fontSize="xs" color="gray.500">Puissance</Text>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  {props.power || "150"} ch
                </Text>
              </VStack>
            </SimpleGrid>
          </Box>

          <Divider borderColor="red.300" py={0} />
        </Box>
      </div>
    </Box>
  );
};

export default CarCard;

CarCard.defaultProps = {
  img1: "",
  img2: "",
  brand: "Default brand",
  model: "0000",
  price: "000",
  gearbox: "---",
  type: "---",
  available: "---",
};
