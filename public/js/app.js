fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log('DATA', data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'
// messageTwo.textContent = 'From JavaScript 2'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    if (!location) {
        console.log('Unable to find location. Try another search.')
        return
    }

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('ERROR', data.error)
                messageOne.textContent = `Error: ${data.error}`
            } else {
                console.log('Location:', data.location)
                console.log('Forecast:', data.forecast)

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })  

    console.log('Search value', location)
})