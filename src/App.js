import './App.css';
import LoginCard from './Card/LoginCard';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import EditCard from './Card/EditCard';
import ChangPassCard from './Card/ChangPassCard';
import Sidebar from './components/Sidebar';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react'; 
import { Routes, Route, useLocation} from 'react-router-dom';
import DashBord from './components/DashBord';
import { loginApi, logoutApi, checkloginApi, bootstrapApi, changePasswordApi, updateMasterActionApi } from './service/auth';


function App() {
  const [expandedMenu, setExpandendMenu] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [MRAction, setMRAction] = useState({});
  let location = useLocation()
  const menueClicked = () => {
    setExpandendMenu(old=>!old);
  }
  const tryLogin = async(values) => {
    try {
      setLoading(true)
    const resp = await loginApi(values.email, values.password);
      if (resp.status) {
        setLoggedIn(true);
        const bootstrap = await bootstrapApi();
        if(bootstrap && bootstrap.status) {
          setMRAction({items:bootstrap.data.items, to: bootstrap.data.to});
        }
        setLoading(false)
      } else {
        setLoggedIn(false);
        setLoading(false)
        alert(resp.message)
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  }

  const handleMRActionSend = async (data) => {
    try {
      if(data.to) {
        setLoading(true)
        const resp = await updateMasterActionApi(data.to);
        setLoading(false)
        alert(resp.message)
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const logout = async() => {
    try {
      setLoading(true)
      const resp = await logoutApi();
      if (resp.status) {
        setLoggedIn(false);
      } else {
        alert(resp.message)
        setLoggedIn(false);
      }
    } catch(error) {
      console.error(error)
      setLoggedIn(false);
    }
      setLoading(false)
  }
  const changePassword = async({password}) => {
    try {
    setLoading(true)
      const changePasswordAction = await changePasswordApi(password);
      if(changePasswordAction && changePasswordAction.status) {
        alert(changePasswordAction.message);
        setLoading(false)
        return true;
      }
      alert(changePasswordAction.message);
      setLoading(false)
      return false;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  useEffect(()=>{
    setLoading(true)
    checkloginApi().then(response => {
      if (response && response.status) {
        setLoggedIn(true);
        bootstrapApi().then(res=> {
          if(res && res.status) {
            setMRAction({items:res.data.items, to: res.data.to});
          }
          setLoading(false)
        }).catch(error => {
          console.error(error);
          setLoading(false)
        });
      } else {
        setLoggedIn(false);
        setLoading(false)
      }
    }).catch(error => {
      console.error(error);
      setLoading(false)
    });
  },[]);

  useEffect(
    () => {
      if (location.pathname === '/editnumber') {
        setLoading(true);
        bootstrapApi().then(res=> {
          if(res && res.status) {
            setMRAction({items:res.data.items, to: res.data.to});
          }
          setLoading(false)
        }).catch(error => {
          console.error(error);
          setLoading(false)
        });;
      }
    },
    [location]
  )

  if (isLoggedIn) {
    return (
   <>
      <Navbar menuClicked={menueClicked}/>
      <Stack direction="row">
      <Sidebar expandedMenu={expandedMenu} />
      <Routes>
        <Route path="/logout" element={<Logout loading={isLoading}  logout={logout}/>} />
        <Route path="/editnumber" element={<EditCard loading={isLoading} setMRAction={setMRAction} data={MRAction} onClick={handleMRActionSend} />} />
        <Route path="/changepassword" element={<ChangPassCard loading={isLoading} handleSendClicked={changePassword}/>} />
        <Route path="/" element={<DashBord loading={isLoading}/>} />
        </Routes>
      </Stack></>
 ); 
}
  return (
    <LoginCard login={tryLogin} loading={isLoading} />
  )
}

export default App;
