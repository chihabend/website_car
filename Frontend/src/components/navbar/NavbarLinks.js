import { Link } from "react-router-dom";
import axiosClient from "../../context/axiosClient";
import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const NavbarLinks = () => {
  const { token, setToken , setUser } = useStateContext()
  useEffect(() => {
    if(token){
      axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
    }
  },[])
  const navigate = useNavigate();
  const logout = async(e)=>{
    e.preventDefault()


    await axiosClient.post('http://127.0.0.1:8000/api/logout')
    setToken(null)
    setUser({})
    navigate('/')

}
  return (
    <div className="collapse navbar-collapse mt-lg-0 mt-4 justify-content-lg-start justify-content-center text-center text-lg-start w-100" id="navbarLinks">
      {/* Logo visible uniquement en mobile, centré au-dessus des liens */}
      <div className="d-lg-none w-100 d-flex justify-content-center mb-3">
        <img src="/assets/images/Logo.png" alt="TEXAS CAR" style={{ height: 40 }} />
      </div>
      {token ? <ul className="navbar-nav me-lg-auto mx-auto mx-lg-0 text-center text-lg-start">
        <li className="nav-item mx-2 my-2">
          <Link className="nav-link" to="/">
            Accueil
          </Link>
        </li>
        <li className="nav-item mx-2 my-2">
          <Link className="nav-link" to="/cars">
            Réserver
          </Link>
        </li>
        <li className="nav-item mx-2 my-2">
          <Link className="nav-link" to="/about">
            À Propos
          </Link>
        </li>
        <li className="nav-item mx-2 my-2">
          <Link className="nav-link" to="/terms">
            Conditions
          </Link>
        </li>
        <li className="nav-item mx-2 my-2">
          <Link className="nav-link" to="/profile">
            Mes Réservations
          </Link>
        </li>
      </ul>:
      <ul className="navbar-nav me-lg-auto mx-auto mx-lg-0 text-center text-lg-start">
      <li className="nav-item mx-2 my-2">
        <Link className="nav-link" to="/">
          Accueil
        </Link>
      </li>
      <li className="nav-item mx-2 my-2">
        <Link className="nav-link" to="/cars">
          Réserver
        </Link>
      </li>
      <li className="nav-item mx-2 my-2">
        <Link className="nav-link" to="/about">
          À Propos
        </Link>
      </li>
      <li className="nav-item mx-2 my-2">
        <Link className="nav-link" to="/terms">
          Conditions
        </Link>
      </li>
      
    </ul>}
    </div>
  );
};

export default NavbarLinks;
