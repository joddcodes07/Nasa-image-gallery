const apiKey = 'HNVeCZmgoEnD4nlUQdX72iiRTQXQVrf3EtU2A7tw';
const gallery = document.getElementById('gallery-container');
const loader = document.getElementById('loading-message');

async function getSpaceData() {
    loader.style.display = 'block';
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=15`);
        const data = await response.json();

        renderGallery(data);
    }catch (error) {
        console.error("fetch failed:", error);
    }finally {
        loader.style.display = 'none';
    }
}
function renderGallery(dataArray) {
    dataArray.forEach(item => {
        const cardHtml = `
            <div class="card">
                <img src="${item.url}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.date}</p>
            </div>
        `;
        gallery.innerHTML += cardHtml;
    });
}
getSpaceData();