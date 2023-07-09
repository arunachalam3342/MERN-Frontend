import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Heading = ({set}) => {
  const navigate=useNavigate();
  const{dispatch}=useContext(AuthContext);
  const [user,setuser]=useState(document.cookie.split('=')[0]=='id'?(document.cookie.split('=')[1]!==undefined?document.cookie.split('=')[1]:null):null);
//   console.log(document.cookie.split('='));
  useEffect(()=>{
    if(document.cookie.split('=')[0]=='id')
    dispatch({type:'SET_USER',payload:user});
  },[user])
  const {data} =useContext(AuthContext);
  // console.log(data);
  //console.log(document.cookie.split('=')[1])
  const logout=()=>{
    // e.preventDefault();
    document.cookie = "id="+user+"; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    setuser(null);
    window.localStorage.setItem('auth','false');
    navigate('/dealer_login');
  }
  return (
    <>
    <div id="heading" text='BookWorm...'>
        BookWorm
    </div>
   {
    window.location.pathname!=='/dealer_login'? 
    <div id='cont'>
      <button onClick={()=>{logout();set('dealer_login')}}>Logout</button>
      {window.localStorage.getItem('auth')=='true' &&(user!==null?<div>username: {user}</div>:window.location.reload())}
    </div>
    :<></>
   }
    </>
  )
}

export default Heading