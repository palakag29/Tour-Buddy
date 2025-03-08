import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'

import { Link, useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from '../popover.jsx'
import { googleLogout } from '@react-oauth/google'
import axios from 'axios';
function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user)
  }, [])
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

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
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // toast.error("Failed to retrieve user profile. Please try again.");
    }
  };
  return (
    <div className='mx-auto top-0 transition-all py-6 bg-transparent z-10 p-4 shadow-sm flex justify-between items-center px-5 '>
      <div className='flex items-center '>
        <Link to='/' className='flex items-center space-x-2'>
          <img src='/logo.svg' className='w-12' />
          <p className='text-xl font-bold m-2 text-teal-800'>Tour Buddy</p>
        </Link>
      </div>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <Link to='/create-trip'>
            <Button variant='outline' className='rounded-full'>Create trip</Button>
            {/* <p className='text-sm'>{user?.given_name}</p> */}
            </Link>
            <Link to='/mytrips'>
            <Button variant='outline' className='rounded-full'>My trips</Button>
            {/* <p className='text-sm'>{user?.given_name}</p> */}
            </Link>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' />

              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout()
                  localStorage.clear()
                  navigate('/')
                }}>
                  Log Out</h2>
              </PopoverContent>
            </Popover>
          </div>
          :
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>

        }
      </div>
      <Dialog open={openDialog}  >
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
  )
}

export default Header
