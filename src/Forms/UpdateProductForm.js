import React, { useState } from 'react';
import axios from 'axios';

function UpdateProductForm() {
  const token = localStorage.getItem("Token");
  const [formData, setFormData] = useState({
    id:'',
    newGameName: '',
  });
  
  const [loading, setLoading] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
  

    const trimmedId = formData.id.replace(/['"]+/g, '').trim();
  
    try {

      const response = await axios.put(`http://localhost:5125/api/v1/VideoGamesInfo/${trimmedId}?newGameName=${encodeURIComponent(formData.newGameName)}`, 
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
        }
      );
  
      alert('Product updated successfully!');
      // Reset form data
      setFormData({
        id: '',
        newGameName: '',
      });
      
    } catch (error) {
      if (error.response) {
        console.error('Error updating product:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Failed to update product. Please check if the Game ID is correct and try again.'); 
      console.log('Form data being sent:', formData);
    } finally {
      setLoading(false); 
    }
  };
  

  return (
    <form onSubmit={handleFormSubmit}>
      <hr />
      <div className="form-group">
        <label>Game ID:</label>
        <input
          type="text"
          name='id'
          value={formData.id}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>New Game Name:</label>
        <input
          type="text"
          name="newGameName"
          value={formData.newGameName}
          onChange={handleInputChange}  // Use the correct function
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Game'}
      </button>
      <br /><br /><br /><br />
    </form>
  );
}

export default UpdateProductForm;



