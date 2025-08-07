import { BrowserRouter,Route,Routes } from "react-router-dom"
import Login from "./pages/login"
import UserRegistration from "./pages/userRegistrationForm"
import Home from "./pages/home"
import AuthProvider from "./context/authContext"
import LungCancerForm from "./pages/lungsCancerForm"
import AdminPanel from "./pages/adminPanal"


function App() {
 

  return (
    <>
    <BrowserRouter>
    <AuthProvider>
  
    <Routes> 
      <Route path='/login' element={<Login></Login>} />
      <Route path='/user/register' element={<UserRegistration></UserRegistration>} />
      <Route path='/' element={<Home></Home>} />
      <Route path="/lungscancerform" element={<LungCancerForm></LungCancerForm>}/>
      <Route path="/admin" element={<AdminPanel></AdminPanel>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
