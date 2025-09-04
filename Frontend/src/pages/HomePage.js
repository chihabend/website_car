import { Container, Flex, VStack, Box, Heading, Text, Button, SimpleGrid, GridItem, HStack, Icon, Divider, Input, Badge, Stat, StatLabel, StatNumber, StatHelpText, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, AspectRatio, Show, Hide } from "@chakra-ui/react";
import { FaCar, FaCalendarCheck, FaSmile, FaUsers, FaAward, FaShieldAlt, FaStar, FaMapMarkerAlt, FaPercent, FaGift, FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import HomePageText from "../components/ui/home-page-text";
import HomePageButton from "../components/ui/home-page-button";
import HomePageImage from "../components/ui/home-page-image";
import Footer from "../components/navbar/Footer";
 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Carousel from 'react-bootstrap/Carousel';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

// Composant CountUp pour les chiffres dynamiques
const CountUp = ({ end, duration = 2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`count-${end}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span id={`count-${end}`}>
      {prefix}{count}{suffix}
    </span>
  );
};

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.data.slice(0, 3)); // Prendre les 3 premières voitures
        setLoading(false);
      });
  }, []);

  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <>
      {/* Bannière d'accueil d'origine, inchangée */}
      <Container overflow="hidden" maxWidth="1720px" px={[4, 6, 8]}>
        <Flex h={["auto","100vh"]} rowGap={4} direction={["column","row"]}>
          <VStack
            alignItems="center"
            justifyContent="center"
            spacing={[5,7]}
            px={[4, 8, 12, 16]}
            py={[8,0]}
            h="full"
          >
            <HomePageText />
            <HomePageButton />
          </VStack>
          <HomePageImage />
        </Flex>
      </Container>

      {/* Aperçu des voitures - Design Professionnel */}
      <MotionBox 
        py={20} 
        bg="linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" 
        mt={12} 
        variants={sectionVariant} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
        position="relative"
        overflow="hidden"
      >
        {/* Background decorative elements */}
        <Box
          position="absolute"
          top="-50%"
          right="-10%"
          w="400px"
          h="400px"
          bg="red.500"
          opacity="0.05"
          borderRadius="full"
          filter="blur(80px)"
        />
        <Box
          position="absolute"
          bottom="-30%"
          left="-5%"
          w="300px"
          h="300px"
          bg="red.600"
          opacity="0.03"
          borderRadius="full"
          filter="blur(60px)"
        />

        <Container maxW="1400px" position="relative" zIndex={1}>
          <VStack spacing={12}>
            {/* Header Section */}
            <VStack spacing={6} textAlign="center" maxW="800px">
              <Badge 
                colorScheme="red" 
                variant="subtle" 
                px={4} 
                py={2} 
                borderRadius="full"
                fontSize="sm"
                fontWeight="semibold"
                letterSpacing="wide"
              >
                NOTRE FLOTTE
              </Badge>
              <Heading 
                as="h2" 
                size="2xl" 
                color="gray.800" 
                fontWeight="bold"
                lineHeight="1.2"
              >
                Découvrez Notre Sélection
                <Text as="span" color="red.600" display="block">
                  de Véhicules d'Exception
                </Text>
          </Heading>
              <Text 
                fontSize="lg" 
                color="gray.600" 
                maxW="600px"
                lineHeight="1.6"
              >
                Une large gamme de véhicules pour tous les besoins: citadines, berlines, SUV et plus. 
                Confort, fiabilité et service au meilleur prix.
              </Text>
            </VStack>

            {/* Cars: Slider on mobile, Grid on desktop */}
            <Show below="md">
              <Box w="full" mb={6}>
                <Carousel interval={4000} pause='hover' indicators>
                  {cars.map((car) => (
                    <Carousel.Item key={car.id}>
                      <Box px={3} py={2}>
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
                      </Box>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Box>
            </Show>
            <Hide below="md">
              <SimpleGrid 
                columns={[1, 1, 2, 3]} 
                spacing={[4, 6, 8, 10]} 
                w="full"
                mb={[6,8]}
              >
                {cars.map((car) => (
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
            </Hide>

            {/* CTA Section */}
            <VStack spacing={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Button 
                  colorScheme="red" 
                  variant="solid" 
                  size="lg" 
                  bg="linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
                  _hover={{ 
                    bg: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)"
                  }}
                  _active={{
                    transform: "translateY(0px)"
                  }}
                  borderRadius="full" 
                  px={12} 
                  py={7} 
                  fontWeight="bold" 
                  fontSize="lg" 
                  shadow="lg"
                  transition="all 0.3s ease"
                >
                  <HStack spacing={3}>
                    <Icon as={FaCar} />
                    <Text>Explorer Toute Notre Collection</Text>
                  </HStack>
            </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Text 
                  color="gray.500" 
                  fontSize="sm"
                  textAlign="center"
                >
                  Plus de 50 véhicules premium disponibles • Réservation en ligne 24/7
                </Text>
              </motion.div>
            </VStack>
          </VStack>
        </Container>
      </MotionBox>

      {/* Comment ça marche ? */}
      <MotionBox py={12} bg="white" mt={12} variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1000px">
          <Heading as="h2" size="lg" mb={8} textAlign="center" color="red.600" letterSpacing="wide">
            Comment ça marche ?
          </Heading>
          <SimpleGrid columns={[1, 3, 3]} spacing={10}>
            {[0,1,2].map((i) => (
              <MotionVStack
                key={i}
                bg="gray.50"
                p={6}
                borderRadius="xl"
                boxShadow="md"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              >
                {i === 0 && <Icon as={FaCar} boxSize={12} color="red.500" />}
                {i === 1 && <Icon as={FaCalendarCheck} boxSize={12} color="red.500" />}
                {i === 2 && <Icon as={FaSmile} boxSize={12} color="red.500" />}
                <Text fontWeight="bold" color="gray.800">
                  {i === 0 && "1. Choisissez votre voiture"}
                  {i === 1 && "2. Réservez en ligne"}
                  {i === 2 && "3. Profitez du voyage"}
                </Text>
                <Text textAlign="center" color="gray.600">
                  {i === 0 && "Parcourez notre sélection et trouvez la voiture idéale pour votre séjour."}
                  {i === 1 && "Réservez facilement en quelques clics, choisissez vos dates et validez."}
                  {i === 2 && "Récupérez votre voiture et partez à l'aventure en toute sérénité !"}
                </Text>
              </MotionVStack>
            ))}
          </SimpleGrid>
        </Container>
      </MotionBox>

      {/* FAQ */}
      <MotionBox py={12} bg="white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1000px">
          <VStack spacing={6} mb={6} textAlign="center">
            <Heading as="h2" size="lg" color="red.600" letterSpacing="wide">
              FAQ
            </Heading>
            <Text color="gray.600">Questions fréquentes sur nos services de location</Text>
          </VStack>
          <Accordion allowToggle>
            <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
              <h3>
                <AccordionButton _expanded={{ bg: "gray.50" }} py={4}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                    Comment régler ma réservation en ligne ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4} color="gray.700">
                Les paiements en ligne sont gérés par Stripe sur une page sécurisée. Vous serez redirigé automatiquement après la création de votre réservation.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
              <h3>
                <AccordionButton _expanded={{ bg: "gray.50" }} py={4}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                    Quel est le montant de la caution ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4} color="gray.700">
                La caution est de 1000 MAD. Elle est libérée dans les 7 jours suivant la restitution du véhicule.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
              <h3>
                <AccordionButton _expanded={{ bg: "gray.50" }} py={4}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                    Quels documents sont nécessaires ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4} color="gray.700">
                Pièce d'identité (ou passeport), permis valable (2 ans minimum), et justificatif de domicile. Un permis international peut être requis pour les ressortissants étrangers.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
              <h3>
                <AccordionButton _expanded={{ bg: "gray.50" }} py={4}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                    Proposez-vous la livraison du véhicule ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4} color="gray.700">
                Oui, la livraison et la reprise peuvent être proposées selon disponibilité et zone de service. Contactez-nous pour un devis personnalisé.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4}>
              <h3>
                <AccordionButton _expanded={{ bg: "gray.50" }} py={4}>
                  <Box as="span" flex='1' textAlign='left' fontWeight="bold">
                    Quelles sont les conditions d’annulation ?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4} color="gray.700">
                L’annulation est gratuite plus de 48h avant le début. Des frais peuvent s’appliquer entre 24h et 48h, et 100% moins de 24h. Voir nos Conditions.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Container>
      </MotionBox>

      {/* Statistiques */}
      <MotionBox
        className="animated-gradient-bg"
        py={16}
        color="white"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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
        <Container maxW="1200px">
          <VStack spacing={12}>
            <Heading as="h2" size="xl" textAlign="center" letterSpacing="wide">
              Nos Chiffres Clés
          </Heading>
            <SimpleGrid columns={[2, 4]} spacing={8} w="full">
              {[
                { number: 500, suffix: "+", label: "Clients Satisfaits", help: "Depuis notre création", icon: FaUsers },
                { number: 5, suffix: "+", label: "Ans d'Expérience", help: "Dans la location de voitures", icon: FaCalendarAlt },
                { number: 24, prefix: "", suffix: "/7", label: "Support Client", help: "Assistance disponible", icon: FaShieldAlt },
                { number: 98, suffix: "%", label: "Taux de Satisfaction", help: "Basé sur nos avis", icon: FaStar }
              ].map((stat, index) => (
              <MotionVStack
                key={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                  spacing={3}
                  textAlign="center"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon as={stat.icon} boxSize={8} color="red.300" />
                  <Stat>
                    <StatNumber fontSize="4xl" fontWeight="bold" color="white">
                      <CountUp 
                        end={stat.number} 
                        suffix={stat.suffix || ""} 
                        prefix={stat.prefix || ""}
                        duration={2.5}
                      />
                    </StatNumber>
                    <StatLabel fontSize="lg" opacity={0.9} color="white">
                      {stat.label}
                    </StatLabel>
                    <StatHelpText opacity={0.7} color="white">
                      {stat.help}
                    </StatHelpText>
                  </Stat>
              </MotionVStack>
            ))}
          </SimpleGrid>
          </VStack>
        </Container>
      </MotionBox>

      {/* Contact rapide */}
      <MotionBox py={12} pb={20} bg="white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="900px">
          <Heading as="h2" size="lg" mb={8} textAlign="center" color="red.600" letterSpacing="wide">
            Contact rapide
          </Heading>
          <SimpleGrid columns={[1, 2]} spacing={10}>
            <MotionVStack
              align="stretch"
              bg="white"
              p={8}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid #eee"
              spacing={6}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
            >
              <Text fontWeight="bold" fontSize="lg" color="gray.800">Formulaire express</Text>
              <form onSubmit={e => { e.preventDefault(); alert('Message envoyé !'); }}>
                <VStack spacing={4} align="stretch">
                  <Input placeholder="Votre nom" required bg="gray.50" borderColor="red.200" _focus={{ borderColor: "red.400" }} />
                  <Input placeholder="Votre email" type="email" required bg="gray.50" borderColor="red.200" _focus={{ borderColor: "red.400" }} />
                  <Input placeholder="Votre téléphone" type="tel" bg="gray.50" borderColor="red.200" _focus={{ borderColor: "red.400" }} />
                  <Input placeholder="Votre message" as="textarea" rows={3} required bg="gray.50" borderColor="red.200" _focus={{ borderColor: "red.400" }} />
                  <Button type="submit" colorScheme="red" w="full" bg="red.500" _hover={{ bg: "red.600" }} borderRadius="full" fontWeight="bold">Envoyer</Button>
                </VStack>
              </form>
            </MotionVStack>
            <MotionVStack
              align="stretch"
              bg="white"
              p={8}
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid #eee"
              spacing={6}
              justify="center"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
            >
              <Text fontWeight="bold" fontSize="lg" color="gray.800">Nos coordonnées</Text>
              <HStack align="start"><Text fontWeight="bold" color="gray.700">Adresse :</Text><Box color="red.500"><Text>28 bis Immeuble Khalifa</Text><Text>Rue Anatôle France</Text><Text>El Jadida 24000</Text></Box></HStack>
              <HStack><Text fontWeight="bold" color="gray.700">Fix :</Text><Text color="red.500">05 23 34 01 3 2</Text></HStack>
              <HStack><Text fontWeight="bold" color="gray.700">Phone1 :</Text><Text color="red.500">06 55 58 31 58</Text></HStack>
              <HStack><Text fontWeight="bold" color="gray.700">Phone2 / WhatsApp :</Text><Text color="red.500">06 61 11 88 85</Text></HStack>
              <HStack><Text fontWeight="bold" color="gray.700">Email :</Text><Text color="red.500">contact@texascar.ma</Text></HStack>
              <HStack pt={2}>
                <Button
                  as="a"
                  href="https://wa.me/212661118885"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaWhatsapp />}
                  colorScheme="whatsapp"
                  borderRadius="full"
                  fontWeight="bold"
                >
                  Nous écrire sur WhatsApp
                </Button>
              </HStack>
            </MotionVStack>
          </SimpleGrid>
        </Container>
      </MotionBox>

      {/* Localisation */}
      <MotionBox py={12} bg="white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1200px">
          <VStack spacing={6} mb={6} textAlign="center">
            <HStack justify="center" spacing={3}>
              <Icon as={FaMapMarkerAlt} color="red.500" boxSize={6} />
              <Heading as="h2" size="lg" color="red.600" letterSpacing="wide">
                Nous trouver
              </Heading>
            </HStack>
            <Text color="gray.600">28 bis Immeuble Khalifa, Rue Anatôle France, El Jadida 24000</Text>
          </VStack>
          <Box borderRadius="xl" overflow="hidden" boxShadow="lg" border="1px solid #eee">
            <AspectRatio ratio={16/9}>
              <iframe
                title="Localisation TEXAS CAR"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=33.2500605,-8.5038927&z=17&output=embed"
              />
            </AspectRatio>
          </Box>
          <HStack justify="center" mt={4}>
            <Button
              as="a"
              href="https://www.google.com/maps/place/Texas+Car/@33.250065,-8.5064676,17z/data=!3m1!4b1!4m6!3m5!1s0xda91de85377b9d3:0x7159bdb7668da5fc!8m2!3d33.2500605!4d-8.5038927!16s%2Fg%2F11cjj05gy_?entry=ttu&g_ep=EgoyMDI1MDgyNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="red"
              variant="outline"
              borderRadius="full"
            >
              Ouvrir dans Google Maps
            </Button>
          </HStack>
        </Container>
      </MotionBox>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
