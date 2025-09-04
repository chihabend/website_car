import { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../context/axiosClient";
import { useStateContext } from "../../context/ContextProvider";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useStateContext();
  const toast = useToast();
  const toastMessage = (message, type = "error", title = "Erreur") => {
    return toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const firstname = useRef();
  const lastname = useRef();
  const telephone = useRef();
  const email = useRef();
  const password = useRef();

  function createUserAcccount(e) {
    e.preventDefault();
    const payload = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      telephone: telephone.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    axiosClient
      .post("http://127.0.0.1:8000/api/signup", payload)
      .then(({ data }) => {
        toastMessage("Votre compte a été créé avec succès.", "success", "Compte créé");
        setUser(data.user);
        setToken(data.token);
        navigate("/cars");
      })
      .catch((error) => {
        toastMessage(error?.response?.data?.message || "Une erreur est survenue");
      });
  }

  return (
    <form onSubmit={createUserAcccount} style={{ width: "100%" }}>
      <div className="form-modern-title">Créer un compte</div>
      <input
        className="form-modern-input"
        name="firstname"
        type="text"
        ref={firstname}
        placeholder="Prénom"
      />
      <input
        className="form-modern-input"
        name="lastname"
        type="text"
        ref={lastname}
        placeholder="Nom"
      />
      <input
        className="form-modern-input"
        name="telephone"
        type="tel"
        ref={telephone}
        placeholder="Téléphone"
      />
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
        Créer mon compte
      </button>
    </form>
  );
};

export default SignUpForm;
