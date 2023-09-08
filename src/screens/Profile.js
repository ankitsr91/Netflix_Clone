import React from 'react'
import "./Profile.css"
import Nav from '../Nav'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import PlanScreen from './PlanScreen'
function Profile() {
    const user=useSelector(selectUser);
 
  return (
    <div className='profileScreen'>
      <Nav/>
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu9VhASGSfFj_77fZ748zUwZZ0HbLv35YYrd93apRFEjDlRDUcoBJlyiiLfzxymVaJMp0&usqp=CAU" alt="" />
           <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
                <h3>Plans</h3>
                <PlanScreen/>
                <button onClick={()=>auth.signOut()}className="profileScreen_signOut">
                    Sign Out
                </button>
            </div>
           </div>
        </div>
      </div>
      </div>
  )
}

export default Profile
