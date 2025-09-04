import { Center, Box } from "@chakra-ui/react";
import Card from "../components/form/card";
import SubCardLogin from "../components/form/sub-card-login";
import LoginForm from "../components/form/login-form";

function Login() {
  return (
    <Box py={[8, 12]} px={[4, 6]} bgGradient="linear(to-b, blackAlpha.50, transparent)">
      <Center>
        <Card>
          <SubCardLogin
            textHoverColor="text-red"
            bgColor="bg-primary"
            route="/signup"
            question="Vous n’avez pas de compte"
            btnText="Créer un compte"
          />
          <LoginForm />
        </Card>
      </Center>
    </Box>
  );
}

export default Login;
