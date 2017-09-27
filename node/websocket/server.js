var websocket = require('ws');
var Port=3000,
	count=0;
var wss = new websocket.Server({
	port:Port
});

wss.on('connection',function (ws,req){
	count++;
	var ms={};
	ms.type= "in";
	ms.str="user"+count;
	broadcast(JSON.stringify(ms)); // 将对象格式化为字符串
	ws.on('message',function (message){
			var ms={};
			ms.type= "message";
			ms.str="user"+count+"say: "+message;
			broadcast(JSON.stringify(ms));
	});

	ws.on('close',function () {
		var ms={};
			ms.type= "out";
			ms.str="user"+count;
		broadcast(JSON.stringify(ms));
	});
});



function broadcast(ms) {
		wss.clients.forEach(function (client){
		if(client.readyState == websocket.OPEN){ // 向所有人广播 包含了所有连接，clients数组对象
					client.send(ms);
				}
			});
}

console.log("App is running at port"+Port);