import React, { useState } from 'react';
import AddProductForm from '../Forms/AddProductForm';
import DeleteProductForm from '../Forms/DeleteProductForm';
import UpdateProductForm from '../Forms/UpdateProductForm';


function DashboardPage() {
  const [selectedSection, setSelectedSection] = useState(null); 



    const renderContent = () => {
      switch (selectedSection) {
        case 'Product Management':
          return (
            <div>
              <h2>Games Management</h2>
              <div className="product-forms">
                <div className="form-section">
                  <h3>Add Game</h3>
                  <AddProductForm />
                </div>
                <div className="form-section">
                  <h3>Update Game Name</h3>
                  <UpdateProductForm />
                </div>
                <div className="form-section">
                  <h3>Delete Game</h3>
                  <DeleteProductForm />
                </div>
              </div>
            </div>
          );
        default:
          return <p>Select an action from the sidebar.</p>;
      }

    };
      
  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setSelectedSection('Product Management')}>Product Management</li>
          <li onClick={() => setSelectedSection('User Management')}>User Management</li>
          <li onClick={() => setSelectedSection('Sales Analytics')}>Sales Analytics</li>
          <li onClick={() => setSelectedSection('Orders')}>Orders</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default DashboardPage;
