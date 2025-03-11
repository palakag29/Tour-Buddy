import Header from '@/components/ui/custom/Header'
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useState, useEffect, } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { Button } from '@/components/ui/button';
import { DatePickerDemo } from '@/components/ui/datePicker';
import { chatSession } from '@/utils/AiModal';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })



  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user')
    if (!user) {
      setOpenDialog(true)
      return;
    }
    if (formData?.noOfDays > 5 || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details!")
      return;
    }
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)

    console.log(FINAL_PROMPT)
    setLoading(true);
    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    console.log(formData)

    SaveAiTrip(result?.response?.text());
  }
  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "application/json",
        },
      });
      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to retrieve user profile. Please try again.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  }

  return (
    <div>
      <Header />
      {/* sm:px-16 md:px-36 lg:px-64 xl:px-16 px-8 mt-10 */}
      <div className='sm:px-16 md:px-36 lg:px-64 xl:px-[280px] px-8 mt-10'>
        <div className='flex items-center gap-2'>
          <h2 className='font-bold text-3xl'>Tell us your travel preference
          </h2>
          <img src='/tent.png' className='w-14 pb-5' />
        </div>
        <p className='text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences</p>

        <div className='mt-14 flex flex-col gap-8'>
          <div>
            <h2 className='text-xl my-2 font-medium'>What is your destination?</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) }
              }}
            />
          </div>
          <div>
            <h2 className='text-xl my-2 font-medium'>How many days are you planning your trip?</h2>
            <Input placeholder='Ex.3' type='number'
              onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
          </div>
        </div>
        <div>
          <h2 className='text-xl my-6 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)} className={`p-3 border cursor-pointer rounded-lg hover:shadow-lg
                    ${formData?.budget == item.title && 'shadow-lg border-black'}
                  `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-6 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index} onClick={() => handleInputChange('traveler', item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.traveler == item.people && 'shadow-lg border-black'}
                  `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                <h2 className='text-sm text-gray-500'>{item.people}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 flex justify-end ">
          <Button onClick={OnGenerateTrip} disabled={loading} >
            {loading ?
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
              : 'Generate Trip'}
          </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>

                <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
                <p>Sign in to the App with Google Authentication Security</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 gap-4 items-center ">
                  <FcGoogle className='h-1 w-7' />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CreateTrip