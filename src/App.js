import logo from './logo.svg';
import './App.css';
import LoginCard from './Card/LoginCard';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import EditCard from './Card/EditCard';
import ChangPassCard from './Card/ChangPassCard';
import Sidebar from './components/Sidebar';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react'; 
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import DashBord from './components/DashBord';
import { loginApi, logoutApi, checkloginApi, bootstrapApi, changePasswordApi, updateMasterActionApi } from './service/auth';


function App() {
  const [expandedMenu, setExpandendMenu] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [MRAction, setMRAction] = useState({});
  const menueClicked = () => {
    setExpandendMenu(old=>!old);
  }
  const tryLogin = async(values) => {
    const resp = await loginApi(values.email, values.password);
    try {
      if (resp.status) {
        setLoggedIn(true);
        const bootstrap = await bootstrapApi();
        if(bootstrap && bootstrap.status) {
          setMRAction({items:bootstrap.data.items, to: bootstrap.data.to});
        }
      } else {
        setLoggedIn(false);
        alert(resp.message)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleMRActionSend = async (data) => {
    if(data.to) {
      const resp = await updateMasterActionApi(data.to);
      alert(resp.message)
    }
  }

  const logout = async() => {
    try {
      const resp = await logoutApi();
      if (resp.status) {
        setLoggedIn(false);
      } {
        alert(resp.message)
        setLoggedIn(false);
      }
    } catch(error) {
      console.error(error)
      setLoggedIn(false);
    }
  }
  const changePassword = async({password}) => {
    const changePasswordAction = await changePasswordApi(password);
    if(changePasswordAction && changePasswordAction.status) {
      alert(changePasswordAction.message);
      return true;
    }
    console.log(changePasswordAction);
    return false;
  }
  useEffect(()=>{
    checkloginApi().then(response => {
      if (response && response.status) {
        setLoggedIn(true);
        bootstrapApi().then(res=> {
          if(res && res.status) {
            setMRAction({items:res.data.items, to: res.data.to});
          }
        });
      } else {
        setLoggedIn(false);
      }
    });
  },[]);

  if (isLoggedIn) {
    return (
      <Router>
      <Navbar menuClicked={menueClicked}/>
      <Stack direction="row">
      <Sidebar expandedMenu={expandedMenu} />
      <Routes>
        <Route path="/logout" element={<Logout  logout={logout}/>} />
        <Route path="/editcard" element={<EditCard data={MRAction} onClick={handleMRActionSend} />} />
        <Route path="/changepasscard" element={<ChangPassCard handleSendClicked={changePassword}/>} />
        <Route path="/" element={<DashBord/>} />
        </Routes>
      </Stack>
  </Router>); 
}
  return (
    <LoginCard login={tryLogin} />
  )
}

export default App;
