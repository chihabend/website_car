import { Center, VStack, Text, Image } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Center minH="60vh" w="100%">
      <VStack spacing={4}>
        <Image
          src="/assets/images/Logo.png"
          alt="Chargement TEXAS CAR"
          boxSize={["90px","110px","130px"]}
          objectFit="contain"
          className="loading-logo"
        />
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="red.600"
          letterSpacing={1}
          textAlign="center"
          as="span"
          className="loading-text"
        >
          Chargement...
        </Text>
        <style>{`
          .loading-logo { animation: floatPulse 1.6s ease-in-out infinite; }
          .loading-text { animation: pulse 1.4s ease-in-out infinite; }
          @keyframes floatPulse {
            0% { transform: translateY(0) scale(1); filter: drop-shadow(0 6px 12px rgba(0,0,0,0.08)); }
            50% { transform: translateY(-4px) scale(1.04); filter: drop-shadow(0 10px 18px rgba(0,0,0,0.12)); }
            100% { transform: translateY(0) scale(1); filter: drop-shadow(0 6px 12px rgba(0,0,0,0.08)); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}</style>
      </VStack>
    </Center>
  );
};

export default LoadingSpinner;
