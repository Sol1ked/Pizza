import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://650ec8a054d18aabfe9976df.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (e) {
        alert(e);
        navigate('/');
      }
    }

    fetchData();
  }, []);

  if (!pizza) {
    return 'идет загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza-image" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
