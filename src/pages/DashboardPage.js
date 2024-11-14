import React, { useState } from 'react';
import AddProductForm from '../Forms/AddProductForm';
import DeleteProductForm from '../Forms/DeleteProductForm';
import UpdateProductForm from '../Forms/UpdateProductForm';
import DeleteUserForm from '../Forms/DeletUserForm';
import ListUsersForm from '../Forms/ListUsersForm';
import ListOrdersForm from '../Forms/ListOrdersForm';


function DashboardPage () {
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
          case 'User Management':{
            return (
              <div>
                <h2>Users Management</h2>
                <div className="product-forms">
                  <div className="form-section">
                    <h3>Users List</h3>
                    <ListUsersForm/>
                  </div>
                  <div className="form-section">
                    <h3>Delete User</h3>
                    <DeleteUserForm />
                  </div>
                </div>
              </div>
            )

          }
          case 'Orders':{
            return (
              <div>
                <h2>Orders Management</h2>
                  <div className="form-section">
                    <h3>Orders List</h3>
                    <ListOrdersForm/>
                  </div>
                </div>
             
            )

          }


          

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

export default DashboardPage
