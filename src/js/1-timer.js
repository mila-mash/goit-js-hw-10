import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      //   window.alert('Please choose a date in the future');
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);
let userSelectedDate;

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector('.datetime-picker');
const start = document.querySelector('.datetime-btn');
const timer = document.querySelector('.timer');
const daysShow = timer.querySelector('[data-days]');
const hoursShow = timer.querySelector('[data-hours]');
const minutesShow = timer.querySelector('[data-minutes]');
const secondsShow = timer.querySelector('[data-seconds]');

start.addEventListener('click', clickStartHandler);

start.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function clickStartHandler() {
  start.disabled = true;
  datetimePicker.disabled = true;

  const intervalID = setInterval(() => {
    const currentDate = new Date();
    const deltaTime = userSelectedDate - currentDate;

    if (deltaTime <= 0) {
      clearInterval(intervalID);
      datetimePicker.disabled = false;
      return;
    }

    const time = convertMs(deltaTime);
    updateTimeShow(time);
  }, 1000);
}

function updateTimeShow({ days, hours, minutes, seconds }) {
  daysShow.textContent = `${days}`.padStart(2, 0);
  hoursShow.textContent = `${hours}`.padStart(2, 0);
  minutesShow.textContent = `${minutes}`.padStart(2, 0);
  secondsShow.textContent = `${seconds}`.padStart(2, 0);
}
