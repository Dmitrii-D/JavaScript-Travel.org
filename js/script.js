window.addEventListener('DOMContentLoaded', () => {                         //!ES6 () => {}
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),                //!ES6 (использование let)
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a = 1) {                                        //!ES6 (Параметр по умолчанию)
        for (let i = a; i < tabContent.length; i++) {                       //!ES6 (использование let)
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent();


    function showTabContent (b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }



    info.addEventListener('click', (event) => {                         //!ES6 () => {}
        let target = event.target;                                      //!ES6 (использование let)

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });







// Таймер

    let deadline = '2018-10-21';                                    //!ES6 (использование let)

    function getTimeRemaining (endtime) {                           // вычисляем остаток времени
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
            // hours = Math.floor((t/1000/60/60) % 24);             две строки, если необходимо указать кол-во дней
            // days = Math.floor((t/(1000*60*60*24)));

            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }

            return {
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById (id),                           //!ES6 (использование let)
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval (updateClock, 1000);


          function updateClock () {
            let t = getTimeRemaining (endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;


            if (t.total <= 0) {
                clearInterval (timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }

        }

    }

    setClock('timer', deadline);


// плавная прокрутка

let app = {                                                             //!ES6 (использование let)        
    scrolled: 0,
    newPosition: 0,
    interval: null,
    speed: 0,

    scrollTo: function(el) {
        let link = el.replace('#', ''),
            anchor = document.getElementById(link);

        let location = 0;
        if (anchor.offsetParent) {
            do {
                location += anchor.offsetTop;
                anchor = anchor.offsetParent;
            } while (anchor);
        }
        location = location >= 0 ? location : 0;

        this.animateScroll(location);
        return false;
    },

    animateScroll: function(pos) {
        document.documentElement.scrollTop = 1;
        let element = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement : document.body,
            start = element.scrollTop,
            change = pos - start,
            currentTime = 0,
            increment = 20,
            duration = 300;

        let animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
};

Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};                                                              

let link = document.querySelectorAll('a');
link.forEach(function(item) {
	item.addEventListener('click', function(e) {
		app.scrollTo(e.target.getAttribute('href'));
	});
});




// Modal

let more = document.querySelector('.more'),                         //!ES6 (использование let)
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close'),
    learnMore = document.querySelectorAll('.description-btn');



more.addEventListener('click', () => {                  //!ES6 () => {}
    overlay.style.display = 'block';
    more.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
});

close.addEventListener('click',  () => {                //!ES6 () => {}
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
});




learnMore.forEach (function(item, i) {                          // модальное окно на все кнопки "Узнать подробнее"
    learnMore[i].addEventListener('click', function () {
        overlay.style.display = 'block';
        more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

});
    

// form + formDown


let message = {
    loading: "Загрузка...",
    sucsess: "Спасибо! Скоро мы с Вами свяжемся!",
    failure: "Что-то пошло не так..."
};

let form = document.querySelector('.main-form'),
    formDown = document.querySelector('#form'),
    input = form.getElementsByTagName ('input'),
    statusMessage = document.createElement('div');
     

    statusMessage.classList.add('status');

function sendForm(elem){

    elem.addEventListener('submit', function (event) {
        event.preventDefault();
        elem.appendChild(statusMessage);
    
        let formData = new FormData(elem);
    
    function postData() {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    
            request.onreadystatechange = function () {
                if(request.readyState < 4) {
                    resolve()
                } else if (request.readyState === 4) {
                    if (request.status == 200 && request.status < 300) {
                        resolve()
                    } else {
                        reject()
                    }
                }
            };
    
            let obj = {};
            formData.forEach (function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
            request.send(json);


        });
    }
    
    function clearInput() {
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }
    
    postData (formData)
        .then (() => statusMessage.innerHTML = message.loading)
        .then (() => statusMessage.innerHTML = message.sucsess)
        .catch (() => statusMessage.innerHTML = message.failure)
        .then (clearInput)
    });


}

sendForm(form);
sendForm(formDown);
   



// slider

let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides (n) {

        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach ((item) => item.style.display = 'none');
        dots.forEach ((item) => item.classList.remove('dot-active'));

        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');

    }


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

prev.addEventListener ('click', function() {
    plusSlides(-1);
});

next.addEventListener ('click', function() {
    plusSlides(1);
});


dotsWrap.addEventListener('click', function(event) {
    for(let i = 0; i < dots.length + 1; i++) {
        if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
            currentSlide(i);
        } 
    }
});



// Calc


let persons = document.getElementsByClassName('counter-block-input')[0],
        restDays = document.getElementsByClassName('counter-block-input')[1],
        totalValue = document.querySelector('#total'),
        place = document.querySelector('#select'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('keyup', function() {
        this.value = this.value.replace(/[^0-9]/,"");
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000;
        if (restDays.value == '' || persons.value == '' || persons.value == 0 || restDays.value == 0) {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });
    restDays.addEventListener('keyup', function() {
        this.value = this.value.replace(/[^0-9]/,"");
        daysSum = +this.value;
        total = (daysSum + personsSum)*4000;
        if (persons.value == '' || restDays.value == '' || persons.value == 0 || restDays.value == 0) {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function(){
        if (persons.value == '' || restDays.value == '' || persons.value == 0 || restDays.value == 0) {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });






});