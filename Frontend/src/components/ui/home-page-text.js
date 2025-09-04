import { Heading, Text, Box, Image } from "@chakra-ui/react";

const HomePageText = () => {
  return (
    <>
      <Heading size={["lg","xl","2xl"]} >
        <Box display="flex" justifyContent="center" alignItems="center" mb={[1,2,4]}>
          <Image src="/assets/images/Logo.png" alt="Logo" w={["160px","200px","260px","300px"]} h="auto" />
        </Box>
        <Text as="span" color="red">
          Partez au volant
        </Text>{" "}
        avec les meilleures offres de location aujourd'hui.
      </Heading>
      <Text pr={[0,0,"10%"]}  mt={[2,3,4]}>
        Découvrez notre large gamme de véhicules, proposés à des prix attractifs au quotidien.
      </Text>
    </>
  );
};

export default HomePageText;
