import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from './utils/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
     const [photoUrl,setPhotoUrl] = useState();
          useEffect(()=>{
            trip&&GetPlaceImg();
          },[trip])
    
          const GetPlaceImg=async()=>{
            const data={
              textQuery:trip?.userSelection?.location?.label
            }
            const result= await GetPlaceDetails(data).then(resp=>{
            //   console.log(resp.data.places[0].photos[3].name)
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places?.[0]?.photos?.[3]?.name)
              setPhotoUrl(PhotoUrl);
              console.log(PhotoUrl);
    
            })
          }
  return (
    <Link to={'/view-trip/'+trip?.id}>
          <div className='hover:scale-105 transition-all cursor-pointer rounded-xl'>
          <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' alt="Place Image" />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
              <h2 className='font-semibold text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip.userSelection.budget} budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCard
