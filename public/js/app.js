console.log('client side javascript loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1=document.querySelector('#message1')
const m2=document.querySelector('#message2')
const m3=document.querySelector('#message3')
const m4=document.querySelector('#message4')
const m5=document.querySelector('#message5')
const m6=document.querySelector('#message6')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if (data.error) {
                m1.textContent=data.error
            } else {
                m1.textContent='Location: '+data.location
                m2.textContent='Latitude: '+data.latitude
                m3.textContent='Longitude: '+data.longitude
                m4.textContent='Weather Description: '+data.weatherDescription
                m5.textContent='Current Temperature: '+data.currentTemp
                m6.textContent='Feels Like: '+data.feelsLike
                
            }
        })
    })
})


// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })