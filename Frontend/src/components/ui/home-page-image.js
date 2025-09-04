import { Box, Flex, Hide, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const HomePageImage = () => {
  const professionalAnimation = {
    y: [0, -10, 0, -6, 0],
    x: [0, 6, 0, -4, 0],
    rotate: [0, 0.8, 0, -0.4, 0],
    scale: [1, 1.01, 1, 1.005, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1]
    }
  };

  const entranceAnimation = {
    initial: { opacity: 0, y: 40, scale: 0.9, rotate: -3 },
    animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
    transition: { duration: 1, ease: "easeOut" }
  };

  return (
    <Hide below="md">
      <Flex w={["100%","50%","60%","65%"]} alignItems="center" position="relative">
        {/* Fond dégradé adaptatif */}
        <Box
          position="absolute"
          top={["10%",0]}
          bottom={["10%",0]}
          right={["-5%","5%"]}
          left={["5%","10%"]}
          borderRadius="2xl"
          bg="linear-gradient(90deg, rgba(220,38,38,1) 0%, rgba(0,0,0,1) 100%)"
          filter="blur(0px)"
        />
        {/* Image voiture */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={entranceAnimation}
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <motion.div animate={professionalAnimation}>
            <Image
              src="assets/images/rng.png"
              alt="Voiture"
              loading="lazy"
              maxW={["90%","90%","85%","80%"]}
              objectFit="contain"
              mx="auto"
              filter="auto"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3)) brightness(1.05) contrast(1.05)" }}
            />
          </motion.div>
        </motion.div>
      </Flex>
    </Hide>
  );
};

export default HomePageImage;
