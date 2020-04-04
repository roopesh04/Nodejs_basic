console.log("Client side server Jvascript loaded")

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='From JAvaSrcrit'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent="Loading.."
    messageTwo.textContent=""

    const location=search.value
    const url="http://localhost:3000/weather?address="

    if(!location){
        messageOne.textContent="Address is needed to be provided"
    }else{
        const search_url=url+location
        
        fetch(search_url).then((response)=>{
            response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=(data.error)
                messageTwo.textContent=" "
            }else{
                messageOne.textContent=(data.address)
                messageTwo.textContent=(data.forecast)
            }
            })
        })
    }

})