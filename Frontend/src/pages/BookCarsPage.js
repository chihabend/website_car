import React from "react";
import {
  Button,
  GridItem,
  HStack,
  SimpleGrid,
  VStack,
  Select,
  Box,
  Input,
  Flex,
  Text,
  Heading,
  Container,
  Icon,
  InputGroup,
  InputRightElement,
  Badge
} from "@chakra-ui/react";
import { FaSearch, FaFilter, FaTimes, FaWhatsapp, FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/ui/car-card";
import Footer from "../components/navbar/Footer";
import LoadingSpinner from "../components/ui/loading-spinner";
import { useStateContext } from "../context/ContextProvider";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

function BookCars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const { token } = useStateContext();

  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/cars', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCars(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, [token]);

  if (isLoading) return <LoadingSpinner />;

  const filteredCars = cars.filter(car => {
    return (
      (brandFilter === "" || car.category === brandFilter) &&
      (priceFilter === "" || car.price <= priceFilter)
    );
  });
  const uniqueCategories = [...new Set(cars.map(car => car.category))];

  // Regrouper les voitures filtrées par category (marque principale)
  const carsByCategory = {};
  filteredCars.forEach(car => {
    if (!carsByCategory[car.category]) carsByCategory[car.category] = [];
    carsByCategory[car.category].push(car);
  });

  return (
    <>
      {/* Hero Section */}
      <MotionBox
        className="animated-gradient-bg"
        color="white"
        py={16}
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        position="relative"
        overflow="hidden"
      >
        <style>{`
          .animated-gradient-bg {
            background: linear-gradient(270deg, #dc2626, #b91c1c, #000, #dc2626);
            background-size: 800% 800%;
            animation: gradientMove 12s ease-in-out infinite;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <Container maxW="1200px" textAlign="center">
          <Heading as="h1" size="2xl" mb={4} fontWeight="bold">
            Notre Collection Premium
          </Heading>
          <Text fontSize="xl" maxW="600px" mx="auto" opacity={0.9}>
            Découvrez notre sélection exclusive de véhicules haut de gamme pour tous vos besoins
          </Text>
        </Container>
      </MotionBox>

      {/* Filtres Section */}
      <MotionBox py={8} bg="white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1200px">
          <Box
            bg="white"
            p={[4, 8]}
            borderRadius="2xl"
            boxShadow="0 8px 32px rgba(220,38,38,0.08)"
            border="1px solid #f3f3f3"
            mb={8}
          >
            <Flex direction={["column", "row"]} align="center" justify="space-between" mb={6} gap={4}>
              <HStack spacing={3} mb={[4, 0]}>
                <Badge colorScheme="red" px={3} py={2} borderRadius="full" fontSize="md" fontWeight="bold">
                  <Icon as={FaFilter} color="red.500" mr={2} />
                  Filtres
                </Badge>
              </HStack>
              <Text fontSize="md" color="gray.600">
                {filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''} trouvé{filteredCars.length > 1 ? 's' : ''}
              </Text>
            </Flex>
            <SimpleGrid columns={[1, 3]} spacing={6}>
              <VStack align="start" spacing={2} w="full">
                <Text fontWeight="semibold" color="gray.700" mb={1}>
                  <Icon as={FaCar} color="red.400" mr={2} />Marque
                </Text>
                <Select
                  onChange={(e) => setBrandFilter(e.target.value)}
                  bg="gray.50"
                  borderColor="red.200"
                  _focus={{ borderColor: "red.400", boxShadow: "0 0 0 2px #dc2626" }}
                  borderRadius="full"
                  fontWeight="bold"
                  size="lg"
                  value={brandFilter}
                >
                  <option value="">Toutes les marques</option>
                  {uniqueCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </Select>
              </VStack>
              <VStack align="start" spacing={2} w="full">
                <Text fontWeight="semibold" color="gray.700" mb={1}>
                  <Icon as={FaSearch} color="red.400" mr={2} />Prix maximum
                </Text>
                <InputGroup>
                  <Input
                    placeholder="Prix max"
                    type="number"
                    onChange={(e) => setPriceFilter(e.target.value)}
                    value={priceFilter}
                    bg="gray.50"
                    borderColor="red.200"
                    _focus={{ borderColor: "red.400", boxShadow: "0 0 0 2px #dc2626" }}
                    borderRadius="full"
                    size="lg"
                    fontWeight="bold"
                  />
                  <InputRightElement>
                    <Icon as={FaSearch} color="gray.400" />
                  </InputRightElement>
                </InputGroup>
              </VStack>
              <VStack align="start" spacing={2} w="full">
                <Text fontWeight="semibold" color="gray.700" mb={1}>
                  <Icon as={FaTimes} color="red.400" mr={2} />Actions
                </Text>
                <Button
                  onClick={() => { setBrandFilter(""); setPriceFilter(""); }}
                  colorScheme="red"
                  variant="solid"
                  leftIcon={<FaTimes />}
                  borderRadius="full"
                  size="lg"
                  fontWeight="bold"
                  w="full"
                  _hover={{ bg: "red.600", color: "white" }}
                >
                  Réinitialiser
                </Button>
              </VStack>
            </SimpleGrid>
          </Box>
        </Container>
      </MotionBox>

      {/* Voitures Grid */}
      <MotionBox py={12} bg="gray.50" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1400px">
          {filteredCars.length === 0 ? (
            <VStack spacing={6} py={16}>
              <Icon as={FaSearch} boxSize={16} color="gray.400" />
              <Heading as="h3" size="lg" color="gray.600">
                Aucun véhicule trouvé
              </Heading>
              <Text color="gray.500" textAlign="center">
                Essayez de modifier vos critères de recherche
              </Text>
              <Button 
                onClick={() => { setBrandFilter(""); setPriceFilter(""); }} 
                colorScheme="red"
                borderRadius="full"
                px={8}
              >
                Voir tous les véhicules
              </Button>
            </VStack>
          ) : (
            <>
              {/* Header de la section */}
              <VStack spacing={4} mb={12} textAlign="center">
                <Heading as="h2" size="xl" color="red.600" letterSpacing="wide">
                  Nos Véhicules Premium
                </Heading>
                <Text fontSize="lg" color="gray.600" maxW="600px">
                  Sélectionnez le véhicule parfait pour votre voyage
                </Text>
              </VStack>

              {/* Grille des voitures sans découpage par catégorie */}
              {filteredCars.length === 0 ? (
                <VStack spacing={6} py={16}>
                  <Icon as={FaSearch} boxSize={16} color="gray.400" />
                  <Heading as="h3" size="lg" color="gray.600">
                    Aucun véhicule trouvé
                  </Heading>
                  <Text color="gray.500" textAlign="center">
                    Essayez de modifier vos critères de recherche
                  </Text>
                  <Button 
                    onClick={() => { setBrandFilter(""); setPriceFilter(""); }} 
                    colorScheme="red"
                    borderRadius="full"
                    px={8}
                  >
                    Voir tous les véhicules
                  </Button>
                </VStack>
              ) : (
                <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
                  {filteredCars.map((car) => (
                    <GridItem key={car.id}>
                      <Box
                        bg="white"
                        borderRadius="2xl"
                        boxShadow="0 4px 24px rgba(0,0,0,0.10)"
                        overflow="hidden"
                        position="relative"
                        transition="all 0.3s"
                        _hover={{ boxShadow: "0 12px 32px rgba(220,38,38,0.15)", transform: "translateY(-6px) scale(1.03)", zIndex: 10 }}
                      >
                        <Box position="relative" h="220px" bg="gray.100">
                          <img
                            src={car.photo1 ? `http://localhost:8000/images/${car.photo1}` : car.photo2 ? `http://localhost:8000/images/${car.photo2}` : "/assets/images/default-car.jpg"}
                            alt={`${car.brand} ${car.model}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                          {/* Overlay au hover */}
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bg="rgba(0,0,0,0.65)"
                            opacity={0}
                            transition="opacity 0.3s"
                            _hover={{ opacity: 1 }}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            zIndex={20}
                          >
                            <Heading size="md" color="white" mb={2}>{car.brand} {car.model}</Heading>
                            <Text color="gray.200" fontSize="sm" mb={2}>{car.category} • {car.fuel_type}</Text>
                            <Badge colorScheme={car.available ? "green" : "red"} variant="solid" mb={3}>
                              {car.available ? "Disponible" : "Non disponible"}
                            </Badge>
                            <Button
                              colorScheme="red"
                              size="md"
                              borderRadius="full"
                              px={8}
                              fontWeight="bold"
                              onClick={() => navigate(`/cars/${car.id}`)}
                              _hover={{ bg: "red.600", color: "white" }}
                            >
                              Voir la fiche
                            </Button>
                          </Box>
                        </Box>
                        <Box p={6}>
                          <HStack justify="space-between" mb={2}>
                            <Heading size="md" color="red.600">{car.brand}</Heading>
                            <Text fontWeight="bold" color="gray.700">{car.price} MAD</Text>
                          </HStack>
                          <Text color="gray.500" fontSize="sm" mb={2}>{car.model} • {car.gearbox} • {car.fuel_type}</Text>
                          <Badge colorScheme={car.available ? "green" : "red"} variant="subtle">
                            {car.available ? "Disponible" : "Non disponible"}
                          </Badge>
                        </Box>
                      </Box>
                    </GridItem>
                  ))}
                </SimpleGrid>
              )}

              {/* Call to Action */}
              {filteredCars.length > 0 && (
                <MotionVStack 
                  spacing={6} 
                  mt={16} 
                  textAlign="center"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.5, duration: 0.6 }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Text fontSize="lg" color="gray.600" maxW="500px">
                    Besoin d'aide pour choisir ? Notre équipe est là pour vous conseiller
                  </Text>
                  <Button
                    as="a"
                    href="https://wa.me/212661118885"
                    target="_blank"
                    rel="noopener noreferrer"
                    leftIcon={<FaWhatsapp />}
                    colorScheme="whatsapp"
                    size="lg"
                    borderRadius="full"
                    px={10}
                    py={6}
                    fontSize="lg"
                    fontWeight="bold"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 25px rgba(37, 211, 102, 0.35)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Nous écrire sur WhatsApp
                  </Button>
                </MotionVStack>
              )}
            </>
          )}
        </Container>
      </MotionBox>

      <Footer />
    </>
  );
}

export default BookCars;
