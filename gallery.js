const firebaseConfig = {
  apiKey: "AIzaSyBGt52Yl5ZajOieOa7Fc0oETsF9YANW4Sw",
  authDomain: "lena-s-bday.firebaseapp.com",
  databaseURL: "https://lena-s-bday-default-rtdb.firebaseio.com",
  projectId: "lena-s-bday",
  storageBucket: "lena-s-bday.firebasestorage.app",
  messagingSenderId: "516526044514",
  appId: "1:516526044514:web:a06d20e2ddf5e09e6b283b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentImages = [];
let refreshInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initial load
    loadGalleryImages();
    
    // Set up auto-refresh every 3 seconds
    refreshInterval = setInterval(() => {
        loadGalleryImages();
    }, 3000);
});

async function loadGalleryImages() {
    try {
        const galleryContent = document.getElementById('galleryContent');
        const imageCount = document.getElementById('imageCount');
        
        const snapshot = await db.ref('uploaded_images').once('value');
        const data = snapshot.val();
        
        if (!data) {
            galleryContent.innerHTML = '<div class="gallery-empty">📸 No photos uploaded yet.<br>Go back and upload some!</div>';
            imageCount.textContent = '0';
            return;
        }
        
        const images = Object.values(data)
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        
        if (JSON.stringify(currentImages) === JSON.stringify(images)) {
            return; 
        }
        
        currentImages = images;
        imageCount.textContent = images.length;
        
        galleryContent.innerHTML = '';
        images.forEach((imageData, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = imageData.url;
            img.alt = `Photo ${index + 1}`;
            img.loading = 'lazy';
            
            img.onerror = () => {
                item.style.display = 'none';
            };
            
            img.addEventListener('click', () => {
                openImageFullscreen(imageData.url);
            });
            
            item.appendChild(img);
            galleryContent.appendChild(item);
        });
        
    } catch (error) {
        console.error('Error loading images:', error);
        const galleryContent = document.getElementById('galleryContent');
        galleryContent.innerHTML = '<div class="gallery-empty">⚠️ Error loading gallery.<br>Check Firebase config.</div>';
    }
}

function openImageFullscreen(imageUrl) {
    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 10px;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 5px;
        transition: background 0.3s;
    `;
    
    closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.4)';
    closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    
    const close = () => fullscreenContainer.remove();
    
    closeBtn.addEventListener('click', close);
    fullscreenContainer.addEventListener('click', (e) => {
        if (e.target === fullscreenContainer) close();
    });
    
    fullscreenContainer.appendChild(img);
    fullscreenContainer.appendChild(closeBtn);
    document.body.appendChild(fullscreenContainer);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
    } else {
        loadGalleryImages();
        refreshInterval = setInterval(() => {
            loadGalleryImages();
        }, 3000);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
    }
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    } else {
        document.exitFullscreen();
    }
}
