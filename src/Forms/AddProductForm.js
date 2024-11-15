// AddProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AddProductForm() {

  const token = localStorage.getItem("Token");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    gameName: '',
    description: '',
    yearOfRelease: '',
    totalRating: '',
    publisherId: '',
    gamePicturePath: '',
    categoryIds: [],
    gameStudioIds: [],
    videoGameVersions: [{
      gameConsoleId: '',
      price: ''
    }]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://fusiontech1.onrender.com/api/v1/VideoGamesInfo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (response.data) {
        alert("Game Added");
        setSuccessMessage("Game added successfully!"); 
        setErrorMessage(''); 
        console.log("Stored Token:", localStorage.getItem("Token"));


          // Reset the form
          setFormData({
            gameName: '',
            description: '',
            yearOfRelease: '',
            totalRating: '',
            publisherId: '',
            gamePicturePath: '',
            categoryIds: [],
            gameStudioIds: [],
            videoGameVersions: [{
              gameConsoleId: '',
              price: ''
            }]
          });
       
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    
    <form onSubmit={handleFormSubmit}>
      <hr/>
      <div className="form-group">
      <label> Game Name:</label>
      <input
        type="text"
        name="gameName"
        value={formData.gameName}
        onChange={handleInputChange}
        required
      /> 
      </div>
      <div className="form-group">
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        
      /></div>
      
      <div className="form-group">
      <label>Year of Release:</label>
      <input
        type="text"
        name="yearOfRelease"
        value={formData.yearOfRelease}
        onChange={handleInputChange}
        
      /></div>
      <div className="form-group">
      <label>Total Rating:</label>
      <input
        type="text"
        name="totalRating"
        value={formData.totalRating}
        onChange={handleInputChange}
        required
      /></div>
      <div className="form-group">
      <label>Publisher ID:</label>
      <input
        type="text"
        name="publisherId"
        value={formData.publisherId}
        onChange={handleInputChange}
        required
      /></div>
      <div className="form-group">
      <label>Game Picture Path:</label>
      <input
        type="text"
        name="gamePicturePath"
        value={formData.gamePicturePath}
        onChange={handleInputChange}
        
      /></div>
   <div className="form-group">
        <label>Category IDs (comma separated):</label>
        <input
          type="text"
          name="categoryIds"
          value={formData.categoryIds.join(', ')} // Join to display as comma separated
          onChange={(e) => setFormData({
            ...formData,
            categoryIds: e.target.value.split(',').map(id => id.trim()) // Convert to array
          })}
          required
        />
      </div>
      <div className="form-group">
        <label>Game Studio IDs (comma separated):</label>
        <input
          type="text"
          name="gameStudioIds"
          value={formData.gameStudioIds.join(', ')} // Join to display as comma separated
          onChange={(e) => setFormData({
            ...formData,
            gameStudioIds: e.target.value.split(',').map(id => id.trim()) // Convert to array
          })}
          required
        />
      </div>
      <div className="form-group">
        <label>Game Console ID:</label>
        <input
          type="text"
          name="gameConsoleId"
          value={formData.videoGameVersions[0].gameConsoleId} // Accessing nested state
          onChange={(e) => setFormData({
            ...formData,
            videoGameVersions: [{
              ...formData.videoGameVersions[0],
              gameConsoleId: e.target.value // Update nested state
            }]
          })}
          required
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.videoGameVersions[0].price} // Accessing nested state
          onChange={(e) => setFormData({
            ...formData,
            videoGameVersions: [{
              ...formData.videoGameVersions[0],
              price: parseFloat(e.target.value) // Update nested state
            }]
          })}
          required
        />
      </div>
      <button type="submit">Add Game</button>
      <br/><br/><br/><br/>
    </form>
  );
}

export default AddProductForm;

