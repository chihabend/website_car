import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../../context/axiosClient";
import { useStateContext } from "../../context/ContextProvider";

const LoginForm = () => {
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const toast = useToast();
  const toastMessage = (message, type = "error", title = "Erreur") => {
    return toast({
      title: title,
      description: message,
      status: type,
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  };

  const email = useRef();
  const password = useRef();

  function Login(e) {
    e.preventDefault();
    if (!email.current.value || !password.current.value) {
      return toastMessage(
        "L’e-mail et le mot de passe sont requis",
        "error",
        "Champs vides"
      );
    }
    const payload = {
      email: email.current.value,
      password: password.current.value,
    };
    axiosClient
      .post("http://127.0.0.1:8000/api/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        toastMessage("Bienvenue sur TEXAS CAR", "success", "Connexion réussie");
        navigate("/cars");
      })
      .catch((error) => {
        toastMessage(error?.response?.data?.message || "Identifiants invalides");
      });
  }

  return (
    <form onSubmit={Login} style={{ width: "100%" }}>
      <div className="form-modern-title">Connexion</div>
      <input
        className="form-modern-input"
        name="email"
        type="email"
        ref={email}
        placeholder="E-mail"
      />
      <input
        className="form-modern-input"
        name="password"
        type="password"
        ref={password}
        placeholder="Mot de passe"
      />
      <button className="form-modern-btn" type="submit">
        Se connecter
      </button>
    </form>
  );
};

export default LoginForm;
