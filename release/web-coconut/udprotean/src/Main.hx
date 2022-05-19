package;

/**
 * ...
 * @author Kyrasuum
 */

class ClientBehavior extends udprotean.server.UDProteanClientBehavior{
    override function initialize(){}
    override function onConnect(){
        send(haxe.io.Bytes.ofString("hello from server"));
    }
    override function onDisconnect(){
        send(haxe.io.Bytes.ofString("goodbye from server"));
    }
    override function onMessage(message: haxe.io.Bytes){
        // Repeat all messages back to the client.
        trace(message.toString());
        send(message);
    }
}

class Client extends udprotean.client.UDProteanClient{
    override function initialize(){}
    override function onConnect(){
        send(haxe.io.Bytes.ofString("hello from client"));
    }
    override function onDisconnect(){
        send(haxe.io.Bytes.ofString("goodbye from client"));
    }
    override function onMessage(message: haxe.io.Bytes){
        trace(message.toString());
    }
}

class Main {
    var ip = "127.0.0.1";
    var port = 8000;

    var ServerSocket: udprotean.server.UDProteanServer;
    var clientSocket: udprotean.client.UDProteanClient;

    var running = true;

    public function server(){
        ServerSocket = new udprotean.server.UDProteanServer("0.0.0.0", port, ClientBehavior);
        ServerSocket.start();

        ServerSocket.onClientConnected(client -> { });
        ServerSocket.onClientDisconnected(client -> { });
        
        while (running){
            // Synchronously read and process incoming datagrams.
            ServerSocket.update();
        }
        
        ServerSocket.stop();
    }

    public function client(){
        var clientSocket = new Client(ip, port);
        clientSocket.connect();
        
        while (running){
            // Synchronously read and process incoming datagrams.
            clientSocket.update();
        }
        
        clientSocket.disconnect();
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
    
    static public function main() {
        new Main();
    }
}
