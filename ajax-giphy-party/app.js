const form = document.querySelector('#inputForm');
form.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.id === 'submitButton') {
        const input = e.target.previousElementSibling.value;
        getGif(input);
    }
    else if (e.target.id === 'clearButton') {
        document.querySelector('#gifDisplayDiv').innerHTML = '';
    }
})

async function getGif(input) {
    try {
        const res = await axios.get(`http://api.giphy.com/v1/gifs/search?q=${input}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`);
        gifUrl = extractRandomGif(res);
        appendGif(gifUrl);

    }
    catch (e) {
        if (e.message === "Cannot read property 'images' of undefined") {
            form.firstElementChild.value = `No '${input}' gifs`;
        }
        console.log(e);
    }
}

function extractRandomGif(data) {
    const gifNum = Math.floor((Math.random() * 50));
    return data.data.data[gifNum].images.downsized_medium.url;
}

function appendGif(url) {
    const gif = document.createElement('IMG');
    gif.setAttribute('src', gifUrl)
    const displayDiv = document.querySelector('#gifDisplayDiv');
    displayDiv.append(gif);
}