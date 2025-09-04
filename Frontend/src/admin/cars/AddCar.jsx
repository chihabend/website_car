import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select
} from '@chakra-ui/react';
import axiosClient from "../../context/axiosClient"


function AddCar({isOpen , setisOpen,cars, setcars}) {

    

  const [carData, setCarData] = useState({
    brand: "",
    category:"",
    model: "",
    fuelType: "",
    price: "",
    gearbox: "",
    available: false,
    frontPhoto: null,
    backPhoto: null,
  });


  const handleClose = () => {
    setisOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setCarData((prevData) => ({ ...prevData, [type]: file }));
  };

  const handleAddCar = async () => {
    // Perform the necessary logic to add the car using carData

    console.log("car:", carData);

    if(!carData){
      console.log('required fields')
      return
    }

    try{
      const { data } = await axiosClient.post(
        "http://127.0.0.1:8000/api/cars",
        carData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data)
      setcars([...cars,data])
    
    }catch(e){
      alert('error happen ')
      // console.error(e)

    }

    setisOpen(false);
    
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Car</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Brand</FormLabel>
              <Input
                type="text"
                name="brand"
                value={carData.brand}
                onChange={handleChange}
                placeholder="Enter Brand"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={carData.category}
                onChange={handleChange}
                placeholder="Select category"
              >
                <option value="Mercedes">Mercedes</option>
                <option value="RangeRover">Range Rover</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Audi">Audi</option>
                <option value="Seat">Seat</option>
                <option value="Ford">Ford</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Peugeot">Peugeot</option>
                <option value="Kia">Kia</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Model</FormLabel>
              <Input
                type="text"
                name="model"
                value={carData.model}
                onChange={handleChange}
                placeholder="Enter Model"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Fuel Type</FormLabel>
              <Select
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
                placeholder="Select Fuel Type"
              >
                <option value="gas">Gas</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={carData.price}
                onChange={handleChange}
                placeholder="Enter Price"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Gearbox</FormLabel>
              <Input
                type="text"
                name="gearbox"
                value={carData.gearbox}
                onChange={handleChange}
                placeholder="Enter Gearbox"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Availability</FormLabel>
              <Select
                name="available"
                value={carData.available}
                onChange={handleChange}
                placeholder="Select Availability"
              >
                <option value={true}>Available</option>
                <option value={false}>Not Available</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Front Photo</FormLabel>
              <Input
                type="file"
                name="frontPhoto"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "frontPhoto")}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Back Photo</FormLabel>
              <Input
                type="file"
                name="backPhoto"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "backPhoto")}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleAddCar}>
              Add Car
            </Button>
          </ModalFooter>
           
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddCar;

