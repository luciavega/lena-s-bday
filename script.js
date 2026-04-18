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
    { imagePath: "img/0_La_Loca_CM.png",   message: `Vas a empezar un nuevo camino sin mirar atrás.
Cuidado, tus decisiones forman el destino, aprovecha lo ya aprendido para llegar a donde tenés en mente.
Van a venir nuevas compañías, sos vos quien debe determinar quién vale la pena mantener y con quien empezar un nuevo vínculo.`
},
    { imagePath: "img/I_La_Maga_CM.png", message: "Tenés todas las herramientas necesarias para concretar tus aspiraciones y deseos, ahora hay que ponerse manos a la obra.\nYa tropezaste y te levantaste, no tengas miedo, activa con esa idea que tenés en mente."},
    { imagePath: "img/II_La_Papisa_CM.png", message: "Estás en un punto donde podés tomar decisiones coherentes y fundadas.\nHacé caso a tu intuición, si hay algo o alguien que te da malas vibras, corre!"},
    { imagePath: "img/III_La_Emperatriz_CM.png", message: "Conectá con tus emociones y tu mente.\nA veces no es cuestión de hacer, es cuestión de frenar e interiorizar lo que uno quiere hacer.\nSe vienen cosas buenas, aprovéchalo."},
    { imagePath: "img/IV_El_Emperador_CM.png", message: "Tenés la fuerza y los medios, pero usá la razón antes de actuar.\nSi estás en una situación donde no hay un líder claro, es tu momento para tomar la posta.\nNo tengas miedo: hay alguien que debe hacerlo, y vos sos esa persona." },
    { imagePath: "img/V_El_Papa_CM.png",message: "Sé consciente de que tus acciones son observadas por otras personas, actuá con el ejemplo.\nPreguntate: “¿qué enseñanza quiero dejar?”" },
    { imagePath: "img/VI_El_Enamorado_CM.png", message: "Ya es momento de tomar una decisión.\nPuede que tengas que poner en la balanza el corazón y la razón.\nTomate el tiempo y reflexiona.\nLa decisión que tomes no es el fin del mundo, siempre y cuando la tomes vos.\nNo dejes que otros te influencien y se apropien de tu camino." },
    { imagePath: "img/VII_El_Carro_CM.png", message: "Es momento de avanzar sin dudar.\nEstás al mando, pero hace falta decisión y dirección.\nNo te disperses: elegí un rumbo y sostenelo.\nHay impulso, hay fuerza, pero sos vos quien tiene que agarrar las riendas."},
    { imagePath: "img/VIII_La_Justicia_CM.png", message: "Todo acto tiene consecuencia. Este es un momento de claridad: lo que das, vuelve.\nSé honesto/a con vos mismo/a y con los demás.\nNo te engañes para evitar conflictos, la verdad ordena." },
    { imagePath: "img/IX_La_Ermitaña_CM.png",message: "Necesitás un momento de retiro.\nAlejarte un poco del ruido te va a dar respuestas.\nNo es soledad, es búsqueda interna.\nEscuchate más de lo que escuchás afuera."},
    { imagePath: "img/X_La_Rueda_De_La_Fortuna_CM.png", message: "Se vienen cambios inevitables.\nHay cosas que no podés controlar, pero sí cómo reaccionás.\nConfiá: lo que se mueve, te mueve hacia donde tenés que estar."},
    { imagePath: "img/XI_La_Fuerza_CM.png",message: "No todo se resuelve con impulso.\nA veces, la verdadera fuerza es la paciencia.\nDominar lo que sentís, sin reprimirlo, es tu mayor poder ahora."},
    { imagePath: "img/XII_El_Colgado_CM.png", message: "Hay que ver las cosas desde otro ángulo.\nAunque incomode, este freno tiene sentido.\nSoltá el control por un momento, no todo se resuelve haciendo."},
    { imagePath: "img/XIII_La_Muerte_CM.png", message: "Un cierre necesario.\nAlgo termina para que otra cosa empiece.\nNo te aferres a lo que ya cumplió su ciclo, aunque duela.\nHay transformación." },
    { imagePath: "img/XIV_La_Templanza_CM.png",message: "Buscá el equilibrio.\nNo te vayas a los extremos.\nTodo se acomoda cuando aprendés a combinar lo que sentís con lo que pensás." },
    { imagePath: "img/XV_El_Diablo_CM.png", message: "Cuidado con lo que te ata. Puede ser una persona, un hábito o una idea.\nNo todo lo que atrae te hace bien.\nPreguntate qué estás eligiendo sostener." },
    { imagePath: "img/XVI_La_Torre_CM.png", message: "Se cae lo que no estaba firme. Puede doler, pero es necesario.\nDespués del quiebre viene la reconstrucción, más honesta." },
    { imagePath: "img/XVII_La_Estrella_CM.png", message: "Hay esperanza.\nDespués de momentos difíciles, aparece calma.\nPermitite creer de nuevo, confiar y abrirte a lo que viene."},
    { imagePath: "img/XVIII_La_Luna_CM.png", message: "No todo es lo que parece.\nHay confusión, miedos o cosas ocultas.\nNo tomes decisiones desde la incertidumbre: esperá a ver con claridad."},
    { imagePath: "img/XIX_El_Sol_CM.png", message: "Alegría, claridad y vitalidad. Estás en un momento para disfrutar.\nMostrate tal como sos, sin miedo. Hay luz en tu camino." },
    { imagePath: "img/XX_El_Juicio_CM.png",  message: "Es tiempo de mirar atrás y entender. Hay un llamado a crecer.\nPerdonate, aprendé y avanzá con otra conciencia."},
    { imagePath: "img/XXI_El_Mundo_CM.png", message: "Cierre de ciclo y logro. Llegaste a un punto importante.\nReconocé lo que construiste. Ahora sí, estás listo/a para empezar algo nuevo." }
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
    
   // Detecta iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// Detecta si el dispositivo tiene touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isIOS) {
    // iOS: touchend
    card.addEventListener('touchend', (e) => {
        if (e.target.tagName !== 'IMG') return;
        e.stopPropagation();
        toggleCardFlip(card);
    });
} else if (isTouchDevice) {
    // Otros dispositivos táctiles: touchstart
    card.addEventListener('touchstart', (e) => {
        if (e.target.tagName !== 'IMG') return;
        e.stopPropagation();
        toggleCardFlip(card);
    });
} else {
    // Escritorio: click
    card.addEventListener('click', (e) => {
        if (e.target.tagName !== 'IMG') return;
        e.stopPropagation();
        toggleCardFlip(card);
    });
}
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
        
        const maxSize = Infinity;
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
