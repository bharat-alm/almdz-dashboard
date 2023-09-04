import Nav from "react-bootstrap/Nav";
import {Link} from 'react-router-dom'
import {MdDashboard} from 'react-icons/md'
import {AiFillProfile} from 'react-icons/ai'
import {BiSupport} from 'react-icons/bi'
const SidebarComponent = ({ visible }) => {
  return (
    <div >


<Nav  className={`flex-column bg-dark  sidebar   ${visible ? "active" : ""}`}  >
      <Nav.Item>
          <Nav.Link className="linktext" href="dashboard"> <MdDashboard /> &nbsp; Dashboard </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linktext"><AiFillProfile />&nbsp; Profile  </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linktext"><BiSupport />&nbsp; Help and Support</Nav.Link>
        </Nav.Item>
       

    
    </Nav>
  

    </div>
  
  );
};

export default SidebarComponent;
