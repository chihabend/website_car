import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Icon,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaTimesCircle, FaHome, FaUser, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <Container maxW="container.md" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={8} textAlign="center">
          <Icon as={FaTimesCircle} boxSize={20} color="red.500" />
          
          <VStack spacing={4}>
            <Heading size="2xl" color="red.600">
              Paiement annulé
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Votre paiement a été annulé. Votre réservation reste en attente de paiement.
            </Text>
          </VStack>

          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Réservation en attente</AlertTitle>
              <AlertDescription>
                Votre réservation a été créée mais le paiement n'a pas été finalisé. 
                Vous pouvez payer en personne ou réessayer le paiement en ligne.
              </AlertDescription>
            </Box>
          </Alert>

          <Box
            bg="gray.50"
            p={6}
            borderRadius="lg"
            w="full"
            maxW="md"
          >
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="gray.700">
                Options de paiement
              </Heading>
              <Text fontSize="sm" color="gray.600">
                • Paiement en ligne via carte bancaire<br/>
                • Paiement en personne à notre agence<br/>
                • Virement bancaire
              </Text>
            </VStack>
          </Box>

          <VStack spacing={4} w="full" maxW="md">
            <Button
              leftIcon={<FaUser />}
              colorScheme="red"
              size="lg"
              w="full"
              onClick={() => navigate('/profile')}
            >
              Voir mes réservations
            </Button>
            
            <Button
              leftIcon={<FaCreditCard />}
              variant="outline"
              size="lg"
              w="full"
              onClick={() => navigate('/cars')}
            >
              Nouvelle réservation
            </Button>
            
            <Button
              leftIcon={<FaHome />}
              variant="ghost"
              size="lg"
              w="full"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
          </VStack>

          <Text fontSize="sm" color="gray.500">
            Pour toute question, contactez-nous au +212 6 12 34 56 78
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  );
}

export default PaymentCancelPage; 