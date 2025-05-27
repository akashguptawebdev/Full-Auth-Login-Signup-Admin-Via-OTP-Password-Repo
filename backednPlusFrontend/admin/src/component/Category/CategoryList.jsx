import React, { useContext, useState } from 'react';
import './CategoryList.scss';
import NavigateBack from '../NavigateBack';
import { CategoryContext } from '../../pages/CategoryPage/CategoryPage';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const {categoriesData} = useContext(CategoryContext)
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate()

  const filteredCategories = categoriesData?.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories?.length / itemsPerPage);
  const paginatedCategories = filteredCategories?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const HandleNavigate = (categoryId)=>{
    navigate(`/category/edit/${categoryId}`);
  }
 

  return (
    <>
    <NavigateBack pageName={"Category Table"}/>
    <div className="category-list-container">
      <div className="header">
        <button className="add-new-btn">+ Add new</button>
      </div>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search by category name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page on search
          }}
        />
      </div>

      <div className="table-wrapper">
        <table className="category-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Quantity</th>
              <th>Sale</th>
              <th>Start date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories?.map((cat, index) => (
                
              <tr key={index} onClick={()=> HandleNavigate(cat.id)}>
                <td>
                  <div className="category-cell">
                    <img src={cat.image} alt={cat.name} />
                    <span>{cat.name}</span>
                  </div>
                </td>
                <td>{cat.quantity.toLocaleString()}</td>
                <td>{cat.sale}</td>
                <td>{cat.startDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default CategoryList;
