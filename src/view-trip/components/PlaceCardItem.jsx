import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/utils/GlobalApi';
import React, { useEffect ,useState} from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'; // Removed unused React import


function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlaceImg();
  }, [place])

  const GetPlaceImg = async () => {
    const data = {
      textQuery: place.placeName
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
      setPhotoUrl(PhotoUrl);

    })
  }
  return (
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl} className='w-[130px] h-[130px] rounded-xl'/>
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        <p className='mt-2 font-semibold'>{place.timeTravel}</p>
        <h2 className='text-blue-700 text-sm'>{place.ticketPricing}</h2>
      </div>
      <div className='flex flex-col gap-24'>

        <h2 className='text-sm text-yellow-500'>⭐{place.rating}</h2>
      <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place?.placeName)} target='_blank'>
        <Button size='sm' className=' '><IoLocationOutline /></Button>
    </Link>
        
      </div>
    </div>
  )
}

export default PlaceCardItem
