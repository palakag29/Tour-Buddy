import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'
import { IoIosSend } from "react-icons/io";
import { FaFileDownload } from "react-icons/fa";

import { GetPlaceDetails, PHOTO_REF_URL } from '@/utils/GlobalApi';
import { toast } from 'sonner';
import { DownloadCloudIcon } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TripDetailsPDF from './downloadPdf';
function InfoSec({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && GetPlaceImg();
    }, [trip])
    const handleCopyLink = () => {
        const link = `${window.location.origin}/view-trip/${trip.id}`;
        navigator.clipboard.writeText(link).then(() => {
            toast('Link copied to clipboard!');
        });
    };
    const GetPlaceImg = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlaceDetails(data).then(resp => {
            //   console.log(resp.data.places[0].photos[3].name)
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places?.[0]?.photos?.[3]?.name)
            setPhotoUrl(PhotoUrl);
            console.log(PhotoUrl);

        })
    }
    return (
        <div>
            {photoUrl ? (
                <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl' alt="Place Image" />
            ) : (
                <p>Loading image...</p>
            )}

            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5'>

                <div className='flex flex-col gap-2'>
                    <h2 className='font-bold text-lg sm:text-xl md:text-2xl mt-2 sm:mt-0'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex flex-wrap gap-3 sm:gap-5 mt-2'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm'>
                            📆 {trip?.userSelection?.noOfDays} Day
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm'>
                            💰 {trip?.userSelection?.budget} Budget
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-sm'>
                            💏 No. of traveler: {trip?.userSelection?.traveler}
                        </h2>
                    </div>
                </div>
                <div>

                    <Button onClick={handleCopyLink} className='mt-3 sm:mt-0 sm:ml-5'>
                        <IoIosSend />
                    </Button>
                    <PDFDownloadLink
                        document={<TripDetailsPDF trip={trip} />}
                        fileName={`${trip?.userSelection?.location?.label || 'trip-details'}.pdf`}
                    >
                        {({ loading }) => (
                            <Button disabled={loading} className="mt-3 sm:mt-0 sm:ml-5">
                                {loading ? 'Generating PDF...' : <FaFileDownload />}
                            </Button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default InfoSec
