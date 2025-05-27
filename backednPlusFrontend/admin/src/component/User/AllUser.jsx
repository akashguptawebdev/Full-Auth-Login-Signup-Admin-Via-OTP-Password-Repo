import React, { useContext, useState } from "react";
import "./AllUser.scss";
import { FiSearch } from "react-icons/fi";
import { UserContext } from "../../pages/user/UserPage";
import NavigateBack from "../NavigateBack";

const AllUser = () => {
  const { users } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users?.filter((user) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(lowerSearch) ||
      user.email?.toLowerCase().includes(lowerSearch) ||
      user.phone?.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <>
      <NavigateBack pageName="Users Table" />
      <div className="add-attribute-page">
        <div className="header">
          <div className="breadcrumb">
            <span>Dashboard</span> &gt; <span>User</span> &gt; All User
          </div>
        </div>

        <div className="table-card">
          <div className="top-bar">
            <div className="search-box">
              <FiSearch />
              <input
                type="text"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, index) => (
                <tr key={index}>
                  <td className="user-cell">
                    <img src={user.image} alt={user.name} />
                    <div>
                      <p className="name">{user.name}</p>
                      <p className="product">Product name</p>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="user-cards">
            {filteredUsers?.map((user, index) => (
              <div className="user-card" key={index}>
                <div className="card-header">
                  <img src={user.image} alt={user.name} />
                  <div>
                    <p className="name">{user.name}</p>
                    <p className="product">Product name</p>
                  </div>
                </div>
                <div className="card-body">
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUser;
