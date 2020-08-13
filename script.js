const socket = io('http://localhost:3000')
const formMsg = document.getElementById('send-container')
const msgContainer = document.getElementById('msg-div')
const fromMessage = document.getElementById('msg-input')
const user = prompt('Your Name: ')
appendMessage('You joined')
socket.emit('userName',user)
socket.on('msg',data =>{
	appendMessage(`${data.user}:  ${data.message}`)
})
socket.on('userConnected',user =>{
	appendMessage(`${user} Connected`)
})
socket.on('userDisconnected',user =>{
	appendMessage(`${user} Disconnected`)
})
formMsg.addEventListener('submit' , e =>{
	e.preventDefault()
	const message = fromMessage.value
	appendMessage(`You:  ${message}`)
	socket.emit('send-chat-messgage', message)
	fromMessage.value = ''
})

function appendMessage(message){

	const msgElement = document.createElement('div')
	 msgElement.setAttribute('class', 'container');
	msgElement.innerText = message
	msgContainer.append(msgElement)
}