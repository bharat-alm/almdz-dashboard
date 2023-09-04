import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
// import photo from '../../assets/visible.svg'
import SidebarComponent from "../Sidebar/Sidenav";
import { GiHamburgerMenu } from "react-icons/gi";
import { Image } from "react-bootstrap";
import { Icon } from "@iconify/react";
import adminIcon from "@iconify/icons-subway/admin";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
const NavbarComponent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    console.log("logout");
  };
  return (
    <>
      <Navbar
        bg="light"
        variant="dark"
        fixed="top"
        className="justify-content-between"
      >
        <div>
          <Button variant="outline-none" onClick={toggleSidebar}>
            <GiHamburgerMenu />
          </Button>
          <Navbar.Brand href="#">
            <Image src={logo} width={90} />
          </Navbar.Brand>
        </div>

        <Nav className="ml-auto">
          {/* <Image src={photo} roundedCircle width={40} height={40} /> */}
          {/* <Icon icon={adminIcon} width={30} roundedCircle /> */}

          <Link to={"/"} onClick={handleLogout}>Logout</Link>
        </Nav>
      </Navbar>
      <SidebarComponent visible={sidebarVisible} />
    </>
  );
};

export default NavbarComponent;
