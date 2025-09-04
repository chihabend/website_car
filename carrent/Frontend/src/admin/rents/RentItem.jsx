import React from "react";
import { Tr, Td, IconButton, Image } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import axiosClient from "../../context/axiosClient";

const RentItem = ({ rent }) => {
  const downloadRent = async (id, firstname) => {
    try {
      console.log("Attempting to download rent invoice..."); // Log for debugging
      const response = await axiosClient.get(`/rents/${id}/download-rent`, {
        responseType: "blob",
      });

      // Check if the response data is a Blob
      if (response.data && response.data instanceof Blob) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${firstname}_rent_facture.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        console.log("Rent invoice downloaded successfully."); // Log for debugging
      } else {
        console.error("The response data is not a Blob."); // Log for debugging
      }
    } catch (e) {
      console.error("Error downloading rent invoice:", e);
    }
  };

  return (
    <Tr>
      <Td>{rent.id}</Td>
      <Td>
        <Image
          className="first"
          objectFit="cover"
          h={"50px"}
          w={"80px"}
          src={`http://localhost:8000/images/${rent.photo}`}
          loading="lazy"
          borderRadius="10px"
        />
      </Td>
      <Td>{rent.brand}</Td>
      <Td>{rent.price}</Td>
      <Td>{rent.firstname}</Td>
      <Td>{rent.telephone}</Td>
      <Td>{rent.rental_date}</Td>
      <Td>{rent.return_date}</Td>
      <Td className="text-bold">{rent.total} MAD</Td>
      <Td>
        <IconButton
          bg={""}
          _hover={{ bg: "red", color: "white" }}
          ml={1}
          aria-label="download"
          icon={<DownloadIcon />}
          onClick={() => downloadRent(rent.id, rent.firstname)}
        />
      </Td>
    </Tr>
  );
};

export default RentItem;
