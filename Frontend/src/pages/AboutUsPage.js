import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Button,
  Image,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
} from "@chakra-ui/react";
import { FaCar, FaUsers, FaAward, FaHeart, FaShieldAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/navbar/Footer";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

function AboutUs() {
  const navigate = useNavigate();

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
      {/* Hero Section */}
      <MotionBox
        bg="linear-gradient(135deg, #dc2626 0%, #000 100%)"
        color="white"
        py={20}
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Container maxW="1200px" textAlign="center">
          <Heading as="h1" size="2xl" mb={6} fontWeight="bold">
            À propos de TEXAS CAR
          </Heading>
          <Text fontSize="xl" maxW="800px" mx="auto" opacity={0.9}>
            Votre partenaire de confiance pour des expériences de location de voitures exceptionnelles depuis 2020
          </Text>
        </Container>
      </MotionBox>

      {/* Notre Histoire */}
      <MotionBox py={16} bg="white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1200px">
          <SimpleGrid columns={[1, 2]} spacing={12} alignItems="center">
            <VStack align="start" spacing={6}>
              <Heading as="h2" size="xl" color="red.600">
                Notre Histoire
              </Heading>
              <Text fontSize="lg" color="gray.600" lineHeight="tall">
                Fondée en 2007, TEXAS CAR est née de la passion pour l'automobile et du désir d'offrir 
                des expériences de location exceptionnelles. Nous avons commencé avec une flotte modeste et avons grandi 
                pour devenir l'un des acteurs reconnus de la location de voitures au Maroc.
              </Text>
              <Text fontSize="lg" color="gray.600" lineHeight="tall">
                Notre engagement envers l'excellence et la satisfaction client nous a permis de construire 
                une réputation solide basée sur la confiance, la qualité et le service personnalisé.
              </Text>
            </VStack>
            <Box>
              <Image
                src="/assets/images/Logo.png"
                alt="TEXAS CAR"
                borderRadius="xl"
                shadow="2xl"
                w="full"
                h="400px"
                objectFit="cover"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </MotionBox>

      {/* Notre Mission */}
      <MotionBox py={16} bg="gray.50" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1200px">
          <VStack spacing={12}>
            <Heading as="h2" size="xl" color="red.600" textAlign="center">
              Notre Mission
            </Heading>
            <Text fontSize="xl" textAlign="center" maxW="800px" color="gray.600">
              Offrir des expériences de location de voitures accessibles et de qualité, en combinant innovation technologique, 
              service client exceptionnel et une flotte variée pour satisfaire tous les besoins.
            </Text>
          </VStack>
        </Container>
      </MotionBox>

      {/* Nos Valeurs */}
      <MotionBox py={16} bg="white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1200px">
          <Heading as="h2" size="xl" color="red.600" textAlign="center" mb={12}>
            Nos Valeurs
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={8}>
            {[
              { icon: FaHeart, title: "Passion", desc: "Nous mettons notre passion pour l'automobile au service de votre satisfaction." },
              { icon: FaShieldAlt, title: "Confiance", desc: "La sécurité et la fiabilité sont au cœur de notre engagement." },
              { icon: FaClock, title: "Excellence", desc: "Nous visons l'excellence dans chaque aspect de notre service." },
              { icon: FaUsers, title: "Service Client", desc: "Votre satisfaction est notre priorité absolue." },
              { icon: FaCar, title: "Innovation", desc: "Nous adoptons les dernières technologies pour améliorer votre expérience." },
              { icon: FaAward, title: "Qualité", desc: "Nous maintenons les plus hauts standards de qualité dans notre flotte." }
            ].map((value, index) => (
              <MotionVStack
                key={index}
                bg="gray.50"
                p={8}
                borderRadius="xl"
                boxShadow="md"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                spacing={4}
              >
                <Icon as={value.icon} boxSize={12} color="red.500" />
                <Heading as="h3" size="md" color="gray.800">
                  {value.title}
                </Heading>
                <Text textAlign="center" color="gray.600">
                  {value.desc}
                </Text>
              </MotionVStack>
            ))}
          </SimpleGrid>
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
            background: linear-gradient(270deg, #b91c1c, #dc2626, #000, #b91c1c);
            background-size: 800% 800%;
            animation: gradientMove 10s ease-in-out infinite;
          }
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <Container maxW="1200px">
          <Heading as="h2" size="xl" textAlign="center" mb={12}>
            Nos Chiffres Clés
          </Heading>
          <SimpleGrid columns={[2, 4]} spacing={8}>
            {[
              { number: "500+", label: "Clients Satisfaits", help: "Depuis notre création" },
              { number: "50+", label: "Véhicules Premium", help: "Dans notre flotte" },
              { number: "24/7", label: "Support Client", help: "Assistance disponible" },
              { number: "98%", label: "Taux de Satisfaction", help: "Basé sur nos avis" }
            ].map((stat, index) => (
              <MotionVStack
                key={index}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                spacing={2}
                textAlign="center"
              >
                <Stat>
                  <StatNumber fontSize="4xl" fontWeight="bold">
                    {stat.number}
                  </StatNumber>
                  <StatLabel fontSize="lg" opacity={0.9}>
                    {stat.label}
                  </StatLabel>
                  <StatHelpText opacity={0.7}>
                    {stat.help}
                  </StatHelpText>
                </Stat>
              </MotionVStack>
            ))}
          </SimpleGrid>
        </Container>
      </MotionBox>

      {/* Équipe */}
      <MotionBox py={16} bg="white" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="1200px">
          <Heading as="h2" size="xl" color="red.600" textAlign="center" mb={12}>
            Notre Équipe
          </Heading>
          <Text fontSize="lg" textAlign="center" maxW="800px" mx="auto" color="gray.600" mb={12}>
            Une équipe passionnée et expérimentée dédiée à votre satisfaction
          </Text>
          <SimpleGrid columns={[1, 2, 3]} spacing={8}>
            {[
              { name: "Ahmed Benali", role: "Directeur Général", desc: "Expert en gestion et développement d'entreprise" },
              { name: "Fatima Zahra", role: "Responsable Service Client", desc: "Spécialiste de l'expérience client premium" },
              { name: "Karim El Amrani", role: "Responsable Technique", desc: "Expert en maintenance et gestion de flotte" }
            ].map((member, index) => (
              <MotionVStack
                key={index}
                bg="gray.50"
                p={8}
                borderRadius="xl"
                boxShadow="md"
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
                spacing={4}
              >
                <Box
                  w="120px"
                  h="120px"
                  borderRadius="full"
                  bg="red.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontSize="4xl"
                  fontWeight="bold"
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </Box>
                <Heading as="h3" size="md" color="gray.800">
                  {member.name}
                </Heading>
                <Text fontWeight="bold" color="red.500">
                  {member.role}
                </Text>
                <Text textAlign="center" color="gray.600">
                  {member.desc}
                </Text>
              </MotionVStack>
            ))}
          </SimpleGrid>
        </Container>
      </MotionBox>

      {/* Call to Action */}
      <MotionBox py={16} bg="gray.50" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Container maxW="800px" textAlign="center">
          <VStack spacing={8}>
            <Heading as="h2" size="xl" color="red.600">
              Prêt à vivre l'expérience TEXAS CAR ?
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Découvrez notre flotte premium et réservez votre véhicule dès maintenant
            </Text>
            <Button
              size="lg"
              colorScheme="red"
              bg="red.500"
              _hover={{ bg: "red.600" }}
              px={10}
              py={6}
              fontSize="lg"
              fontWeight="bold"
              borderRadius="full"
              onClick={() => navigate("/cars")}
            >
              Voir nos véhicules
            </Button>
          </VStack>
        </Container>
      </MotionBox>

      <Footer />
    </>
  );
}

export default AboutUs; 