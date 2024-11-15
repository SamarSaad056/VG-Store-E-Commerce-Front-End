import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListUsersForm() {
    const token = localStorage.getItem("Token");
    const url = "https://fusiontech1.onrender.com/api/v1/Customer";
    const [customers, setCustomers] = useState([]);
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
            setCustomers(response.data.customers); 
            setLoading(false);
          })
          .catch((error) => {
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
            <hr/>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.personId}>
                        <strong>Name:</strong> {customer.personName} <br />
                        <strong>Email:</strong> {customer.personEmail} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListUsersForm;

