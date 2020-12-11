(function () {
    const imgs = [
        '<img src="img/P1010181.JPG" alt = "front">',
        '<img src="img/P1010184.JPG" alt = "front">',
        '<img src="img/P1010197.JPG" alt = "front">',
        '<img src="img/P1010204.JPG" alt = "front">',
        '<img src="img/P1010209.JPG" alt = "front">',
    ];

    let points = 0;

    /*
    <div class="col-2 offset-1">
        <div class="front">
            <i class="fa fa-cab"></i>
        </div>
        <div class="back"></div>
    </div>
    */
    const getOneCard = (imgs) => {
        const div = document.createElement('div');
        div.classList.add('col-2', 'card');
        div.innerHTML = `<div class="card__front">
                ${imgs}
            </div>
            <div class="card__back">
                <img src="img/Székely kapuk.jpg" alt="back">
            </div>`;
        return div;
    };

    const shuffle = (array) => {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;


        while (0 !== currentIndex) {


            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;


            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    const imgArray = imgs.concat(imgs);
    shuffle(imgArray);
    const row1 = document.querySelector('.card-row:nth-child(2)');
    const row2 = document.querySelector('.card-row:nth-child(3)');
    let i = 0;
    for (const imgs of imgArray) {
        i++;
        const card = getOneCard(imgs);
        if (i < 6) {
            row1.appendChild(card);
        } else {
            row2.appendChild(card);
        }
    }

    let blockClicks = false;
    const cardClick = (ev) => {
        if (blockClicks) {
            return;
        }

        ev.currentTarget.classList.toggle('flipped');
        const flippedCards = document.querySelectorAll('.card.flipped');
        if (flippedCards.length > 1) {
            blockClicks = true;
            const to = setTimeout(() => {
                clearTimeout(to);
                blockClicks = false;
                document.querySelectorAll('.card').forEach(card => {
                    card.classList.remove('flipped');
                });
            }, 2000);

            checkPair();
        }


    };

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', cardClick);
    });

    const showPoints = (points) => {
        document.querySelector('.user-points').textContent = points;
    }

    const checkPair = () => {
        const firstCardImg = document.querySelector('.card.flipped i');
        if (firstCardImg) {
            const firstImgClass = firstCardImg.className.split(' ');
            const pair = document.querySelectorAll(`.card.flipped .${firstImgClass.pop()}`);
            if (pair.length == 2) {
                points++;
                showPoints(points);
                document.querySelectorAll(`.card.flipped`).forEach(
                    card => card.classList.add('found')
                );
            }
        }
    }
})();