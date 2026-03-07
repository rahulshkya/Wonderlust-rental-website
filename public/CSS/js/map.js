  const map = L.map("map").setView([20, 0], 2); // world view

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  let marker;

  async function showLocation() {
    const place = document.getElementById("locationInput").value;

    if (!place) {
      alert("Please enter a location");
      return;
    }

    const url =
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.length === 0) {
      alert("Location not found");
      return;
    }

    const lat = data[0].lat;
    const lon = data[0].lon;

    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker([lat, lon]).addTo(map)
      .bindPopup(place)
      .openPopup();

    map.setView([lat, lon], 13);
  }