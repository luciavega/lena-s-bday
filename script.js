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
const storage = firebase.storage();
const db = firebase.database();

console.log("JS cargado");

const cardsData = [
    { imagePath: "img/0_La_Loca_CM.png", message: "" },
    { imagePath: "img/I_La_Maga_CM.png", message: "" },
    { imagePath: "img/II_La_Papisa_CM.png", message: "" },
    { imagePath: "img/III_La_Emperatriz_CM.png", message: "" },
    { imagePath: "img/IV_El_Emperador_CM.png", message: "" },
    { imagePath: "img/V_El_Papa_CM.png", message: "" },
    { imagePath: "img/VI_El_Enamorado_CM.png", message: "" },
    { imagePath: "img/VII_El_Carro_CM.png", message: "" },
    { imagePath: "img/VIII_La_Justicia_CM.png", message: "" },
    { imagePath: "img/X_La_Rueda_De_La_Fortuna_CM.png", message: "" },
    { imagePath: "img/XI_La_Fuerza_CM.png", message: "" },
    { imagePath: "img/XII_El_Colgado_CM.png", message: "" },
    { imagePath: "img/XIII_La_Muerte_CM.png", message: "" },
    { imagePath: "img/XIV_La_Templanza_CM.png", message: "" },
    { imagePath: "img/XIX_El_Sol_CM.png", message: "" },
    { imagePath: "img/XV_El_Diablo_CM.png", message: "" },
    { imagePath: "img/XVI_La_Torre_CM.png", message: "" },
    { imagePath: "img/XVII_La_Estrella_CM.png", message: "" },
    { imagePath: "img/XVIII_La_Luna_CM.png", message: "" },
    { imagePath: "img/XX_El_Juicio_CM.png", message: "" },
    { imagePath: "img/XXI_El_Mundo_CM.png", message: "" }
];

document.addEventListener('DOMContentLoaded', () => {
    console.log(`🎂 Initializing ${cardsData.length} birthday cards...`);
    initializeCards();
    setupCarouselControls();
    setupUploadHandler();
});

function initializeCards() {
    const carousel = document.getElementById('cardsCarousel');
    
    if (!carousel) {
        console.error('❌ Carousel container not found!');
        return;
    }
    
    carousel.innerHTML = ''; 
    
    cardsData.forEach((cardData, index) => {
        const card = createCard(cardData, index);
        carousel.appendChild(card);
    });
    
    console.log(`✅ Successfully rendered ${cardsData.length} cards`);
}

function createCard(cardData, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-card-index', index);
    
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    
    const img = document.createElement('img');
    img.src = cardData.imagePath; 
    img.alt = `Birthday card ${index + 1}`;
    img.loading = 'lazy';
    
    img.addEventListener('load', () => {
        console.log(`✅ Image loaded: ${cardData.imagePath}`);
    });
    
    img.addEventListener('error', () => {
        console.error(`❌ FAILED TO LOAD: ${cardData.imagePath}`);
        console.warn(`Card index: ${index}, Expected path: ${cardData.imagePath}`);
        
        cardFront.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        cardFront.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: white; font-size: 2rem;">
                <span>🎂</span>
                <small style="font-size: 0.5rem; margin-top: 10px;">Missing: ${cardData.imagePath}</small>
            </div>
        `;
    });
    
    cardFront.appendChild(img);
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.innerHTML = `
        <span></span>
        <div>${cardData.message}</div>
        <span></span>
    `;
    
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCardFlip(card);
    });
    
/*
    card.addEventListener('touchend', (e) => {
        e.stopPropagation();
        toggleCardFlip(card);
    });
*/
    return card;
}

function toggleCardFlip(card) {
    card.classList.toggle('flipped');
}

function setupCarouselControls() {
    const carousel = document.getElementById('cardsCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || !prevBtn || !nextBtn) {
        console.error('❌ Carousel controls not found!');
        return;
    }
    
    const scrollAmount = 280; 
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        } else if (e.key === 'ArrowRight') {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });

    updateCarouselButtonsVisibility(carousel, prevBtn, nextBtn);
    carousel.addEventListener('scroll', () => {
        updateCarouselButtonsVisibility(carousel, prevBtn, nextBtn);
    });
}

function updateCarouselButtonsVisibility(carousel, prevBtn, nextBtn) {
    prevBtn.style.opacity = carousel.scrollLeft > 0 ? '1' : '0.5';
    prevBtn.style.pointerEvents = carousel.scrollLeft > 0 ? 'auto' : 'none';
    
    const scrollableWidth = carousel.scrollWidth - carousel.clientWidth;
    const isAtEnd = carousel.scrollLeft >= scrollableWidth - 10;
    nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
    nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
}

function setupUploadHandler() {
    const uploadBtn = document.getElementById('uploadBtn');
    const imageInput = document.getElementById('imageInput');
    const uploadStatus = document.getElementById('uploadStatus');
    const spinner = document.getElementById('spinner');
    
    if (!uploadBtn || !imageInput) {
        console.error('❌ Upload elements not found!');
        return;
    }
    
    uploadBtn.addEventListener('click', async () => {
        const file = imageInput.files[0];
        
        if (!file) {
            showStatus('Please select an image first', 'error', uploadStatus);
            return;
        }
        
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            showStatus('File too large (max 5MB)', 'error', uploadStatus);
            return;
        }
        
        uploadBtn.disabled = true;
        spinner.style.display = 'inline-block';
        showStatus('Uploading...', 'info', uploadStatus);
        
        try {
            const fileName = `uploads/${Date.now()}_${file.name}`;
            const storageRef = storage.ref(fileName);
            const uploadTask = storageRef.put(file);
            
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    showStatus(`Uploading: ${Math.round(progress)}%`, 'info', uploadStatus);
                },
                (error) => {
                    console.error('Upload error:', error);
                    showStatus(`Upload failed: ${error.message}`, 'error', uploadStatus);
                    uploadBtn.disabled = false;
                    spinner.style.display = 'none';
                },
                async () => {
                    try {
                        const downloadURL = await storageRef.getDownloadURL();
                        
                        const timestamp = Date.now();
                        const imageKey = db.ref('uploaded_images').push().key;
                        await db.ref(`uploaded_images/${imageKey}`).set({
                            url: downloadURL,
                            timestamp: timestamp,
                            fileName: file.name
                        });
                        
                        showStatus('✅ Photo uploaded successfully!', 'success', uploadStatus);
                        imageInput.value = '';
                        
                        setTimeout(() => {
                            uploadStatus.textContent = '';
                        }, 3000);
                    } catch (error) {
                        console.error('Save error:', error);
                        showStatus('Upload succeeded but save failed', 'error', uploadStatus);
                    } finally {
                        uploadBtn.disabled = false;
                        spinner.style.display = 'none';
                    }
                }
            );
        } catch (error) {
            console.error('Error:', error);
            showStatus(`Error: ${error.message}`, 'error', uploadStatus);
            uploadBtn.disabled = false;
            spinner.style.display = 'none';
        }
    });
}

function showStatus(message, type, element) {
    element.textContent = message;
    element.className = `upload-status ${type}`;
}
