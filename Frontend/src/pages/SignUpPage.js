import { Center, Box } from "@chakra-ui/react";
import Card from "../components/form/card";
import SubCard from "../components/form/sub-card";
import SignUpForm from "../components/form/signup-form";

function SignUp() {
  return (
    <Box py={[8, 12]} px={[4, 6]} bgGradient="linear(to-b, blackAlpha.50, transparent)">
      <Center>
        <Card>
          <SubCard
            textHoverColor="text-orange"
            bgColor="bg-secondary"
            route="/login"
            question="Déjà inscrit"
            btnText="Se connecter"
          />
          <SignUpForm />
        </Card>
      </Center>
    </Box>
  );
}

export default SignUp;
