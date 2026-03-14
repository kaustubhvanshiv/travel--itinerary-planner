/* js/saved-destinations.js */

function renderSavedDestinations() {
    const container = document.getElementById('saved-destinations-container');
    const saved = JSON.parse(localStorage.getItem('savedDestinations')) || [];

    container.innerHTML = '';

    if (saved.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
                <i class="fa-regular fa-heart mb-3" style="font-size: 4rem; opacity: 0.2; color: var(--text-muted);"></i>
                <h3 class="mb-1">No saved destinations yet</h3>
                <p class="text-muted mb-2">Explore our curated list of destinations and click the heart icon to save them for later.</p>
                <a href="explore.html" class="btn btn-primary">Explore Destinations</a>
            </div>
        `;
        return;
    }

    saved.forEach(dest => {
        container.innerHTML += `
      <div class="card dest-card">
        <div class="img-container">
          <button class="save-btn active" onclick="removeDestination(${dest.id})">
            <i class="fa-solid fa-heart"></i>
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

function removeDestination(id) {
    let saved = JSON.parse(localStorage.getItem('savedDestinations')) || [];
    saved = saved.filter(d => d.id !== id);
    localStorage.setItem('savedDestinations', JSON.stringify(saved));
    renderSavedDestinations();
}

function planSpecificTrip(destination) {
    localStorage.setItem('pendingDestination', destination);
    window.location.href = 'create-trip.html';
}

document.addEventListener('DOMContentLoaded', () => {
    renderSavedDestinations();
});
