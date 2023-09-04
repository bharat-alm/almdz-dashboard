// import AdminTable from './components/AdminTable';
import { useState, useEffect } from "react";
import axios from "axios";

import ScrollSortTable from "./components/AdminTable";
import SharedLayout from "./pages/SharedLayout";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Protect/ProtectedRoute";
import mainUrl from "./api/configApi";

// import Sidenav from './components/Sidenav';

const App = () => {
  const [user, setUsers] = useState([]);

  const fetchData = async () => {
    // const {data} = await axios.get('http://206.189.134.177:8484/admin')
    const { data } = await axios.get(
      `${mainUrl}admin`
    );
   
    setUsers(data.details);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <Routes>
        <Route
          path="/home"
          element={

<SharedLayout />


            
        
          }
        >
          <Route path="dashboard" element={<ScrollSortTable user={user} />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
