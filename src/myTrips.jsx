import React, { useEffect, useState } from 'react'
import Header from './components/ui/custom/Header'
import UserTripCard from './userTripCard';
import {useNavigate } from 'react-router-dom'
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from './utils/firebaseConfig';
function MyTrips() {
    const navigate = useNavigate();
    const [userTrips,setUserTrips]=useState([])
  useEffect(()=>{
    GetUserTrips()
  },[])
  const GetUserTrips=async()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user){
      navigate('/')
    }
    console.log('userEmail')
    console.log(user?.email)
    const q = query(collection(db, 'AiTrips'), where('userEmail','==',user?.email))
    const querySnapshot = await getDocs(q);
    setUserTrips([])
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
  }

  return (
    <div>
        <Header/>
        
      <div className='sm:px-16 md:px-36 lg:px-64 xl:px-[280px] px-8 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>

        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
          {userTrips.map((trip,index)=>(
            <UserTripCard trip={trip}  />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyTrips
