// UpdateProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

function UpdateProductForm() {
  const token = localStorage.getItem("Token");
  const [formData, setFormData] = useState({
    videoGameInfoId: '',
    gameName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5125/api/v1/VideoGamesInfo/${formData.videoGameInfoId}`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Product updated successfully!');
      setFormData({
        videoGameInfoId: '',
        gameName: '',
   
      });
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
     <hr/>
     <div className="form-group">
     <label>Game ID:</label>
      <input
        type="text"
        name='videoGameInfoId'
        value={formData.videoGameInfoId}
        onChange={handleInputChange}
        required
      /></div>
 <div className="form-group">
   <label> New Game Name:</label>
      <input
        type="text"
        name="gameName"
        value={formData.gameName}
        onChange={handleInputChange}
        required
      />
       </div>
      <button type="submit">Update Game</button>
      <br/><br/><br/><br/>
    </form>
  );
}

export default UpdateProductForm;
