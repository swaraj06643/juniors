document.addEventListener('DOMContentLoaded', function() {
    const greetingCard = document.querySelector('.greeting-card');
    const eventDetails = document.querySelector('.event-details');

    // Initial styles for the greeting card
    greetingCard.style.opacity = '0';
    greetingCard.style.transform = 'scale(0.8) rotate(5deg)';
    greetingCard.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';

    // Fade-in and scale effect
    setTimeout(function() {
        greetingCard.style.opacity = '1';
        greetingCard.style.transform = 'scale(1) rotate(0deg)';
    }, 500);

    // Event details
    eventDetails.innerHTML = `
        <div>
            <h2>Time</h2>
            <p>11:30 AM - 01:30 PM</p>
        </div>
        <div>
            <h2>Venue</h2>
            <p>Auditorium, Block 5</p>
            <p>Trident Academy of Technology, BBSR</p>
        </div>
    `;

    // Countdown timer
    const eventDate = new Date('2024-10-03T11:00:00').getTime();
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown';
    greetingCard.appendChild(countdownElement);

    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <h2>Event Starts In</h2>
            <div class="countdown-timer">
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
                <span>${seconds}s</span>
            </div>
        `;

        if (distance < 0) {
            clearInterval(countdown);
            countdownElement.innerHTML = "<h2>Event Has Started!</h2>";
            clearInterval(pulsateColors); // Stop pulsating colors if event has started
        }
    }, 1000);

    // Pulsating effect on grid items
    const gridItems = document.querySelectorAll('.event-details div');
    const pulsateColors = setInterval(() => {
        gridItems.forEach(item => {
            item.style.backgroundColor = getRandomColor();
            item.style.transition = 'background-color 0.5s ease';
        });
    }, 1000);

    // Function to generate a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Bounce effect on greeting card
    greetingCard.addEventListener('animationend', () => {
        greetingCard.classList.remove('bounce');
    });

    greetingCard.classList.add('bounce');
});

// CSS for the bounce effect
const style = document.createElement('style');
style.innerHTML = `
    .bounce {
        animation: bounce 0.5s ease forwards;
    }

    @keyframes bounce {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);
