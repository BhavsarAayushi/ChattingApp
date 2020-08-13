const io = require('socket.io')(3000)
const users = {}
io.on('connection', socket => {
	socket.on('userName', user =>{
		users[socket.id] = user
		socket.broadcast.emit('userConnected',user)
	})
	socket.on('send-chat-messgage', message => {
		socket.broadcast.emit('msg',{message:message, user : users[socket.id]})
		
	})
	socket.on('disconnect', () =>{
		socket.broadcast.emit('userDisconnected',users[socket.id])
		delete users[socket.id] 
		
	})
})