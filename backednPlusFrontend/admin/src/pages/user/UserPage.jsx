import React from 'react'
import { Outlet } from 'react-router-dom';
export const users = [
    {
      name: "Kristin Watson",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      phone: "+1 (555) 123-4567",
      email: "kristin.watson@example.com"
    },
    {
      name: "Cameron Williamson",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      phone: "+1 (555) 234-5678",
      email: "cameron.williamson@example.com"
    },
    {
      name: "Leslie Alexander",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      phone: "+1 (555) 345-6789",
      email: "leslie.alexander@example.com"
    },
    {
      name: "Darrell Steward",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      phone: "+1 (555) 456-7890",
      email: "darrell.steward@example.com"
    },
    {
      name: "Kathryn Murphy",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      phone: "+1 (555) 567-8901",
      email: "kathryn.murphy@example.com"
    },
    {
      name: "Ronald Richards",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      phone: "+1 (555) 678-9012",
      email: "ronald.richards@example.com"
    },
    {
      name: "Savannah Nguyen",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      phone: "+1 (555) 789-0123",
      email: "savannah.nguyen@example.com"
    },
    {
      name: "Jacob Jones",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      phone: "+1 (555) 890-1234",
      email: "jacob.jones@example.com"
    },
    {
      name: "Eleanor Pena",
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      phone: "+1 (555) 901-2345",
      email: "eleanor.pena@example.com"
    },
    {
      name: "Courtney Henry",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
      phone: "+1 (555) 012-3456",
      email: "courtney.henry@example.com"
    },
    {
      name: "Wade Warren",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      phone: "+1 (555) 234-1234",
      email: "wade.warren@example.com"
    },
    {
      name: "Theresa Webb",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      phone: "+1 (555) 345-2345",
      email: "theresa.webb@example.com"
    },
    {
      name: "Guy Hawkins",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
      phone: "+1 (555) 456-3456",
      email: "guy.hawkins@example.com"
    },
    {
      name: "Jenny Wilson",
      image: "https://randomuser.me/api/portraits/women/14.jpg",
      phone: "+1 (555) 567-4567",
      email: "jenny.wilson@example.com"
    },
    {
      name: "Esther Howard",
      image: "https://randomuser.me/api/portraits/women/15.jpg",
      phone: "+1 (555) 678-5678",
      email: "esther.howard@example.com"
    },
    {
      name: "Bessie Cooper",
      image: "https://randomuser.me/api/portraits/women/16.jpg",
      phone: "+1 (555) 789-6789",
      email: "bessie.cooper@example.com"
    },
    {
      name: "Marvin McKinney",
      image: "https://randomuser.me/api/portraits/men/17.jpg",
      phone: "+1 (555) 890-7890",
      email: "marvin.mckinney@example.com"
    },
    {
      name: "Darlene Robertson",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
      phone: "+1 (555) 901-8901",
      email: "darlene.robertson@example.com"
    },
    {
      name: "Ralph Edwards",
      image: "https://randomuser.me/api/portraits/men/19.jpg",
      phone: "+1 (555) 012-9012",
      email: "ralph.edwards@example.com"
    },
    {
      name: "Annette Black",
      image: "https://randomuser.me/api/portraits/women/20.jpg",
      phone: "+1 (555) 123-0123",
      email: "annette.black@example.com"
    }
  ];
export const UserContext = React.createContext();
const UserPage = () => {
  return (
    <UserContext.Provider value={{users }}>
      <div className="product-page-main-container">
        <Outlet />
      </div>
    </UserContext.Provider>
  )
}

export default UserPage