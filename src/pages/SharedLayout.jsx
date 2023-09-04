import { Outlet } from "react-router-dom"
import NavbarComponent from "../components/Navbar/Navbar"
import SidebarComponent from "../components/Sidebar/Sidenav"

const SharedLayout = () => {
  return (
    <>
    <main className="dashboard">
      <SidebarComponent />
<div>

<NavbarComponent  />

<div className="dashboard-page">
    <Outlet/>
</div>
</div>
   
    </main>
    
    </>
  )
}

export default SharedLayout