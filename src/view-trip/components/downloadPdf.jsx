import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

// Improved styles with additional elements like borders, shadows, and custom font styling
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        // backgroundColor: '#f0f0f0',
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#4CAF50',  // Green for title
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        marginTop: 15,
        fontWeight: 'bold',
        color: '#1a73e8',  // Blue for subtitles
        marginBottom: 5,
        textDecoration: 'underline',
    },
    text: {
        fontSize: 12,
        color: '#333333',
        lineHeight: 1.6,
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333333',
    },
    link: {
        color: '#1a73e8',
        textDecoration: 'underline',
    },
    list: {
        marginTop: 5,
        marginLeft: 15,
    },
    listItem: {
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 12,
        color: '#333333',
        lineHeight: 1.4,
        marginBottom: 5,
        marginLeft: 15,
    },
    listTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2C3E50',  // Darker blue for item names
        marginBottom: 4,
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 12,
        color: '#555',
        marginBottom: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 10,
        color: '#aaa',
    },
    footerText: {
        fontSize: 10,
        color: '#aaa',
    },
    pageNumber: {
        fontSize: 10,
        color: '#aaa',
    },
    placeDetailsContainer: {
        marginLeft: 25,
    },
    boldItemText: {
        fontSize: 12,
        color: '#333333',
        lineHeight: 1.4,
        marginBottom: 5,
        fontWeight: 'bold',
    },
});

// TripDetailsPDF component
const TripDetailsPDF = ({ trip }) => {
    return (
        <Document>
            <Page style={styles.page}>
                {/* Title */}
                <Text style={styles.title}>Trip Details</Text>

                <View style={styles.section}>
                    {/* Location and trip details card */}
                    <View style={styles.card}>
                        <Text style={styles.cardHeader}>Trip Information</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Location:</Text> {trip?.userSelection?.location?.label}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Days:</Text> {trip?.userSelection?.noOfDays}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Budget:</Text> {trip?.userSelection?.budget}</Text>
                        <Text style={styles.cardText}><Text style={styles.boldText}>Travelers:</Text> {trip?.userSelection?.traveler}</Text>
                    </View>

                    {/* Hotel Recommendations */}
                    <Text style={styles.subtitle}>Hotel Recommendations:</Text>
                    <View style={styles.list}>
                        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                            <View key={index} style={styles.listItem}>
                                <Link style={styles.link} src={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + " " + hotel?.hotelAddress)}`}>
                                    <Text style={styles.listTitle}>{hotel?.hotelName}</Text>
                                </Link>
                                <Text style={styles.listItemText}>{hotel?.hotelAddress}</Text>
                                <Text style={styles.listItemText}><Text style={styles.boldText}>Price:</Text> {hotel?.price}</Text>
                                <Text style={styles.listItemText}><Text style={styles.boldText}>Rating:</Text> {hotel?.rating}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Itinerary */}
                    <Text style={styles.subtitle}>Itinerary:</Text>
                    <View style={styles.list}>
                        {trip?.tripData?.itinerary && typeof trip?.tripData?.itinerary === 'object'
                            ? Object.entries(trip?.tripData?.itinerary)
                                .sort(([a], [b]) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replace(/\D/g, '')))
                                .map(([day, info]) => (
                                    <View key={day} style={styles.listItem}>
                                        <Text style={styles.listTitle}>{day}</Text>
                                        {info?.places.map((place, index) => (
                                            <View key={index}>
                                                <Link style={styles.link} src={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}>
                                                    <Text style={[styles.listItemText, styles.boldText]}>{place?.placeName}</Text>
                                                </Link>
                                                <Text style={[styles.listItemText, styles.placeDetailsContainer]}>{place?.placeDetails}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))
                            : <Text style={styles.text}>No itinerary available</Text>}
                    </View>
                </View>

               
                
            </Page>
        </Document>
    );
};

export default TripDetailsPDF;
