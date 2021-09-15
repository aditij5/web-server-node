//console.log("Running client side javascript file to fetch data");



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //console.log("Weather: " + search.value);
    e.preventDefault();
    msg1.textContent="Loading....";
    msg2.textContent="";
    fetch("/weather?address="+encodeURIComponent(search.value)).then(response => {
       // msg1.textContent="";  
    response.json().then(data => {
        if(data.error) {
            console.log("Error: " + data.error);
            msg1.textContent="Error: " + data.error;
        }else {
            console.log(data)
            console.log("Location: " + data.location);
            console.log("Data: " + data.forecast);
            msg1.textContent="Location: " + data.location;
            msg2.textContent="Forecast: " + data.forecast;
        }
    })
}).catch(err => {
    console.log("Error: " + err);
})
})
