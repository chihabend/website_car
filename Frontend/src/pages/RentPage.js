import {
  Center,
  FormLabel,
  Input,
  HStack,
  Box,
  Button,
  Image,
  VStack,
  Text,
  Heading,
  Spacer,
  Stack,
  SimpleGrid,
  GridItem,
  Divider,
  Container,
  Flex,
  Badge,
  Icon,
  Grid,
  AspectRatio,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/ui/loading-spinner";
import axiosClient from "../context/axiosClient";
import { useStateContext } from "../context/ContextProvider";
import { motion } from "framer-motion";
import { 
  FaCar, 
  FaCalendarAlt, 
  FaTachometerAlt, 
  FaGasPump, 
  FaCog, 
  FaCheckCircle,
  FaTimesCircle,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaUsers,
  FaClock,
  FaCreditCard,
  FaCheck
} from "react-icons/fa";
import Footer from "../components/navbar/Footer";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

function Rent() {
  const navigate = useNavigate();
  const { user, token } = useStateContext();
  let { id } = useParams();
  const [car, setCar] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [rentalDate, setrentalDate] = useState('');
  const [returnDate, setreturnDate] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isPaying, setIsPaying] = useState(false);

  const toast = useToast();
  const toastMessage = (message, type = "error", title = "Error occured.") => {
    return toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/cars/${id}`)
      .then((response) => {
      setCar(response.data.data[0]);
      setLoading(false);
      });
  }, [id]);

  if (isLoading) return <LoadingSpinner />;

  async function rentACar(e) {
    e.preventDefault();

    if (!token) {
      navigate('/login');
      return;
    }

    if (!rentalDate || !returnDate) {
        return Swal.fire({
          icon: "error",
          title: "Les dates de location et de retour sont requises",
        });
    }

    const start = new Date(rentalDate);
    const end = new Date(returnDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return Swal.fire({
        icon: "error",
        title: "Date de location invalide",
        text: "La date de début est déjà passée",
      });
    }

    if (end <= start) {
      return Swal.fire({
        icon: "error",
        title: "Nombre de jours invalide",
        text: "Le nombre de jours doit être au moins 1"
      });
    }

    const differenceInMilliseconds = Math.abs(end - start);
    const rentDuration = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const price = car.price * rentDuration;

    // 1) Afficher le choix d'abord (2 boutons)
    const choice = await Swal.fire({
      title: 'Choisissez le mode de paiement',
      text: `Réservation pour ${rentDuration} jours`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Payer en ligne',
      denyButtonText: 'Payer en personne',
      reverseButtons: true
    });

    // Si aucun choix (fermeture du popup), on ne fait rien
    if (!choice.isConfirmed && !choice.isDenied) {
      return;
    }

    const paymentMethod = choice.isConfirmed ? 'stripe' : 'in_person';

    const formData = {
      rental_date: rentalDate,
      return_date: returnDate,
      price,
      user_id: user.id,
      car_id: car.id,
      payment_method: paymentMethod,
    };

    // 2) Loader pendant la création
    Swal.fire({
      title: 'Création de la réservation...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axiosClient.post('http://127.0.0.1:8000/api/rents', formData);
      Swal.close();

      if (paymentMethod === 'stripe') {
        await handleStripePayment(response.data.id);
      } else {
        toastMessage(
          `Réservation (paiement en personne) confirmée pour ${rentDuration} jours. Notre équipe vous contactera pour finaliser le paiement.`,
          "success",
          "Réservation créée"
        );
        navigate('/profile');
      }
    } catch (error) {
      Swal.close();
      toastMessage(
        "Erreur lors de la création de la réservation",
        "error",
        "Erreur"
      );
    }
  }

  // Fonction pour gérer le paiement Stripe
  const handleStripePayment = async (rentId) => {
    if (!token) {
      toastMessage("Vous devez être connecté pour payer en ligne.", "error", "Connexion requise");
      navigate('/login');
      return;
    }
    if (!rentId) {
      toastMessage("Réservation introuvable. Veuillez réessayer.", "error", "Erreur de réservation");
      return;
    }
    setIsPaying(true);
    try {
      const response = await axiosClient.post(`http://127.0.0.1:8000/api/checkout/${rentId}`);
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        toastMessage(
          "Erreur lors de la création de la session de paiement. Vérifiez la configuration Stripe.",
          "error",
          "Erreur Stripe"
        );
      }
    } catch (error) {
      let errorMessage = "Erreur lors de la connexion au système de paiement";
      if (error.response) {
        const { data, status } = error.response;
        if (status === 500 && data.error) {
          if (data.error.includes('Configuration Stripe manquante')) {
            errorMessage = "Configuration de paiement manquante. Veuillez contacter l'administrateur.";
          } else {
            errorMessage = data.error;
          }
        } else if (status === 404) {
          errorMessage = "Réservation non trouvée";
        } else if (status === 403) {
          errorMessage = "Vous n'êtes pas autorisé à effectuer cette action";
        } else if (status === 401) {
          errorMessage = "Session expirée. Veuillez vous reconnecter.";
          navigate('/login');
          setIsPaying(false);
          return;
        }
      }
      toastMessage(
        errorMessage,
        "error",
        "Erreur de paiement"
      );
    }
    setIsPaying(false);
  };

  const carImages = [
    car.photo1,
    car.photo2
  ].filter(Boolean); // Filtrer les images null/undefined

  const calculateTotalPrice = () => {
    if (!rentalDate || !returnDate) return 0;
    const start = new Date(rentalDate);
    const end = new Date(returnDate);
    const differenceInMilliseconds = Math.abs(end - start);
    const rentDuration = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return car.price * rentDuration;
  };

  const getDaysDifference = () => {
    if (!rentalDate || !returnDate) return 0;
    const start = new Date(rentalDate);
    const end = new Date(returnDate);
    const differenceInMilliseconds = Math.abs(end - start);
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  };

  return (
    <>
      {/* Hero Section */}
      <MotionBox
        bg="linear-gradient(135deg, #dc2626 0%, #000000 100%)"
        color="white"
        py={[10,12,16]}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container maxW="1200px">
          <VStack spacing={6} textAlign="center">
            <Heading as="h1" size={["xl","2xl"]} fontWeight="bold">
              {car.brand} {car.model}
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              Découvrez ce véhicule et réservez votre expérience de conduite
            </Text>
            <Badge 
              colorScheme={car.available === 1 ? "green" : "red"} 
              variant="solid" 
              px={6} 
              py={2} 
              fontSize="lg"
            >
              {car.available === 1 ? "Disponible" : "Non disponible"}
            </Badge>
          </VStack>
        </Container>
      </MotionBox>

      <Container maxW="1400px" py={12}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
          
          {/* Section principale - Images et détails */}
          <VStack spacing={8} align="stretch">
            
            {/* Galerie d'images */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AspectRatio ratio={16/9} borderRadius="xl" overflow="hidden">
                <Image
                  src={`http://localhost:8000/images/${carImages[selectedImage]}`}
                  objectFit="cover"
                  alt={`${car.brand} ${car.model}`}
                />
              </AspectRatio>
              
              {/* Miniatures - seulement si il y a plusieurs images */}
              {carImages.length > 1 && (
                <HStack spacing={4} mt={4} justify="center">
                  {carImages.map((image, index) => (
                    <Box
                      key={index}
                      w={["64px","80px"]}
                      h={["48px","60px"]}
                      borderRadius="md"
                      overflow="hidden"
                      cursor="pointer"
                      border={selectedImage === index ? "3px solid" : "1px solid"}
                      borderColor={selectedImage === index ? "red.500" : "gray.200"}
                      onClick={() => setSelectedImage(index)}
                      transition="all 0.3s ease"
                      _hover={{ transform: "scale(1.05)" }}
                    >
          <Image
                        src={`http://localhost:8000/images/${image}`}
            objectFit="cover"
                        w="full"
                        h="full"
                      />
                    </Box>
                  ))}
                </HStack>
              )}
            </MotionBox>

            {/* Spécifications détaillées */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Tabs variant="enclosed" colorScheme="red">
                <TabList>
                  <Tab>Spécifications</Tab>
                  <Tab>Informations</Tab>
                  <Tab>Conditions</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={6}>
                      <VStack spacing={2} textAlign="center">
                        <Icon as={FaCar} boxSize={6} color="red.500" />
                        <Text fontSize="sm" color="gray.500">Marque</Text>
                        <Text fontWeight="bold">{car.brand}</Text>
                      </VStack>
                      <VStack spacing={2} textAlign="center">
                        <Icon as={FaCog} boxSize={6} color="red.500" />
                        <Text fontSize="sm" color="gray.500">Boîte</Text>
                        <Text fontWeight="bold">{car.gearbox}</Text>
                      </VStack>
                      <VStack spacing={2} textAlign="center">
                        <Icon as={FaGasPump} boxSize={6} color="red.500" />
                        <Text fontSize="sm" color="gray.500">Carburant</Text>
                        <Text fontWeight="bold">{car.fuel_type}</Text>
                      </VStack>
                      <VStack spacing={2} textAlign="center">
                        <Icon as={FaCalendarAlt} boxSize={6} color="red.500" />
                        <Text fontSize="sm" color="gray.500">Catégorie</Text>
                        <Text fontWeight="bold">{car.category}</Text>
                      </VStack>
                      <VStack spacing={2} textAlign="center">
                        <Icon as={FaTachometerAlt} boxSize={6} color="red.500" />
                        <Text fontSize="sm" color="gray.500">Prix/jour</Text>
                        <Text fontWeight="bold">{car.price} MAD</Text>
                      </VStack>
                      <VStack spacing={2} textAlign="center">
                        <Icon as={car.available === 1 ? FaCheckCircle : FaTimesCircle} boxSize={6} color={car.available === 1 ? "green.500" : "red.500"} />
                        <Text fontSize="sm" color="gray.500">Disponibilité</Text>
                        <Text fontWeight="bold" color={car.available === 1 ? "green.500" : "red.500"}>
                          {car.available === 1 ? "Disponible" : "Non disponible"}
                        </Text>
                      </VStack>
                    </SimpleGrid>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Box>
                        <Heading size="md" mb={3} color="red.600">Détails du véhicule</Heading>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <Text fontWeight="semibold">Marque et modèle</Text>
                            <Text>{car.brand} {car.model}</Text>
                          </HStack>
                          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <Text fontWeight="semibold">Catégorie</Text>
                            <Text>{car.category}</Text>
                          </HStack>
                          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <Text fontWeight="semibold">Type de carburant</Text>
                            <Text>{car.fuel_type}</Text>
                          </HStack>
                          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <Text fontWeight="semibold">Boîte de vitesse</Text>
                            <Text>{car.gearbox}</Text>
                          </HStack>
                          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <Text fontWeight="semibold">Prix par jour</Text>
                            <Text fontWeight="bold" color="red.600">{car.price} MAD</Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Alert status="info">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Conditions de location</AlertTitle>
                          <AlertDescription>
                            Permis de conduire valide requis. Âge minimum : 21 ans. Carte de crédit obligatoire.
                          </AlertDescription>
                        </Box>
                      </Alert>
                      <Alert status="success">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Assurance incluse</AlertTitle>
                          <AlertDescription>
                            Tous nos véhicules sont couverts par une assurance tous risques.
                          </AlertDescription>
                        </Box>
                      </Alert>
                      <Alert status="warning">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Disponibilité</AlertTitle>
                          <AlertDescription>
                            {car.available === 1 
                              ? "Ce véhicule est actuellement disponible pour la location." 
                              : "Ce véhicule n'est pas disponible pour le moment. Veuillez nous contacter pour plus d'informations."
                            }
                          </AlertDescription>
        </Box>
                      </Alert>
                    </VStack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </MotionBox>
          </VStack>

          {/* Section réservation */}
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Box
              bg="white"
              p={{ base: 5, md: 8 }}
              borderRadius="xl"
              boxShadow="xl"
              border="1px solid"
              borderColor="gray.200"
              position={{ base: "static", lg: "sticky" }}
              top={{ lg: 8 }}
            >
              <VStack spacing={6} align="stretch">
                <VStack spacing={2}>
                  <Heading size="lg" color="red.600">
                    Réserver ce véhicule
                  </Heading>
                  <Text color="gray.600" textAlign="center">
                    Choisissez vos dates de location
                  </Text>
                </VStack>

                <VStack spacing={4}>
                  <Box w="full">
                    <FormLabel fontWeight="600" color="gray.700">
                      Date de début
            </FormLabel>
            <Input
                      type="date"
              value={rentalDate}
              onChange={(e) => setrentalDate(e.target.value)}
                      borderColor="red.200"
                      _focus={{ borderColor: "red.400" }}
                    />
                  </Box>
                  
                  <Box w="full">
                    <FormLabel fontWeight="600" color="gray.700">
                      Date de retour
            </FormLabel>
            <Input
                      type="date"
              value={returnDate}
              onChange={(e) => setreturnDate(e.target.value)}
                      borderColor="red.200"
                      _focus={{ borderColor: "red.400" }}
                    />
                  </Box>
                </VStack>

                <Divider />

                {/* Calcul du prix */}
                {rentalDate && returnDate && (
                  <VStack spacing={3} bg="gray.50" p={4} borderRadius="md">
                    <HStack justify="space-between" w="full">
                      <Text>Prix par jour</Text>
                      <Text fontWeight="bold">{car.price} MAD</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Nombre de jours</Text>
                      <Text fontWeight="bold">{getDaysDifference()} jours</Text>
                    </HStack>
                    <Divider />
                    <HStack justify="space-between" w="full">
                      <Text fontSize="lg" fontWeight="bold">Total</Text>
                      <Text fontSize="xl" fontWeight="bold" color="red.600">
                        {calculateTotalPrice()} MAD
                </Text>
                    </HStack>
                  </VStack>
                )}

                {car.available === 1 ? (
                  <VStack spacing={4}>
                    <Button
                      onClick={rentACar}
                      colorScheme="red"
                      size="lg"
                      w="full"
                      py={6}
                      fontSize="lg"
                      fontWeight="bold"
                      leftIcon={<FaCheck />}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Réserver maintenant
                    </Button>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      Vous pourrez choisir entre paiement en ligne ou en personne
                </Text>
                  </VStack>
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Véhicule non disponible</AlertTitle>
                      <AlertDescription>
                        Ce véhicule n'est pas disponible pour le moment.
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}

                {/* Informations de contact */}
                <VStack spacing={3} pt={4} borderTop="1px solid" borderColor="gray.200">
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Besoin d'aide ? Contactez-nous
              </Text>
                  <HStack spacing={4} justify="center">
                    <Icon as={FaPhone} color="red.500" />
                    <Text fontSize="sm">+212 6 12 34 56 78</Text>
                  </HStack>
                  <HStack spacing={4} justify="center">
                    <Icon as={FaEnvelope} color="red.500" />
                    <Text fontSize="sm">contact@synluxury.com</Text>
            </HStack>
                </VStack>
          </VStack>
        </Box>
          </MotionBox>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Rent;