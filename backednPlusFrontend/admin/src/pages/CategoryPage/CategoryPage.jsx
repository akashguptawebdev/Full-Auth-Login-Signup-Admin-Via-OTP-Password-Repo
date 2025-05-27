import React from 'react'
import { Outlet } from 'react-router-dom'
export const CategoryContext = React.createContext();
const CategoryPage = () => {
  const categoriesData = [
    {
      id:"155652",
      name: 'Dried food',
      image: '/images/dried-food.png',
      quantity: 1638,
      sale: 20,
      startDate: '20 Nov 2023',
    },
    { id:"155653",
      name: 'Wet food',
      image: '/images/wet-food.png',
      quantity: 1638,
      sale: 20,
      startDate: '20 Nov 2023',
    },
    { id:"155654",
      name: 'Supplemental food',
      image: '/images/supplemental-food.png',
      quantity: 1638,
      sale: 20,
      startDate: '20 Nov 2023',
    },
    { id:"155655",
      name: 'Puppy food',
      image: '/images/puppy-food.png',
      quantity: 1638,
      sale: 20,
      startDate: '20 Nov 2023',
    },
    { id:"155656",
      name: 'Food for adult dogs',
      image: '/images/adult-dog-food.png',
      quantity: 1638,
      sale: 20,
      startDate: '20 Nov 2023',
    },
    { id:"155657",
      name: 'Food for elderly dogs',
      image: '/images/elderly-dog-food.png',
      quantity: 1638,
      sale: 20,
      startDate: '20 Nov 2023',
    },
  ];

  return (
    <CategoryContext.Provider value={{ categoriesData }}>
    <div className="category-page-main-container">
      {/* Common header or sidebar can go here */}
      <Outlet />
    </div>
  </CategoryContext.Provider>
  )
}

export default CategoryPage