import { useEffect, useState } from "react";
import axios from "axios";

export const CarCard = () => {
  const [car, setCar] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars"
      );
      setCar(response.data.cars);
      console.log(response);
    }

    fetchCars();
  }, []);

  return (
    <ul>
      {car.map(
        ({
          id,
          year,
          brand,
          model,
          type,
          img,
          description,
          rentalPrice,
          rentalCompany,
          address,
          mileage,
        }) => (
          <li key={id}>
            <img src={img} alt="" />
            <a href={img} target="_blank" rel="noreferrer noopener">
              {description}
            </a>
          </li>
        )
      )}
    </ul>
  );
};
