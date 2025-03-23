import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseConfig";
import Header from '@/components/ui/custom/Header';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import InfoSec from "./components/infoSec";
import Hotels from "./components/hotels";
import DailyItinery from "./components/dailyItinery";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

function ViewTrip() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AiTrips', tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        toast('No trip found');
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
      toast('Error fetching trip');
    }
  };

  const handleDeleteTrip = async () => {
    try {
      setLoading(true);
      const tripRef = doc(db, 'AiTrips', tripId);
      await deleteDoc(tripRef);
      toast('Trip deleted successfully');
      navigate('/create-trip'); // Redirect to home or trip list after deletion
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast('Error deleting trip');
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteModal = (
    <Dialog open={openConfirmDialog} onOpenChange={(open) => setOpenConfirmDialog(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this trip?</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogTrigger>
          <button
            onClick={() => setOpenConfirmDialog(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteTrip}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Confirm Delete
          </button>
        </DialogTrigger>
      </DialogContent>
    </Dialog>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* View Trip */}
        <InfoSec trip={trip} />
        <Hotels trip={trip} />
        <DailyItinery trip={trip} />

        {/* Delete Trip Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => setOpenConfirmDialog(true)}
            className="bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete Trip
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmDeleteModal}
    </div>
  );
}

export default ViewTrip;
