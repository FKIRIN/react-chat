const app = require('http').createServer();
const io = require('socket.io')(app);
const openBrowsers = require('open-browsers');


const onLineUsers = {};
let onLineCount = 0;
io.on('connection', function(socket) {
  socket.on('login', function(data) {
    socket.id = data.userId;
    // 判断用户是否存在已有的用户中
    if (!onLineUsers.hasOwnProperty(data.userId)) {
      onLineUsers[data.userId] = data.username;
      onLineCount++;
      socket.emit('login', { 
        success: true,
        onLineUsers,
        onLineCount,
        user: data,
      })
      console.log(data.username + '加入群聊');
    } else {
      socket.emit('login', {
        success: false,
        message: '该用户已存在，请重新输入昵称'
      })
    }
  });

  // 断开连接
  socket.on('disconnect', function() {
    if (onLineUsers.hasOwnProperty(socket.id)) {
      const exitUser = { userId: socket.id, username: onLineUsers[socket.id]};
      delete onLineUsers[socket.id];
      onLineCount--;
      // 像客户端发起登出事件
      io.emit('logout', { 
        success: true,
        onLineUsers,
        onLineCount,
        user: exitUser,
      })
      console.log(exitUser.username + '退出了群聊');
    }
  });

  // 消息同步
  socket.on('message', function(data) {
    io.emit('message', data)
    console.log(data.username + '说:' + data.message);
  })
})

app.listen(3301, function(err) {
  if (!err) {
    console.log('websocket启动端口: 3301')
    // openBrowsers('http://localhost:3300');
  }
})