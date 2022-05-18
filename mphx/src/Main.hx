package;

/**
 * ...
 * @author Kyrasuum
 */
class Main {
    var ip = "127.0.0.1";
    var port = 8000;

    var ServerSocket: mphx.server.impl.Server;
    var clientSocket: mphx.client.Client;

    public function server(){
		ServerSocket = new mphx.server.impl.Server(ip,port);

		var roomA = new mphx.server.room.Room();
		ServerSocket.rooms.push(roomA);

		var roomB = new mphx.server.room.Room();
		ServerSocket.rooms.push(roomB);

		var roomC = new mphx.server.room.Room();
		ServerSocket.rooms.push(roomC);

		ServerSocket.events.on("MoveIntoRoom",function(data:Dynamic,sender:mphx.connection.IConnection){
			trace("Recieved a message from the client.");
			trace("Placing the client in room "+data);

			if (data == "A")
			{
				trace(sender.putInRoom(roomA));
				roomA.broadcast("RoomBroadcast","Someone was put into room A");

			}else if (data == "B")
			{
				trace(sender.putInRoom(roomB));
				roomB.broadcast("RoomBroadcast","Someone was put into room B");

			}else if (data == "C")
			{
				trace(sender.putInRoom(roomC));
				roomC.broadcast("RoomBroadcast","Someone was put into room C");

			}else{
				trace("Client requested to be put into unknown room "+data);
			}

		});

		ServerSocket.start();
    }

    public function client(){
		clientSocket = new mphx.client.Client(ip,port);

		clientSocket.connect();

		var rooms = ["A","B","C"];
		var random = Math.floor(Math.random()*3);
		var room = rooms[random]; //Room now contains A B or C.

		trace("Requesting to join room "+room); //Outputs which room the client wishes to join.

		clientSocket.send("MoveIntoRoom",room); //Requesting to join the room.

		//Now the server sends a message (in each room) that says
		//'Someone was put into room [Room Letter]'

		clientSocket.events.on("RoomBroadcast",function (data){
			trace("Recieved message: " + data);
		});

		//This just creates an 'update loop' so that the program won't close in
		//terminal. On JS, it uses websockets and is in a browser, so doesn't
		//Need a runloop.
		#if !js
		var quit = false;
		while (quit == false){
			clientSocket.update();
			Sys.sleep(0.01); // wait for 1 ms

		}
		#end
    }

	public function new(){
	    var mode = "server";
		if (Sys.args()[0] != null) mode = Sys.args()[0];
		if (Sys.args()[1] != null) ip = Sys.args()[1];
		if (Sys.args()[2] != null) port = Std.parseInt(Sys.args()[2]);

		if (mode == "server"){
		    trace("Starting Server");
		    server();
		}else {
		    trace("Starting Client");
		    client();
		}
	}

	public static function main(){
		new Main();
	}
}
