/* js/explore.js - Mock destination database and filtering */

const mockDestinations = [
    {
        id: 1,
        name: 'Kyoto',
        country: 'Japan',
        continent: 'asia',
        activity: 'culture',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Ancient temples, traditional tea houses, and beautiful geisha districts.',
        cost: '$$$',
        estimatedPrice: '$2,500 - $4,000',
        rating: 4.9,
        reviews: 1245
    },
    {
        id: 2,
        name: 'Santorini',
        country: 'Greece',
        continent: 'europe',
        activity: 'relaxation',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80',
        description: 'Iconic white and blue architecture with stunning caldera sunset views.',
        cost: '$$$',
        estimatedPrice: '$3,000 - $5,500',
        rating: 4.8,
        reviews: 2100
    },
    {
        id: 3,
        name: 'Bali',
        country: 'Indonesia',
        continent: 'asia',
        activity: 'nature',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Lush jungles, vibrant culture, and world-renowned surf beaches.',
        cost: '$$',
        estimatedPrice: '$800 - $1,800',
        rating: 4.7,
        reviews: 3500
    },
    {
        id: 4,
        name: 'Rome',
        country: 'Italy',
        continent: 'europe',
        activity: 'culture',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'The eternal city filled with historical ruins and amazing authentic pasta.',
        cost: '$$',
        estimatedPrice: '$1,500 - $2,800',
        rating: 4.9,
        reviews: 4200
    },
    {
        id: 5,
        name: 'Banff',
        country: 'Canada',
        continent: 'americas',
        activity: 'adventure',
        image: 'https://inspiredroutes.com/wp-content/uploads/2023/08/banff-in-summer-960x720.jpg.webp',
        description: 'Majestic rocky mountains meeting turquoise glacial lakes.',
        cost: '$$$',
        estimatedPrice: '$2,000 - $3,500',
        rating: 4.9,
        reviews: 890
    },
    {
        id: 6,
        name: 'Lima',
        country: 'Peru',
        continent: 'americas',
        activity: 'culture',
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Culinary capital of South America with rich colonial history.',
        cost: '$',
        estimatedPrice: '$600 - $1,200',
        rating: 4.5,
        reviews: 650
    },
    {
        id: 7,
        name: 'Kathmandu',
        country: 'Nepal',
        continent: 'asia',
        activity: 'nature',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        description: 'A gateway to the Himalayas, full of ancient spiritual sites and stunning views.',
        cost: '$',
        estimatedPrice: '$400 - $900',
        rating: 4.8,
        reviews: 1300
    },
    {
        id: 8,
        name: 'Swiss Alps',
        country: 'Switzerland',
        continent: 'europe',
        activity: 'adventure',
        image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
        description: 'World-renowned skiing, majestic peaks, and cozy snowy chalets.',
        cost: '$$$',
        estimatedPrice: '$3,500 - $6,000',
        rating: 4.9,
        reviews: 3100
    },
    {
        id: 9,
        name: 'Maldives',
        country: 'Maldives',
        continent: 'asia',
        activity: 'relaxation',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
        description: 'Crystal clear turquoise waters and private overwater bungalows.',
        cost: '$$$',
        estimatedPrice: '$4,000 - $9,000',
        rating: 4.9,
        reviews: 2800
    }
];

function renderDestinations(dests) {
    const container = document.getElementById('destinations-container');
    container.innerHTML = '';

    if (dests.length === 0) {
        container.innerHTML = `<div class="alert alert-error w-100" style="grid-column: 1/-1;">No destinations match your filters.</div>`;
        return;
    }

    dests.forEach(dest => {
        const isSaved = isDestinationSaved(dest.id);
        container.innerHTML += `
      <div class="card dest-card">
        <div class="img-container">
          <button class="save-btn ${isSaved ? 'active' : ''}" onclick="toggleSaveDestination(${dest.id})" title="${isSaved ? 'Remove from saved' : 'Save destination'}">
            <i class="fa-${isSaved ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <img src="${dest.image}" alt="${dest.name}" class="card-img-top">
        </div>
        <div class="card-body">
          <h3 class="card-title">${dest.name}, <span style="font-weight:400; color:var(--text-muted);">${dest.country}</span></h3>
          <p class="card-text">${dest.description}</p>
          <div class="dest-meta">
            <div class="dest-meta-item">
              <i class="fa-solid fa-money-bill-wave text-primary"></i> 
              <span>Est. Cost: <strong>${dest.estimatedPrice}</strong></span>
            </div>
            <div class="dest-meta-item popularity">
              <i class="fa-solid fa-star"></i> 
              <span>${dest.rating} (${dest.reviews} reviews)</span>
            </div>
          </div>
          <button class="btn btn-outline btn-block mt-2" onclick="planSpecificTrip('${dest.name}, ${dest.country}')"><i class="fa-solid fa-plus"></i> Plan Trip Here</button>
        </div>
      </div>
    `;
    });
}

function getSavedDestinations() {
    return JSON.parse(localStorage.getItem('savedDestinations')) || [];
}

function isDestinationSaved(id) {
    const saved = getSavedDestinations();
    return saved.some(d => d.id === id);
}

function toggleSaveDestination(id) {
    const user = JSON.parse(localStorage.getItem('tripPilotUser'));
    if (!user) {
        alert('Please login to save destinations!');
        window.location.href = 'login.html';
        return;
    }

    let saved = getSavedDestinations();
    const index = saved.findIndex(d => d.id === id);

    if (index > -1) {
        saved.splice(index, 1);
    } else {
        const dest = mockDestinations.find(d => d.id === id);
        if (dest) saved.push(dest);
    }

    localStorage.setItem('savedDestinations', JSON.stringify(saved));
    filterDestinations(); // Refresh view
}

function planSpecificTrip(destination) {
    localStorage.setItem('pendingDestination', destination);
    window.location.href = 'create-trip.html';
}

function loadDestinations() {
    // If temp query exists, filter immediately
    const q = document.getElementById('destination-search').value;
    if (q) {
        filterDestinations();
    } else {
        renderDestinations(mockDestinations);
    }
}

function filterDestinations() {
    const query = document.getElementById('destination-search').value.toLowerCase();
    const cont = document.getElementById('filter-continent').value;
    const budget = document.getElementById('filter-budget').value;
    const activity = document.getElementById('filter-activity').value;

    const filtered = mockDestinations.filter(d => {
        const matchesQuery = d.name.toLowerCase().includes(query) || d.country.toLowerCase().includes(query);
        const matchesCont = cont === 'all' || d.continent === cont;
        const matchesBudget = budget === 'all' || d.cost === budget;
        const matchesActivity = activity === 'all' || d.activity === activity;
        return matchesQuery && matchesCont && matchesBudget && matchesActivity;
    });

    renderDestinations(filtered);
}
