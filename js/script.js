document.addEventListener('DOMContentLoaded', () => {
    const collage = document.querySelector('.collage');
    const fullScreenImgSection = document.querySelector('.fullScreenImgSection');
    const fullScreenImg = document.querySelector('.fullScreenImg');
    const closeBtn = document.querySelector('.closeBtn');
    let collageImages = [];
    let isFullScreen = false;
    
    async function fetchAnimalImage() {  // Функция,которая получает изображение с сайта
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.log('Ошибка при загрузке изображения: ', error);
        }
    }

   async function addImageToCollage() {  // Функция,которая добавляет изображения в коллаж

    if (isFullScreen) return; // Если изображение открыто,то другие изображения не подгружаются в коллаж

    const imageUrl = await fetchAnimalImage(); 
    if (!imageUrl) return; // Если изображение не было загружено, выходим из функции

    const imageElement = document.createElement('img'); // Создаем тег <img>
    imageElement.src = imageUrl; // адрес изображения берется из результата функции fetchAnimalImage()
    imageElement.alt = 'Animal Image';
    imageElement.style.objectFit = 'cover';
    imageElement.classList.add('collage-image'); // к тегу добавляем класс

    imageElement.addEventListener('click', () => { // при нажатии на изображение оно появляется в увеличенном размере
        fullScreenImgSection.style.display = 'flex';
        fullScreenImg.src = imageUrl;
        isFullScreen = true;
    });

    // Рандомно выбираем количество колонок и рядов
    const gridColumnEnd = Math.floor(Math.random() * 2) + 1;
    const gridRowEnd = Math.floor(Math.random() * 2) + 1;

    imageElement.style.gridColumnEnd = `span ${gridColumnEnd}`;
    imageElement.style.gridRowEnd = `span ${gridRowEnd}`;

    collage.appendChild(imageElement); // Добавляем изображение в коллаж
    collageImages.push(imageElement); // Добавляем изображение в массив полученных изображений с сайта

    if (collageImages.length > 10) { // Если количество изображений в массиве больше 10
        const oldImage = collageImages.shift(); // то удаляем первое изображение из массива
        collage.removeChild(oldImage); // и удаляем его из коллажа
    }
    }

    // Закрытие полноэкранного режима
    closeBtn.addEventListener ('click', () => {
        fullScreenImgSection.style.display = 'none';
        isFullScreen = false;
    });

    setInterval(addImageToCollage, 3000); // Каждые 3 секунды добавляем изображение в коллаж 
})