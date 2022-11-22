import axios from 'axios';
import {  useEffect, useState } from 'react';
import Card from '../components/card/Card';

function Orders() {
   const [orders, setOrders] = useState([]);
   const [isLoading, setIsLoading] = useState(true);


   useEffect(() => {
      (async() => {
         try {
            const { data } = await axios.get('https://6377f1615c4777651229e93a.mockapi.io/orders');
            setOrders(data.map((obj) => obj.items).flat());
            setIsLoading(false);
         } catch (error) {
            alert('Ошибка при запросу заказов');
            console.log(error);
         }
      })()
   }, [])

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>Мои заказы</h1>
         </div>

         <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(10)] : orders).map((item, i) => (
            <Card 
               key={i} 
               loading={isLoading}
               {...item}
            />
            ))} 
         </div>
      </div>
   )
}

export default Orders;
