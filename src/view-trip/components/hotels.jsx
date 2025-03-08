import { Link } from 'react-router-dom'; // Removed unused React import
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import HotelCardItem from './HotelCardItem';

export default function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl my-7'>Hotel Recommendation</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <HotelCardItem hotel={hotel} />
                ))}
            </div>
        </div>
    );
}


Hotels.propTypes = {
    trip: PropTypes.shape({
        tripData: PropTypes.shape({
            hotelOptions: PropTypes.arrayOf(
                PropTypes.shape({
                    hotelName: PropTypes.string.isRequired,
                    hotelAddress: PropTypes.string.isRequired,
                    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                })
            ).isRequired,
        }).isRequired,
    }).isRequired,
};
