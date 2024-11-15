// DeleteProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

function DeleteProductForm() {
  const [productId, setProductId] = useState('');
  const token = localStorage.getItem("Token");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://fusiontech1.onrender.com/api/v1/VideoGamesInfo/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );
      alert('Product deleted successfully!');
      setProductId('');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <form onSubmit={handleDelete}>
       <hr/>
       <div className="form-group">
      <label>Game ID:</label>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        required
      /></div>
      <button type="submit">Delete Game</button>
      <br/><br/><br/><br/>
    </form>
  );
}

export default DeleteProductForm;
