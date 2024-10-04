import React ,{useEffect} from 'react'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login/login'
import Chat from './Pages/Chat';
import Faq from './Pages/faq';
import Navbar from './Components/navbar/navbar';
import LegalChatDecisionTree from './Components/kyr/kyr'; 
import ComplaintPage from './Pages/ComplaintPage';
import Blogs from './Components/BlogsAndArticles/blogs';
import TextSummarize from './Components/TextSummarizer/TextSummarize'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Components/Login/firebase'; 
import { Dashboard } from './Components/dashboard';
const App = () => {

  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (User) => {
      setUser(User);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <>
      {User && <Navbar user={User} /> } 
       <Routes >
        <Route 
          exact
          path='/'
          element={User ? <Dashboard user = {User} /> : <Navigate to="/login" />}
         />
         <Route 
          exact
          path='/chat'
          element={<Chat user = {User} />}
         />
          <Route 
          exact
          path='/complaintPage'
          element={<ComplaintPage user = {User} />}
         />
         <Route 
          exact
          path='/faq'
          element={<Faq />}
         />
         <Route 
           exact
           path='/login'
           element = {User ? <Navigate to="/" /> : <Login />} />
           <Route
           exact
           path='/kyr'
           element={<LegalChatDecisionTree/>}
           />
           <Route
           exact
           path='/summarizer'
           element={<TextSummarize/>}
           />
           <Route
           exact
           path='/BlogsAndArticles'
           element={<Blogs/>}
           />
       </Routes>
       </>
    </BrowserRouter> 
  )
}

export default App