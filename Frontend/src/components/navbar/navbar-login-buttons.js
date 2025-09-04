import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { HStack,Button } from "@chakra-ui/react";
import axiosClient from "../../context/axiosClient";
import { useEffect } from "react";

const NavbarLoginButtons = () => {

  const { token, setToken , setUser } = useStateContext()

  const navigate = useNavigate();


  useEffect(() => {
    if(token){
      axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
    }
  },[])

  const logout = async(e)=>{
      e.preventDefault()


      await axiosClient.post('http://127.0.0.1:8000/api/logout')
      setToken(null)
      setUser({})
      navigate('/')

  }

 
  return (
    <div className="login-buttons d-flex align-items-center">
      {token ?
        <HStack spacing={2} className="ms-lg-3 mt-3 mt-lg-0">
            <Button
              color={"gray.600"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              leftIcon={<MdAccountCircle color="gray" />}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              color={"gray.600"}
              colorScheme={"blackAlpha"}
              variant="ghost"
              leftIcon={<MdLogout color="gray" />}
              onClick={(e) => logout(e)}
            >
              Logout
            </Button>
          </HStack>
          :
          <div className="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
            <button
              type="button"
              style={{backgroundColor:"black",color:"white", padding:"10px", borderRadius:'15px' , marginRight:"5px"}}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              type="button"
              style={{backgroundColor:"red", color:"white", padding:"10px", borderRadius:'15px' }}
              onClick={() => navigate("/signup")}
            >
              Sign up for free
            </button> 
          </div>
      }
      
    </div>
  );
};

export default NavbarLoginButtons;
