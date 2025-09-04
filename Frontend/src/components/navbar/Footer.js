import { 
  Container, 
  Flex, 
  Text, 
  Link, 
  Box, 
  VStack, 
  HStack, 
  SimpleGrid, 
  IconButton, 
  Divider,
  Badge,
  Image,
  Icon
} from "@chakra-ui/react";
import { 
  FaLinkedin, 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebook, 
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCar,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset
} from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Footer = () => {
  return (
    <Box bg="gray.900" color="white" position="relative" overflow="hidden" mt={16}>
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="4px"
        bg="linear-gradient(90deg, #dc2626, #b91c1c, #991b1b)"
      />
      
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
        {/* Main Footer Content */}
        <SimpleGrid 
          columns={[1, 1, 2, 4]} 
          spacing={8} 
          py={16}
          borderBottom="1px solid"
          borderColor="gray.700"
        >
          {/* Company Info */}
          <VStack align="center" spacing={6} textAlign="center">
            <VStack align="center" spacing={3}>
              <HStack spacing={3} justify="center">
                <Image 
                  src="/assets/images/Logo.png" 
                  alt="TEXAS CAR" 
                  h="40px"
                  fallback={
                    <Box 
                      bg="red.600" 
                      color="white" 
                      px={3} 
                      py={2} 
                      borderRadius="md"
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      SY LUXURY
                    </Box>
                  }
                />
              </HStack>
              <Text fontSize="lg" fontWeight="semibold" color="gray.100">
                TEXAS CAR
              </Text>
              <Text fontSize="sm" color="gray.400" lineHeight="1.6">
                Votre partenaire de confiance pour des locations de véhicules premium. 
                Expérience, qualité et service personnalisé.
              </Text>
            </VStack>

            {/* Contact Info */}
            <VStack align={["center","start"]} spacing={3}>
              <HStack spacing={3} color="gray.300" align="flex-start" justify={["center","flex-start"]}>
                <Icon as={FaMapMarkerAlt} color="red.400" mt={1} />
                <Box>
                  <Text fontSize="sm">28 bis Immeuble Khalifa</Text>
                  <Text fontSize="sm">Rue Anatôle France</Text>
                  <Text fontSize="sm">El Jadida 24000</Text>
                </Box>
              </HStack>
              <HStack spacing={3} color="gray.300" justify={["center","flex-start"]}>
                <Icon as={FaPhone} color="red.400" />
                <Text fontSize="sm">Fix: 05 23 34 01 3 2</Text>
              </HStack>
              <HStack spacing={3} color="gray.300" justify={["center","flex-start"]}>
                <Icon as={FaPhone} color="red.400" />
                <Text fontSize="sm">Phone1: 06 55 58 31 58</Text>
              </HStack>
              <HStack spacing={3} color="gray.300" justify={["center","flex-start"]}>
                <Icon as={FaPhone} color="red.400" />
                <Text fontSize="sm">Phone2: 06 61 11 88 85</Text>
              </HStack>
              <HStack spacing={3} color="gray.300" justify={["center","flex-start"]}>
                <Icon as={FaEnvelope} color="red.400" />
                <Text fontSize="sm">Email: contact@texascar.ma</Text>
              </HStack>
              <HStack spacing={3} color="gray.300" justify={["center","flex-start"]}>
                <Icon as={FaClock} color="red.400" />
                <Text fontSize="sm">Service Client 24/7</Text>
              </HStack>
            </VStack>
          </VStack>

          {/* Quick Links */}
          <VStack align={["center","start"]} spacing={6} textAlign={["center","left"]}>
            <Text fontSize="lg" fontWeight="bold" color="white">
              Liens Rapides
            </Text>
            <VStack align={["center","start"]} spacing={3}>
              <Link 
                href="/" 
                color="gray.400" 
                _hover={{ color: "red.400" }}
                transition="color 0.2s"
                fontSize="sm"
              >
                Accueil
          </Link>
          <Link
                href="/cars" 
                color="gray.400" 
                _hover={{ color: "red.400" }}
                transition="color 0.2s"
                fontSize="sm"
              >
                Nos Véhicules
          </Link>
          <Link
                href="/about" 
                color="gray.400" 
                _hover={{ color: "red.400" }}
                transition="color 0.2s"
                fontSize="sm"
              >
                À Propos
          </Link>
          <Link
                href="/terms" 
                color="gray.400" 
                _hover={{ color: "red.400" }}
                transition="color 0.2s"
                fontSize="sm"
              >
                Conditions & CGV
          </Link>
          <Link
                href="/profile" 
                color="gray.400" 
                _hover={{ color: "red.400" }}
                transition="color 0.2s"
                fontSize="sm"
              >
                Mes Réservations
          </Link>
            </VStack>
          </VStack>

          {/* Services */}
          <VStack align={["center","start"]} spacing={6} textAlign={["center","left"]}>
            <Text fontSize="lg" fontWeight="bold" color="white">
              Nos Services
            </Text>
            <VStack align={["center","start"]} spacing={3}>
              <HStack spacing={3} color="gray.400">
                <Icon as={FaCar} color="red.400" />
                <Text fontSize="sm">Location Longue Durée</Text>
              </HStack>
              <HStack spacing={3} color="gray.400">
                <Icon as={FaShieldAlt} color="red.400" />
                <Text fontSize="sm">Assurance Tous Risques</Text>
              </HStack>
              <HStack spacing={3} color="gray.400">
                <Icon as={FaCreditCard} color="red.400" />
                <Text fontSize="sm">Paiement Sécurisé</Text>
              </HStack>
              <HStack spacing={3} color="gray.400">
                <Icon as={FaHeadset} color="red.400" />
                <Text fontSize="sm">Support 24/7</Text>
              </HStack>
              <HStack spacing={3} color="gray.400">
                <Icon as={FaCar} color="red.400" />
                <Text fontSize="sm">Livraison à Domicile</Text>
              </HStack>
            </VStack>
          </VStack>

          {/* Newsletter & Social */}
          <VStack align={["center","start"]} spacing={6} textAlign={["center","left"]}>
            <Text fontSize="lg" fontWeight="bold" color="white">
              Suivez-nous
            </Text>
            <Text fontSize="sm" color="gray.400" lineHeight="1.6">
              Restez connecté avec nous pour les dernières offres et actualités.
            </Text>
            
            {/* Social Media Icons */}
            <HStack spacing={3} justify={["center","flex-start"]}>
              <IconButton
                as={Link}
                href="https://www.facebook.com/texascar.ma"
                isExternal
                aria-label="Facebook"
                icon={<FaFacebook />}
                color="gray.400"
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                _hover={{
                  color: "white",
                  bg: "red.600",
                  borderColor: "red.600",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s"
                size="md"
              />
              <IconButton
                as={Link}
                href="https://instagram.com/syluxuryrentals"
                isExternal
                aria-label="Instagram"
                icon={<FaInstagram />}
                color="gray.400"
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                _hover={{
                  color: "white",
                  bg: "red.600",
                  borderColor: "red.600",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s"
                size="md"
              />
              <IconButton
                as={Link}
                href="https://twitter.com/syluxuryrentals"
                isExternal
                aria-label="Twitter"
                icon={<FaTwitter />}
                color="gray.400"
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                _hover={{
                  color: "white",
                  bg: "red.600",
                  borderColor: "red.600",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s"
                size="md"
              />
              <IconButton
                as={Link}
                href="https://wa.me/212661118885"
                isExternal
                aria-label="WhatsApp"
                icon={<FaWhatsapp />}
                color="gray.400"
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                _hover={{
                  color: "white",
                  bg: "green.600",
                  borderColor: "green.600",
                  transform: "translateY(-2px)"
                }}
                transition="all 0.2s"
                size="md"
              />
            </HStack>

            {/* WhatsApp CTA */}
            <Box 
              bg="green.600" 
              p={3} 
              borderRadius="lg"
              textAlign="center"
              w="full"
            >
              <HStack justify="center" spacing={2}>
                <Icon as={FaWhatsapp} />
                <Text fontSize="sm" fontWeight="semibold">
                  Chat WhatsApp
                </Text>
              </HStack>
            </Box>
          </VStack>
        </SimpleGrid>

        {/* Bottom Footer */}
      <Flex
          direction={["column", "row"]} 
          justify="space-between" 
        align="center"
          py={6}
          gap={4}
      >
          <Text fontSize="sm" color="gray.400" textAlign="center">
            © 2024 TEXAS CAR. Tous droits réservés.
          </Text>
          
          <HStack spacing={6} fontSize="sm" color="gray.400">
            <Link 
              href="/privacy" 
              _hover={{ color: "red.400" }}
              transition="color 0.2s"
            >
              Politique de Confidentialité
            </Link>
            <Link 
              href="/terms" 
              _hover={{ color: "red.400" }}
              transition="color 0.2s"
            >
              Conditions d'Utilisation
            </Link>
            <Link 
              href="/cookies" 
              _hover={{ color: "red.400" }}
              transition="color 0.2s"
            >
              Cookies
            </Link>
          </HStack>
      </Flex>
    </Container>
    </Box>
  );
};

export default Footer;
