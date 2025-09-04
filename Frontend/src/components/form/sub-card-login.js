import { Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SubCardLogin = ({
  textHoverColor = "",
  bgColor,
  question,
  route,
  btnText,
}) => {
  return (
    <div
    style={{
      backgroundImage: `url(/assets/images/ADc.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
      className={
        " p-4 text-white text-center d-flex align-items-center order-md-last"
      }
    >
      <div className="p-lg-5 p-md-0 p-4 w-100">
        <Heading fontFamily="" fontWeight="500" mb={3} lineHeight={1.2}>
          Bienvenue chez <br/>TEXAS CAR
        </Heading>
        <Text mb={6}>{question} ?</Text>
        
        <Link to={route} className={textHoverColor + " subcard-btn-outline"}>
          {btnText}
        </Link>
      </div>
    </div>
  );
};

export default SubCardLogin;