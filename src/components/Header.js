import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import MenuIcon from '@mui/icons-material/Menu';
import {  Flex, Divider, useDisclosure } from '@chakra-ui/react';
import { useMediaQuery, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from '@chakra-ui/react';
import AddExpense from "./AddExpense";
import ViewExpense from "./ViewExpense";
import AddCategory from "./AddCategory";
import ViewBudget from "./ViewBudget";

const links=[
  {name:"Add Expense",to:"/add/expense",element:"<AddExpense/>"},
  {name:"View Expense",to:"/view/expense",element:"<ViewExpense/>"},
  {name:"Add Category",to:"/add/category",element:"<AddCategory/>"},
  {name:"View Budget",to:"/view/budget",element:"<ViewBudget/>"},
]

const Header = () => {
  const navigate = useNavigate();
  const [showMenu,setShowMenu]=useState(false);
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };

  const logOut = () => {
    window.localStorage.removeItem('user.token');
    navigate("/");
  };
  
  const menuItems=links.map((item,index)=>{
    return(
      <>
        <Link to={item.to} element={item.element} className="navbar-brand" style={{marginTop:"10px",marginBottom:"10px"}}>{item.name} </Link>
        {isMobile && index<links.length-1 && <Divider my={2} />}
      </>
    )
  })
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/home" element={<Home/>} className="navbar-brand">
            {isMobile?"EMS":"Expense Management System"}
          </Link>

          {
            isMobile?(
              <>
                <Flex alignItems="center">
                  <MenuIcon onClick={onOpen} style={{ cursor: "pointer", color: "white", fontSize: "24px", marginRight: "10px" }} />
                  <Drawer  placement="right" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay/>
                    <DrawerContent  style={{backgroundColor:"#7faec5"}} color="black" fontSize="20px">
                      <DrawerCloseButton />
                      <DrawerBody>
                        <Flex flexDirection="column" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "50px" }}>
                          {menuItems}
                        </Flex>
                        <button style={{marginTop:"50px"}} className="form-control me-2 btn btn-danger" type="submit" onClick={logOut}>
                          LogOut
                        </button>
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                </Flex>
              </>
            ):(
              <>
              <form className="d-flex">
                {menuItems}
                <button className="form-control m-2 btn btn-danger " type="submit" onClick={logOut}>
                  LogOut
                </button>
              </form>
              </>
            )
          }
        </div>
      </nav>  
    </>
  );
};

export default Header;
