import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListOrdersForm() {
    const token = localStorage.getItem("Token");
    const url = "http://localhost:5125/api/v1/Order/all";
    const [orders, setOrders] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getData() {
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then((response) => {
            console.log(response.data); 
            
            
            const ordersData = response.data[0]?.orders || []; 
            setOrders(ordersData);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error.response ? error.response.data : error.message);
            setError("Failed to Fetch Data");
            setLoading(false);
          });
    }
    
    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <hr />
            <h1>List of Orders</h1>
            <ul>
                {orders.length > 0 ? ( 
                    orders.map((order) => (
                        <li key={order.orderId}>
                            <strong>Order ID:</strong> {order.orderId} <br />
                            <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()} <br />
                            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)} <br />
                            <strong>Ordered Games:</strong>
                            <ul>
                                {order.orderedGames.map((game) => (
                                    <li key={game.id}>
                                        Game ID: {game.videoGameVersionID}, Quantity: {game.quantity}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))
                ) : (
                    <li>No orders found.</li> 
                )}
            </ul>
        </div>
    );
}

export default ListOrdersForm;


