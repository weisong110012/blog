module.exports=(socket) => {
    // 群聊
    socket.on('sendGroupMsg', function (data) {
        socket.broadcast.emit('receiveGroupMsg', data);
    });
    // 上线
    socket.on('online', name => {
        socket.broadcast.emit('online', name)
    });

}