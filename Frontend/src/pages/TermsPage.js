import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { 
  FaFileContract, 
  FaShieldAlt, 
  FaCar, 
  FaCreditCard, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaClock,
  FaUser,
  FaMapMarkerAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/navbar/Footer";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

function TermsPage() {
  const navigate = useNavigate();

  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <>
      {/* Hero Section */}
      <MotionBox
        bg="linear-gradient(135deg, #dc2626 0%, #000000 100%)"
        color="white"
        py={16}
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container maxW="1200px" textAlign="center">
          <VStack spacing={6}>
            <Icon as={FaFileContract} boxSize={16} color="red.300" />
            <Heading as="h1" size="2xl" fontWeight="bold">
              Conditions Générales de Location
            </Heading>
            <Text fontSize="xl" maxW="800px" mx="auto" opacity={0.9}>
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </Text>
          </VStack>
        </Container>
      </MotionBox>

      {/* Contenu Principal */}
      <Container maxW="1000px" py={12}>
        <VStack spacing={12} align="stretch">
          
          {/* Introduction */}
          <MotionBox variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Alert status="info" borderRadius="xl" mb={6}>
              <AlertIcon />
              <Box>
                <AlertTitle>Important !</AlertTitle>
                <AlertDescription>
                  Veuillez lire attentivement ces conditions avant toute réservation. 
                  En confirmant votre réservation, vous acceptez l'ensemble de ces conditions.
                </AlertDescription>
              </Box>
            </Alert>
          </MotionBox>

          {/* Conditions Générales */}
          <MotionBox variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="xl" color="red.600" display="flex" alignItems="center" gap={3}>
                <Icon as={FaFileContract} />
                Conditions Générales
              </Heading>
              
              <Accordion allowMultiple>
                <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
                  <AccordionButton py={4} _hover={{ bg: "gray.50" }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Article 1 - Objet du contrat
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <Text color="gray.700" lineHeight="tall">
                      Le présent contrat a pour objet la location d'un véhicule automobile entre TEXAS CAR
                      (ci-après dénommé "le loueur") et le client (ci-après dénommé "le locataire"). 
                      Cette location est soumise aux conditions générales ci-après définies.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
                  <AccordionButton py={4} _hover={{ bg: "gray.50" }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Article 2 - Conditions de location
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={4} align="stretch">
                      <Text color="gray.700" fontWeight="bold">2.1 - Âge et permis</Text>
                      <List spacing={2}>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Âge minimum : 21 ans</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Permis de conduire valide depuis au moins 2 ans</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Permis international requis pour les ressortissants étrangers</Text>
                        </ListItem>
                      </List>
                      
                      <Text color="gray.700" fontWeight="bold">2.2 - Documents requis</Text>
                      <List spacing={2}>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaUser} color="blue.500" />
                          <Text>Carte d'identité ou passeport en cours de validité</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCreditCard} color="blue.500" />
                          <Text>Carte de crédit au nom du conducteur principal</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaMapMarkerAlt} color="blue.500" />
                          <Text>Justificatif de domicile récent</Text>
                        </ListItem>
                      </List>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
                  <AccordionButton py={4} _hover={{ bg: "gray.50" }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Article 3 - Tarifs et modalités de paiement
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={4} align="stretch">
                      <Text color="gray.700">
                        Les tarifs sont exprimés en Dirhams marocains (MAD) et incluent :
                      </Text>
                      <List spacing={2}>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>L'assurance responsabilité civile</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>L'assurance vol et incendie</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>L'assistance routière 24h/24</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaExclamationTriangle} color="orange.500" />
                          <Text>Le carburant n'est pas inclus</Text>
                        </ListItem>
                      </List>
                      
                      <Alert status="warning" borderRadius="md">
                        <AlertIcon />
                        <Box>
                          <AlertTitle>Caution</AlertTitle>
                          <AlertDescription>
                            Une caution de 1000 MAD sera bloquée sur votre carte de crédit 
                            et libérée dans les 7 jours suivant la restitution du véhicule.
                          </AlertDescription>
                        </Box>
                      </Alert>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
                  <AccordionButton py={4} _hover={{ bg: "gray.50" }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Article 4 - Utilisation du véhicule
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={4} align="stretch">
                      <Text color="gray.700" fontWeight="bold">4.1 - Interdictions</Text>
                      <List spacing={2}>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaExclamationTriangle} color="red.500" />
                          <Text>Conduire sous l'influence de l'alcool ou de drogues</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaExclamationTriangle} color="red.500" />
                          <Text>Sortir du territoire marocain sans autorisation</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaExclamationTriangle} color="red.500" />
                          <Text>Utiliser le véhicule pour des activités illégales</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaExclamationTriangle} color="red.500" />
                          <Text>Fumer à l'intérieur du véhicule</Text>
                        </ListItem>
                      </List>
                      
                      <Text color="gray.700" fontWeight="bold">4.2 - Responsabilités</Text>
                      <Text color="gray.700">
                        Le locataire est responsable de la bonne utilisation du véhicule et doit 
                        respecter le code de la route marocain. Toute infraction sera à sa charge.
                      </Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
                  <AccordionButton py={4} _hover={{ bg: "gray.50" }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Article 5 - Assurance et responsabilité
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={4} align="stretch">
                      <HStack spacing={3} p={4} bg="blue.50" borderRadius="md">
                        <Icon as={FaShieldAlt} color="blue.500" boxSize={6} />
                        <Text fontWeight="bold" color="blue.700">
                          Assurance incluse dans nos tarifs
                        </Text>
                      </HStack>
                      
                      <Text color="gray.700">
                        Notre assurance couvre :
                      </Text>
                      <List spacing={2}>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Responsabilité civile illimitée</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Vol et incendie</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Bris de glace</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaExclamationTriangle} color="orange.500" />
                          <Text>Franchise de 2000 MAD en cas d'accident</Text>
                        </ListItem>
                      </List>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
                  <AccordionButton py={4} _hover={{ bg: "gray.50" }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Article 6 - Réservation et annulation
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={4} align="stretch">
                      <Text color="gray.700" fontWeight="bold">6.1 - Réservation</Text>
                      <Text color="gray.700">
                        La réservation est confirmée après réception du paiement initial 
                        et validation des documents requis.
                      </Text>
                      
                      <Text color="gray.700" fontWeight="bold">6.2 - Annulation</Text>
                      <VStack spacing={3} align="stretch">
                        <HStack spacing={3}>
                          <Badge colorScheme="green">Gratuit</Badge>
                          <Text>Plus de 48h avant le début de location</Text>
                        </HStack>
                        <HStack spacing={3}>
                          <Badge colorScheme="orange">50%</Badge>
                          <Text>Entre 24h et 48h avant le début de location</Text>
                        </HStack>
                        <HStack spacing={3}>
                          <Badge colorScheme="red">100%</Badge>
                          <Text>Moins de 24h avant le début de location</Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
                  <AccordionButton py={4} _hover={{ bg: "gray.50" }}>
                    <Box flex="1" textAlign="left" fontWeight="bold">
                      Article 7 - Retour du véhicule
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <VStack spacing={4} align="stretch">
                      <HStack spacing={3} p={4} bg="green.50" borderRadius="md">
                        <Icon as={FaClock} color="green.500" boxSize={6} />
                        <Text fontWeight="bold" color="green.700">
                          Horaires de retour
                        </Text>
                      </HStack>
                      
                      <Text color="gray.700">
                        Le véhicule doit être retourné :
                      </Text>
                      <List spacing={2}>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>À l'agence de location ou au lieu convenu</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Dans l'état où il a été reçu</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaCheckCircle} color="green.500" />
                          <Text>Avec le niveau de carburant initial</Text>
                        </ListItem>
                        <ListItem display="flex" alignItems="center">
                          <ListIcon as={FaExclamationTriangle} color="orange.500" />
                          <Text>Retard de plus de 2h = facturation d'une journée supplémentaire</Text>
                        </ListItem>
                      </List>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          </MotionBox>

          {/* Contact pour questions */}
          <MotionBox variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Alert status="info" borderRadius="xl">
              <AlertIcon />
              <Box>
                <AlertTitle>Questions sur nos conditions ?</AlertTitle>
                <AlertDescription>
                  Notre équipe est là pour vous aider. Contactez-nous au 06 61 11 88 85 
                  ou par email à contact@texascar.ma
                </AlertDescription>
              </Box>
            </Alert>
          </MotionBox>
        </VStack>
      </Container>

      <Footer />
    </>
  );
}

export default TermsPage; 