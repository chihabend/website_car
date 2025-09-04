import { Container } from "@chakra-ui/react";
import NavbarTogglerButton from "./navbar-toggler-button";
import NavbarLinks from "./NavbarLinks";
import { useLocation } from "react-router-dom"
import DashboardNav from "./DashboardNav";
import { Link } from "react-router-dom";
import {ArrowBackIcon} from "@chakra-ui/icons"
import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import NavbarLoginButtons from "./navbar-login-buttons";

const Navbar = ({ children }) => {

  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (location.pathname.startsWith("/admin"))  
  return (
    <Container maxWidth="1720px" px={[12, 8, 8]} mt={4}>
      <Link to="/" mt={5}>
        <ArrowBackIcon/> Go Back
      </Link>
    </Container>
  );


  if (location.pathname.startsWith("/dashboard")) return <DashboardNav />;
  

  return (

    <Container maxWidth="1720px" px={[12, 8, 8]}>
     
        <nav className="navbar navbar-expand-lg sticky-top py-3" style={{ zIndex: 1200 }}>
          <NavbarTogglerButton />
          
          <NavbarLinks />
          <div className="ms-lg-auto d-none d-lg-flex align-items-center">
            <NavbarLoginButtons />
          </div>
          {children}
        </nav>

        {showScrollTop && (
          <IconButton
            aria-label="Remonter"
            icon={<ArrowUpIcon />}
            position="fixed"
            bottom="24px"
            right="24px"
            colorScheme="red"
            borderRadius="full"
            zIndex={2000}
            onClick={scrollToTop}
          />
        )}
           
    </Container>

  );
};

export default Navbar;
