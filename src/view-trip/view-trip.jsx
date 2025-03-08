import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import Header from '@/components/ui/custom/Header'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from "sonner";
import InfoSec from "./components/infoSec";
import Hotels from "./components/hotels";
import DailyItinery from "./components/dailyItinery";

function viewtrip() {

  const {tripId} = useParams();
  const [trip, setTrip]=useState([])
  useEffect(()=>{
    tripId&&GetTripData()
  },[tripId])
  const GetTripData=async()=>{
    const docRef = doc(db,'AiTrips',tripId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log('Document:',docSnap.data())
      setTrip(docSnap.data())
    }
    else{
      console.log('Not found')
      toast('No trip found')
    }
  }
  
  return (<div>

        <Header/>
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">

      {/* View Trip :{tripId} */}
     <InfoSec trip={trip}/>
     <Hotels trip={trip}/>
      <DailyItinery trip={trip}/>
  </div>
    </div>
  )
}

export default viewtrip
