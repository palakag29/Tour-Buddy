import PropTypes from 'prop-types';
import PlaceCardItem from './PlaceCardItem';

function DailyItinery({ trip }) {
    console.log(trip.tripData)
    // console.log(trip.tripData.itinerary)
    return (
        <div>
            <h2 className='font-bold text-lg mt-10 mb-7'>Places to Visit</h2>
            <div>
                {trip.tripData && typeof trip.tripData.itinerary === 'object' ? (
                    Object.entries(trip.tripData.itinerary)
                        // Sort based on numeric value extracted from the key (e.g., "Day 1", "Day 2")
                        .sort(([a], [b]) => {
                            const numA = parseInt(a.replace(/\D/g, ''), 10);
                            const numB = parseInt(b.replace(/\D/g, ''), 10);
                            return numA - numB;
                        })
                        .map(([day, info]) => (
                            <div key={day} className='mt-5 ' >
                                <h3 className='font-medium text-lg'>{day}</h3>
                                <div className='grid md:grid-cols-2 gap-5'>
                                    {info.places.map((place, index) => (
                                        <div key={index} className='my-3'>
                                            <p className='font-medium text-sm text-orange-300'> {place.timeSlots || place.timeSlot || info.bestTimeToVisit}</p>
                                            <PlaceCardItem place={place} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                ) : (
                    <p>No itinerary available</p>
                )}
            </div>
        </div>
    );
}

// PropTypes validation
DailyItinery.propTypes = {
    trip: PropTypes.shape({
        tripData: PropTypes.shape({
            itinerary: PropTypes.objectOf(
                PropTypes.shape({
                    bestTimeToVisit: PropTypes.string,
                    places: PropTypes.arrayOf(
                        PropTypes.shape({
                            placeName: PropTypes.string.isRequired
                        })
                    ).isRequired
                })
            )
        })
    })
};

export default DailyItinery;
