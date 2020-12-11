(function () {
    const clock = document.querySelector('.clock');
    const btnGroup = document.querySelector('.btn-group');
    const playBtn = document.querySelector('.timer-start');
    const pauseBtn = document.querySelector('.timer-pause');
    const resetBtn = document.querySelector('.timer-reset');
    // const clockHandlerClick = (ev) => {
    //     if (ev.target.classList.contains('fa')) {
    //         btn = ev.target.parentElement;
    //     } else {
    //         btn = ev.target;
    //     }

    //     const btnClass = btn.className.split('-').pop();
    //     switch(btnClass) {
    //         case 'start' : isTiming
    //     }
        
    // }

    let isTiming = false;
    let currentTime = 0;
    // btnGroup.addEventListener('click', clockHandlerClick );
    playBtn.addEventListener('click', () => isTiming = true);
    pauseBtn.addEventListener('click', () => isTiming = false);
    resetBtn.addEventListener('click', () => {
        currentTime = 0;
        showTime();
    });

    const showTime = () => {
        let minutes = Math.floor( currentTime / 60 );
        let seconds = currentTime % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        clock.textContent = `${minutes}:${seconds}`;
    }

    setInterval(() => {
        if (!isTiming) {
            return;
        }
        currentTime++;
        clock.textContent = currentTime;
        showTime();
    }, 1000);


})();