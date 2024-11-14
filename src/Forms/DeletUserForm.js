// DeleteProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

function DeleteUserForm() {
  const [personId, setpersonId] = useState('');
  const token = localStorage.getItem("Token");
  const parsedPersonId = parseInt(personId, 10);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5125/api/v1/SystemAdmin`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
          },
          params :{
            personId
          }
        });
      alert('User deleted successfully!');
      setpersonId('');
    } catch (error) {
      console.error('Error deleting User:', error);
      alert('Failed to delete User.');
    }
  };

  return (
    <form onSubmit={handleDelete}>
       <hr/>
       <div className="form-group">
      <label>User ID:</label>
      <input
        type="number"
        value={personId}
        onChange={(e) => setpersonId(e.target.value)}
        required
      /></div>
      <button type="submit">Delete User</button>
      <br/><br/><br/><br/>
    </form>
  );
}

export default DeleteUserForm;