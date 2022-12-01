let socket = io();

function scrollToBottom() {
    let message = document.querySelector('#message').lastElementChild;
    message.scrollIntoView();
}

socket.on('connect', () => {
    console.log('Connected to server.');
});
socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('LT');
    const template = document.querySelector('#message-template').innerHTML;

    const html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime,
    });

    const div = document.createElement('div');
    div.innerHTML = html;

    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('LT');
    console.log('newLocationMessage', message);
    const template = document.querySelector(
        '#location-message-template'
    ).innerHTML;

    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime,
    });

    const div = document.createElement('div');

    div.innerHTML = html;

    document.querySelector('#messages').appendChild(div);
});

document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: document.querySelector('input[name="message"]').value,
        },
        () => {
            document.querySelector('input[name="message"]').value = '';
        }
    );
});

document.querySelector('#send-location').addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            socket.emit('createLocationMessage', {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        },
        () => {
            alert('Unable to fetch location.');
        }
    );
});