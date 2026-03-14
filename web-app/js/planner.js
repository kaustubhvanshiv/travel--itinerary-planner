/* js/planner.js - Itinerary Generation Logic */

function getTrips() {
    const trips = localStorage.getItem('tripPilot_trips');
    return trips ? JSON.parse(trips) : [];
}

function saveTrip(trip) {
    const trips = getTrips();
    trips.push(trip);
    localStorage.setItem('tripPilot_trips', JSON.stringify(trips));
}

function updateTrip(updatedTrip) {
    let trips = getTrips();
    trips = trips.map(t => t.id === updatedTrip.id ? updatedTrip : t);
    localStorage.setItem('tripPilot_trips', JSON.stringify(trips));
}

function getTripById(id) {
    return getTrips().find(t => t.id === id);
}

// AI Feature Placeholder / Mock Generator
function generateMockItineraryAndSave(tripData) {
    const start = new Date(tripData.startDate);
    const end = new Date(tripData.endDate);
    const days = Math.min(Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1), 14); // cap at 14 days for mock

    const itinerary = [];

    for (let i = 0; i < days; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(currentDate.getDate() + i);

        const dayPlan = {
            dayNumber: i + 1,
            date: currentDate.toISOString().split('T')[0],
            activities: []
        };

        // Arrival logic for Day 1
        if (i === 0) {
            dayPlan.activities.push({ time: '10:00 AM', type: 'transport', title: 'Arrival & Airport Transfer', description: 'Arrive at destination and grab a taxi to your accommodation.', cost: 30 });
            dayPlan.activities.push({ time: '02:00 PM', type: 'hotel', title: 'Hotel Check-in', description: 'Settle in and freshen up.', cost: 0 });
            dayPlan.activities.push({ time: '04:00 PM', type: 'explore', title: 'City Exploration', description: 'Walk around the neighborhood to get your bearings.', cost: 0 });
            dayPlan.activities.push({ time: '07:30 PM', type: 'food', title: 'Welcome Dinner', description: `Enjoy your first meal in ${tripData.destination}.`, cost: 40 });
        }
        // Departure logic for Last Day
        else if (i === days - 1) {
            dayPlan.activities.push({ time: '09:00 AM', type: 'food', title: 'Final Breakfast', description: 'Quick breakfast near the hotel.', cost: 15 });
            dayPlan.activities.push({ time: '11:00 AM', type: 'explore', title: 'Last Minute Souvenir Shopping', description: 'Pick up some local gifts.', cost: 50 });
            dayPlan.activities.push({ time: '01:00 PM', type: 'transport', title: 'Head to Airport', description: 'Travel to the airport for your flight home.', cost: 30 });
        }
        // Middle days logic
        else {
            dayPlan.activities.push({ time: '09:00 AM', type: 'explore', title: 'Morning Attraction', description: `Visit the top museum or landmark in ${tripData.destination}.`, cost: 25 });
            dayPlan.activities.push({ time: '01:00 PM', type: 'food', title: 'Local Lunch', description: 'Try some famous local street food.', cost: 15 });
            if (tripData.style === 'adventure') {
                dayPlan.activities.push({ time: '03:00 PM', type: 'explore', title: 'Outdoor Adventure', description: 'Hiking, climbing, or water sports activity.', cost: 60 });
            } else {
                dayPlan.activities.push({ time: '03:00 PM', type: 'explore', title: 'Cultural Walk', description: 'Guided walking tour of the historic district.', cost: 20 });
            }
            dayPlan.activities.push({ time: '08:00 PM', type: 'food', title: 'Evening Dinner', description: 'Relaxed dinner at a well-reviewed restaurant.', cost: 45 });
        }

        itinerary.push(dayPlan);
    }

    tripData.itinerary = itinerary;
    saveTrip(tripData);
    return tripData;
}
