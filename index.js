var http=require('http');
var express=require('express');

var app=express();
var server=http.createServer(app);
var io=require('socket.io')(server);
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.get("/",function(req,res){res.render('index');});


app.get("/id",function(req,res){res.send(buttonValue.toString());});

var buttonValue=0;


io.on('connection',function(socket){
    console.log('client connected.....');
    io.emit('clicked message',buttonValue);
    socket.on('clicked message',function(msg){
        buttonValue=1-buttonValue; 
        io.emit('clicked message',buttonValue);
        console.log('Received message from client!',msg);
    
    });

    socket.on('disconnect' , function(){
        console.log('cleint disconnected.....');
    });
});





server.listen(3000);
