// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         alert(data.puzzle);
//     })
// })




var form = document.querySelector('form#weather');
var error = document.querySelector('p.error');
var message = document.querySelector('p.message');
const search = document.querySelector('input.location');
form.addEventListener('submit',(e) => {
    e.preventDefault();  
    message.textContent = "...Loading!!!"; 
    fetchApi(search);     
       
})

function fetchApi(search){
    fetch('/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                error.textContent = data.error;
                message.textContent = "";
                return false;
            }
            message.textContent = "Current Location: " + data.location + " Temperature " + data.forecast;
            error.textContent = "";
        })
    })
}
