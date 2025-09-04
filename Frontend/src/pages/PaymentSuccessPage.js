import React, { useEffect, useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { FaCheckCircle, FaDownload, FaHome, FaUser } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStateContext } from '../context/ContextProvider';

const MotionBox = motion(Box);

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const toast = useToast();

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (!sessionId) {
        toast({
          title: "Erreur",
          description: "Session de paiement invalide",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate('/profile');
        return;
      }

      try {
        // Ici vous pouvez appeler votre API pour confirmer le paiement
        // Pour l'instant, on simule un succès
        setPaymentDetails({
          sessionId,
          amount: "Calculé automatiquement",
          date: new Date().toLocaleDateString('fr-FR'),
        });
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Erreur lors de la confirmation du paiement",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate('/profile');
      }
    };

    handlePaymentSuccess();
  }, [sessionId, navigate, toast]);

  if (isLoading) {
    return (
      <Container maxW="container.md" py={20}>
        <VStack spacing={8}>
          <Text>Confirmation du paiement en cours...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={8} textAlign="center">
          <Icon as={FaCheckCircle} boxSize={20} color="green.500" />
          
          <VStack spacing={4}>
            <Heading size="2xl" color="green.600">
              Paiement réussi !
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Votre réservation a été confirmée et payée avec succès.
            </Text>
          </VStack>

          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Réservation confirmée</AlertTitle>
              <AlertDescription>
                Vous recevrez un email de confirmation avec tous les détails de votre réservation.
              </AlertDescription>
            </Box>
          </Alert>

          {paymentDetails && (
            <Box
              bg="gray.50"
              p={6}
              borderRadius="lg"
              w="full"
              maxW="md"
            >
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.700">
                  Détails du paiement
                </Heading>
                <Box>
                  <Text fontSize="sm" color="gray.500">Session ID</Text>
                  <Text fontWeight="semibold">{paymentDetails.sessionId}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">Montant</Text>
                  <Text fontWeight="semibold">{paymentDetails.amount}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="gray.500">Date</Text>
                  <Text fontWeight="semibold">{paymentDetails.date}</Text>
                </Box>
              </VStack>
            </Box>
          )}

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
              leftIcon={<FaHome />}
              variant="outline"
              size="lg"
              w="full"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
            </Button>
          </VStack>

          <Text fontSize="sm" color="gray.500">
            Merci de votre confiance en TEXAS CAR !
          </Text>
        </VStack>
      </MotionBox>
    </Container>
  );
}

export default PaymentSuccessPage; 