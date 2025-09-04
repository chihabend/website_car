import {
  Box,
  Container,
  HStack,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  GridItem,
  Badge,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Avatar,
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
  Image,
  AspectRatio,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { 
  FaUser, 
  FaCreditCard, 
  FaCalendarAlt, 
  FaCar, 
  FaHistory, 
  FaEdit, 
  FaTrash, 
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "../context/axiosClient";
import { useStateContext } from "../context/ContextProvider";
import LoadingSpinner from "../components/ui/loading-spinner";
import ProfileDrawer from "../components/ui/profile-drawer";
import RentItem from "../components/ui/RentItem";
import Swal from "sweetalert2";
import Footer from "../components/navbar/Footer";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

function Profile() {
  const navigate = useNavigate();
  const [rents, setrents] = useState([]);
  const [loading, setloading] = useState(true);
  const [cars, setCars] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const { user, token } = useStateContext();
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

  // fetching the current user rents
  useEffect(() => {
    const fetchRents = async () => {
      try {
        const { data } = await axiosClient.get(`http://127.0.0.1:8000/api/my-rents/${user?.id}`);
        setrents(data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching rents:", error);
        setloading(false);
      }
    };

    if (user?.id) {
      fetchRents();
    }
  }, [user]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/api/cars');
        setCars(data.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const deleteRent = async (id) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez plus louer cette voiture",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosClient.delete(`http://127.0.0.1:8000/api/rents/${id}`);
          setrents(rents.filter(rent => rent.id !== id));
          toast({
            title: "Réservation supprimée",
            description: "La réservation a été supprimée avec succès",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          toast({
            title: "Erreur",
            description: "Impossible de supprimer la réservation",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    });
  };

  const update = async (updated) => {
    const id = updated.id;
    try {
      await axiosClient.put(`http://127.0.0.1:8000/api/rents/${id}`, updated);
      const car = cars.filter((car) => car.id === updated.car_id);

      if (!car.length) return;

    const updatedRent = {
        id,
        car_id: car[0].id,
        brand: car[0].brand,
        model: car[0].model,
        gearbox: car[0].gearbox,
        fuel_type: car[0].fuel_type,
        price: updated.price,
        rental_date: updated.rental_date,
        return_date: updated.return_date,
        user_id: updated.user_id
      };

    setrents(prevRents =>
    prevRents.map(rent => {
      if (rent.id === id) {
            return updatedRent;
          }
          return rent;
        })
      );

      toast({
        title: "Réservation mise à jour",
        description: "La réservation a été modifiée avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la réservation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getTotalSpent = () => {
    return rents.reduce((total, rent) => total + rent.price, 0);
  };

  const getActiveRents = () => {
    const today = new Date();
    return rents.filter(rent => {
      const returnDate = new Date(rent.return_date);
      return returnDate >= today;
    });
  };

  const getCompletedRents = () => {
    const today = new Date();
    return rents.filter(rent => {
      const returnDate = new Date(rent.return_date);
      return returnDate < today;
    });
  };

  const downloadInvoice = (rent) => {
    if (!token) {
      toastMessage("Vous devez être connecté pour télécharger la facture.", "error");
      navigate('/login');
      return;
    }

    axiosClient.get(`http://127.0.0.1:8000/api/rents/invoice/${rent.car_id}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `facture_${rent.brand}_${rent.model}_${new Date(rent.rental_date).toISOString().split('T')[0]}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        toastMessage("Facture téléchargée avec succès!", "success");
      })
      .catch(error => {
        toastMessage("Erreur lors du téléchargement de la facture.", "error");
        console.error("Error downloading invoice:", error);
      });
  };

  const getDaysDifference = (rentalDate, returnDate) => {
    const start = new Date(rentalDate);
    const end = new Date(returnDate);
    const differenceInMilliseconds = Math.abs(end - start);
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  };
  
  if (loading) return <LoadingSpinner />;

  return (
    <>
      {/* Hero Section */}
      <MotionBox
        bg="linear-gradient(135deg, #dc2626 0%, #000000 100%)"
        color="white"
        py={16}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Container maxW="1200px">
          <VStack spacing={8} textAlign="center">
            <HStack spacing={6} align="center">
              <Avatar size="2xl" name={`${user?.firstname} ${user?.lastname}`} bg="red.500" />
              <VStack align="start" spacing={2}>
                <Heading as="h1" size="2xl" fontWeight="bold">
                  Bonjour, {user?.firstname} {user?.lastname}
                </Heading>
                <Text fontSize="lg" opacity={0.9}>
                  Gérez vos réservations et votre profil
                </Text>
                <HStack spacing={4}>
                  <Icon as={FaEnvelope} />
                  <Text>{user?.email}</Text>
                </HStack>
                {user?.telephone && (
                  <HStack spacing={4}>
                    <Icon as={FaPhone} />
                    <Text>{user.telephone}</Text>
                  </HStack>
                )}
              </VStack>
            </HStack>
          </VStack>
    </Container>
      </MotionBox>

      <Container maxW="1400px" py={12}>
        {/* Statistiques */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          mb={8}
        >
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            <Stat textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="md">
              <StatLabel color="gray.600">Total des réservations</StatLabel>
              <StatNumber color="red.600">{rents.length}</StatNumber>
              <StatHelpText>
                <Icon as={FaHistory} color="red.500" mr={2} />
                Toutes les réservations
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="md">
              <StatLabel color="gray.600">Réservations actives</StatLabel>
              <StatNumber color="green.600">{getActiveRents().length}</StatNumber>
              <StatHelpText>
                <Icon as={FaCheckCircle} color="green.500" mr={2} />
                En cours
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="md">
              <StatLabel color="gray.600">Réservations terminées</StatLabel>
              <StatNumber color="blue.600">{getCompletedRents().length}</StatNumber>
              <StatHelpText>
                <Icon as={FaClock} color="blue.500" mr={2} />
                Terminées
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center" p={6} bg="white" borderRadius="xl" boxShadow="md">
              <StatLabel color="gray.600">Total dépensé</StatLabel>
              <StatNumber color="purple.600">{getTotalSpent()} MAD</StatNumber>
              <StatHelpText>
                <Icon as={FaMoneyBillWave} color="purple.500" mr={2} />
                Montant total
              </StatHelpText>
            </Stat>
          </SimpleGrid>
        </MotionBox>

        {/* Contenu principal */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs variant="enclosed" colorScheme="red" value={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>
                <HStack spacing={2}>
                  <Icon as={FaCar} />
                  <Text>Mes Réservations</Text>
                  <Badge colorScheme="red" variant="solid" borderRadius="full">
                    {rents.length}
                  </Badge>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={2}>
                  <Icon as={FaUser} />
                  <Text>Mon Profil</Text>
          </HStack>
              </Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel>
                {rents.length === 0 ? (
                  <VStack spacing={6} py={16} textAlign="center">
                    <Icon as={FaCar} boxSize={16} color="gray.400" />
                    <Heading size="lg" color="gray.600">
                      Aucune réservation
                    </Heading>
                    <Text color="gray.500" maxW="500px">
                      Vous n'avez pas encore de réservations. Commencez par explorer nos véhicules disponibles !
                    </Text>
                    <Button
                      colorScheme="red"
                      size="lg"
                      onClick={() => window.location.href = '/cars'}
                      leftIcon={<FaCar />}
                    >
                      Voir nos véhicules
                    </Button>
                  </VStack>
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
                    {rents.map((rent) => (
                      <GridItem key={rent.id}>
                        <Card
                          variant="outline"
                          _hover={{ transform: "translateY(-4px) scale(1.02)", boxShadow: "2xl" }}
                          transition="all 0.3s"
                          borderWidth={2}
                          borderColor={new Date(rent.return_date) >= new Date() ? "green.400" : "gray.300"}
                        >
                          <CardHeader pb={2}>
                            <HStack justify="space-between">
                              <VStack align="start" spacing={1}>
                                <HStack>
                                  <Heading size="md" color="red.600">
                                    {rent.brand} {rent.model}
                                  </Heading>
                                  <Badge
                                    colorScheme={rent.payment_status === 'paid' ? 'green' : rent.payment_status === 'pending' ? 'yellow' : 'gray'}
                                    variant="solid"
                                    fontSize="xs"
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                  >
                                    {rent.payment_status === 'paid' ? 'Payé' : rent.payment_status === 'pending' ? 'En attente' : 'Non payé'}
                                  </Badge>
                                </HStack>
                                <Badge
                                  colorScheme={new Date(rent.return_date) >= new Date() ? "green" : "gray"}
                                  variant="subtle"
                                  fontSize="xs"
                                  borderRadius="full"
                                >
                                  {new Date(rent.return_date) >= new Date() ? "Active" : "Terminée"}
                                </Badge>
                              </VStack>
                              <Image
                                src={`http://localhost:8000/images/${rent.photo || 'default.jpg'}`}
                                alt="Voiture"
                                boxSize="70px"
                                objectFit="cover"
                                borderRadius="md"
                                border="1px solid #eee"
                                bg="gray.50"
                              />
                            </HStack>
                          </CardHeader>
                          <CardBody pt={0}>
                            <VStack spacing={4} align="stretch">
                              <SimpleGrid columns={2} spacing={4}>
                                <VStack spacing={1} align="start">
                                  <Text fontSize="sm" color="gray.500">Date de début</Text>
                                  <Text fontWeight="semibold">
                                    {new Date(rent.rental_date).toLocaleDateString()}
                                  </Text>
                                </VStack>
                                <VStack spacing={1} align="start">
                                  <Text fontSize="sm" color="gray.500">Date de retour</Text>
                                  <Text fontWeight="semibold">
                                    {new Date(rent.return_date).toLocaleDateString()}
                                  </Text>
                                </VStack>
                              </SimpleGrid>
                              <Divider />
                              <VStack spacing={2} align="stretch">
                                <HStack justify="space-between">
                                  <Text fontSize="sm" color="gray.500">Durée</Text>
                                  <Text fontWeight="semibold">
                                    {getDaysDifference(rent.rental_date, rent.return_date)} jours
                                  </Text>
                                </HStack>
                                <HStack justify="space-between">
                                  <Text fontSize="sm" color="gray.500">Type de carburant</Text>
                                  <Text fontWeight="semibold">{rent.fuel_type}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                  <Text fontSize="sm" color="gray.500">Prix total</Text>
                                  <Text fontSize="lg" fontWeight="bold" color="red.600">
                                    {rent.price} MAD
                                  </Text>
                                </HStack>
                              </VStack>
                              <Divider />
                              <HStack justify="space-between">
                                <Button
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  leftIcon={<FaEdit />}
                                  _hover={{ bg: "red.50", color: "red.600" }}
                                  onClick={() => {/* Logique d'édition */}}
                                >
                                  Modifier
                                </Button>
                                <Button
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  leftIcon={<FaTrash />}
                                  _hover={{ bg: "red.50", color: "red.600" }}
                                  onClick={() => deleteRent(rent.id)}
                                >
                                  Supprimer
                                </Button>
                                <Button
                                  size="sm"
                                  colorScheme="blue"
                                  variant="ghost"
                                  leftIcon={<FaDownload />}
                                  _hover={{ bg: "blue.50", color: "blue.600" }}
                                  onClick={() => downloadInvoice(rent)}
                                >
                                  Facture
                                </Button>
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                      </GridItem>
                    ))}
                  </SimpleGrid>
                )}
              </TabPanel>
              
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Card>
                    <CardHeader>
                      <Heading size="md" color="red.600">
                        Informations personnelles
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                          <Text fontWeight="semibold">Nom complet</Text>
                          <Text>{user?.firstname} {user?.lastname}</Text>
                        </HStack>
                        <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                          <Text fontWeight="semibold">Email</Text>
                          <Text>{user?.email}</Text>
                        </HStack>
                        {user?.telephone && (
                          <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                            <Text fontWeight="semibold">Téléphone</Text>
                            <Text>{user.telephone}</Text>
                          </HStack>
                        )}
                        <HStack justify="space-between" p={3} bg="gray.50" borderRadius="md">
                          <Text fontWeight="semibold">ID Utilisateur</Text>
                          <Text>{user?.id}</Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                  
                  <ProfileDrawer user={user} />
      </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MotionBox>
    </Container>

      <Footer />
    </>
  );
}

export default Profile;
