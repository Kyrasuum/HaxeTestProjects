package;

/**
 * ...
 * @author Kyrasuum
 */
class User implements hxbit.NetworkSerializable{
	var client: Main;
	@:s public var uid : Int;

    public function networkAllow(op: hxbit.NetworkSerializable.Operation, propId: Int, client: hxbit.NetworkSerializable):Bool {
        return client == this;
    }
    
	public function alive(){
		init();

		if(uid == client.uid){
		    client.user = this;
			client.host.self.ownerObject = this;
		}
    }

	function init(){
		client = Main.inst;
		client.log("Init "+this);
		enableReplication = true;
	}
    
    public function new(uid = 0){
        this.init();
        this.uid = uid;
    }
}

class Main extends hxd.App{
	static var HOST = "127.0.0.1";
	static var PORT = 6676;

	public var host: hxd.net.SocketHost;
	public var event: hxd.WaitEvent;
	public var uid: Int;

    public var user: User;
	public static var inst: Main;

    override function init(){
		event = new hxd.WaitEvent();
		host = new hxd.net.SocketHost();
		host.setLogger(function(msg) log(msg));


        if(!hxd.net.Socket.ALLOW_BIND){
            #if flash
                log("Using network with flash requires compiling with -lib air3 and running through AIR");
            #else
                log("Server not allowed on this platform");
            #end
        }

        try {
            host.wait(HOST, PORT, function(c){
                log("Client Connected");
            });
            host.onMessage = function(c, uid: Int){
                log("Client identified ("+uid+")");
                var client = new User(uid);
                c.ownerObject = client;
                c.sync();
            };
            log("Server Started");

            start();
        }catch(e: Dynamic){
            // we could not start the server
            log("Connecting");

            uid = 1 + Std.random(1000);
            host.connect(HOST, PORT, function(b){
                if(!b) {
                    log("Failed to connect to server");
                    return;
                }
                log("Connected to server");
                host.sendMessage(uid);
            });
        }
    }
    
    public function log(s: String, ?pos: haxe.PosInfos){
        pos.fileName = (host.isAuth ? "[S]" : "[C]") + " " + pos.fileName;
        haxe.Log.trace(s, pos);
    }

	function start(){
	    host.makeAlive();
	}
	
	override function update(dt:Float){
		event.update(dt);
		host.flush();
	}
    
    static function main(){
        inst = new Main();
    }
}
