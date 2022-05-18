package;

import hx.ws.WebSocket;
import hx.ws.WebSocketServer;
import hx.ws.SocketImpl;
import hx.ws.WebSocketHandler;
import hx.ws.Types;

/**
 * ...
 * @author Kyrasuum
**/
class RoomListHandler extends WebSocketHandler {
    var rooms: Map<String, {ip: String, port: Int}> = [];

    public function handleMsg(s: SocketImpl, msg: String) {
        if (StringTools.startsWith(msg, "CREATE")) {
            var data = msg.substr(7);
            var comp = data.split(":");
            var room = comp[0];
            var port = Std.parseInt(comp[1]);
            var host = s.peer().host.toString();

            rooms.set(room, {port: port, ip: host});
            trace("RoomListHandler: Client " + id + " Created Room: <" + room + "> " + host + ":" + port);
        } else if (StringTools.startsWith(msg, "QUERY")) {
            trace("RoomListHandler: Client " + id + " Querying Rooms");
            var data: String = "";
            for (name => room in rooms){
                data = data + name + ":" + room.ip + ":" + room.port + "\n";
            }
            send(data);
        } else {
            trace("RoomListHandler: Client " + id + " Unknown Message");
            trace(msg);
        }
    }

    public function new(s: SocketImpl) {
        super(s);
        onopen = function() {
            trace("RoomListHandler: Client " + id + " Connected");
        }
        onclose = function() {
            trace("RoomListHandler: Client " + id + " Disconnected");
        }
        onmessage = function(message: MessageType) {
            switch (message) {
                case BytesMessage(content):
                    handleMsg(s, content.readAllAvailableBytes().toString());
                case StrMessage(content):
                    handleMsg(s, content);
            }
        }
        onerror = function(error) {
            trace("RoomListHandler: Client " + id + " ERROR: " + error);
        }
    }
}

class RoomHandler extends WebSocketHandler {
    public function handleMsg(s: SocketImpl, msg: String) {
        trace("RoomHandler: Client " + id + " MSG: " + msg);
    }

    public function new(s: SocketImpl) {
        super(s);
        onopen = function() {
            trace("RoomHandler: Client " + id + " Connected");
        }
        onclose = function() {
            trace("RoomHandler: Client " + id + " Disconnected");
        }
        onmessage = function(message: MessageType) {
            switch (message) {
                case BytesMessage(content):
                    handleMsg(s, content.readAllAvailableBytes().toString());
                case StrMessage(content):
                    handleMsg(s, content);
            }
        }
        onerror = function(error) {
            trace("RoomHandler: Client " + id + " ERROR: " + error);
        }
    }
}

class ProxyHandler extends WebSocketHandler {
    static var server: WebSocket;
    static var clients: Map<String, {port: Int, sock: WebSocketServer<ProxyHandler>}> = [];

    public function handleMsg(s: SocketImpl, msg: String) {
        trace("ProxyHandler: Client " + id + " MSG: " + msg);
    }

    public function new(s: SocketImpl) {
        super(s);
        onopen = function() {
            trace("ProxyHandler: Client " + id + " Connected");
        }
        onclose = function() {
            trace("ProxyHandler: Client " + id + " Disconnected");
        }
        onmessage = function(message: MessageType) {
            switch (message) {
                case BytesMessage(content):
                    handleMsg(s, content.readAllAvailableBytes().toString());
                case StrMessage(content):
                    handleMsg(s, content);
            }
        }
        onerror = function(error) {
            trace("ProxyHandler: Client " + id + " ERROR: " + error);
        }
    }
}

class Main {
    // room list handler
    var rh_ip = "DESKTOP-RI909US";
    var rh_port = 8000;

    function randPort(): Int {
        return Math.round(Math.random() * 64511 + 1024);
    }

    function client() {
        var ws = new WebSocket("ws://" + rh_ip + ":" + rh_port);
        var running = true;
        while (running) {
            trace("Client menu:\n\t0) Exit\n\t1) Join room\n\t2) Create room");
            var input = Sys.stdin().readLine();
            var cmd = Std.parseInt(input.charAt(0));
            switch (cmd) {
                case 0: {
                    running = false;
                    ws.close();
                }
                case 1: {
                    queryRoom(ws);
                }
                case 2: {
                    roomServer(ws);
                }
                default: {
                    trace("Unknown command");
                }
            }
        }
    }

    function queryRoom(ws: WebSocket) {
        ws.send("QUERY");
        ws.onmessage = function(message: MessageType) {
            var msg: String;
            switch (message) {
                case BytesMessage(content):
                    msg = content.readAllAvailableBytes().toString();
                case StrMessage(content):
                    msg = content;
            }
            var lines = msg.split("\n");
            var rooms: Map<String, {ip: String, port: Int}> = [];
            trace("Select room to join: ");
            for (i in 0...(lines.length-1)){
                var line = lines[i];
                var data = line.split(":");
                var room = data[0];
                var host = data[1];
                var port = Std.parseInt(data[2]);
                
                rooms.set(room, {ip: host, port: port});
                trace("\t<" + room + ">\t" + host + ":" + port);
            }
            trace("Any other answer to cancel");
            var input = Sys.stdin().readLine();
            if (rooms.exists(input)) {
                joinRoom(input, rooms.get(input).ip, rooms.get(input).port);
            }
            ws.onmessage = function(_: MessageType) {}
        }
    }

    function joinRoom(room: String, ip: String, port: Int) {
        var ws = new WebSocket("ws://" + ip + ":" + port);
        var running = true;
        while (running) {
            trace("Client menu:\n\t0) Exit\n\t1) Send Msg");
            var input = Sys.stdin().readLine();
            var cmd = Std.parseInt(input.charAt(0));
            switch (cmd) {
                case 0: {
                    running = false;
                    ws.close();
                }
                case 1: {
                    trace("Enter Msg");
                    ws.send(Sys.stdin().readLine());
                }
                default: {
                    trace("Unknown command");
                }
            }
        }
    }

    function roomServer(ws: WebSocket) {
        trace("Enter room name: ");
        var room = Sys.stdin().readLine();
        var port = randPort();
        var host = sys.net.Host.localhost();
        ws.send("CREATE " + room +  ":" + port);

        // local room handling
        trace("Starting Room Server");
        var room_server = new WebSocketServer<RoomHandler>(host, port, 10);
        room_server.start();

        joinRoom(room, host, port);
        room_server.stop();
    }

    function listServer() {
        var list_server = new WebSocketServer<RoomListHandler>(sys.net.Host.localhost(), rh_port, 10);
        list_server.start();
    }

    public function new() {
	    var mode = "";
		if (Sys.args()[0] != null) mode = Sys.args()[0];

		if (mode == ""){
		    trace("Starting Room List Server");
		    listServer();
		}else {
		    trace("Starting Client");
		    client();
		}
    }

    static public function main() {
        new Main();
    }
}
