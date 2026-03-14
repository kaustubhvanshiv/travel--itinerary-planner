/* js/dashboard.js - Dashboard Logic and Mock Data */

function loadDashboardData() {
    const user = getCurrentUser();
    if (!user) return;

    // Mock trips datastore
    let trips = JSON.parse(localStorage.getItem('tripPilot_trips'));
    if (!trips) {
        trips = [];
        localStorage.setItem('tripPilot_trips', JSON.stringify(trips));
    }

    // Filter user trips
    const userTrips = trips.filter(t => t.userId === user.id);

    // Quick stats
    const now = new Date();
    const upcoming = userTrips.filter(t => new Date(t.startDate) >= now);
    const past = userTrips.filter(t => new Date(t.startDate) < now);

    document.getElementById('stat-upcoming').textContent = upcoming.length;
    document.getElementById('stat-past').textContent = past.length;

    // Load saved count
    const saved = JSON.parse(localStorage.getItem('savedDestinations')) || [];
    const savedCountEl = document.getElementById('stat-saved');
    if (savedCountEl) {
        savedCountEl.textContent = saved.length;
    }

    // Load upcoming trips into grid
    const container = document.getElementById('upcoming-trips-container');
    if (upcoming.length > 0) {
        container.innerHTML = '';

        // Sort by closest date
        upcoming.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        // Take up to 3
        upcoming.slice(0, 3).forEach(trip => {
            const card = document.createElement('div');
            card.className = 'card';

            // Select a thumbnail based on style or generic
            let imgUrl = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80'; // generic plane
            if (trip.destination.toLowerCase().includes('paris')) imgUrl = 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80';
            else if (trip.destination.toLowerCase().includes('japan') || trip.destination.toLowerCase().includes('tokyo')) imgUrl = 'https://images.unsplash.com/photo-1542051812871-34f2cb8d81c5?auto=format&fit=crop&w=800&q=80';

            card.innerHTML = `
        <img src="${imgUrl}" alt="${trip.destination}" class="card-img-top">
        <div class="card-body">
          <h4 class="card-title">${trip.tripName}</h4>
          <p class="card-text text-primary font-weight-bold"><i class="fa-solid fa-location-dot"></i> ${trip.destination}</p>
          <p class="card-text text-muted"><i class="fa-regular fa-calendar"></i> ${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</p>
          <a href="itinerary.html?id=${trip.id}" class="btn btn-outline btn-block">View Itinerary</a>
        </div>
      `;
            container.appendChild(card);
        });
    }
}
