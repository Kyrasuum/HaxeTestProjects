package;

import js.Node.*;
import js.node.*;
import js.node.readline.Interface;
import Console.*;

var Hyperswarm = require('hyperswarm');

/**
 * ...
 * @author Kyrasuum
 */
class Main {
    var topic_str: String = 'helloworld';
    var topic: Buffer;
    var sw: Dynamic;

    var peers: Map<String, {topic: Buffer, sw: Dynamic, srv: Dynamic, cli: Dynamic}> = [];
    var id = Crypto.randomBytes(32);

    var rl = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    public function new() {
        sw = Hyperswarm();
    }

    public function exit() {
        sw.destroy();
        for (peer in peers.keys()) {
            peers[peer].srv.destroy();
            peers[peer].cli.destroy();
            peers[peer].sw.destroy();
        }
        Sys.exit(0);
    }

    public function start() {
        server();
        client();
    }

    public function client() {
		rl.setPrompt('Send message: ');
		rl.prompt();
		rl.on(InterfaceEvent.Line, function(message: Dynamic) {
            for (peer in peers.keys()) {
                if (peers[peer].srv != null){
                    peers[peer].srv.write(message);
                } else if (peers[peer].cli != null){
                    peers[peer].cli.write(message);
                }
            }
			rl.prompt();
		}).on(InterfaceEvent.Close, function() {
            exit();
		});
    }

    public function server() {
        topic = Crypto.createHash('sha256').update(topic_str).digest();

        sw.join(topic, {lookup: true, announce: true});
        sw.on('error', function(socket: Dynamic, info: Dynamic) {});
        sw.on('connection', function(socket: Dynamic, info: Dynamic) {
            socket.on('error', function(err: Dynamic) {});
            socket.on('data', function(remote_id: Dynamic) {
                if (peers.exists(remote_id)) return;

                var ids_conn = (id + remote_id).split("");
                ids_conn.sort(function(a: String, b: String) {
                    if (a < b) return -1;
                    if (a > b) return 1;
                    return 0;
                });
                var topic_conn = Crypto.createHash('sha256').update(ids_conn.join("")).digest();
                var sw: Dynamic = Hyperswarm();
                peers.set(remote_id, {topic: topic_conn, sw: sw, cli: null, srv: null});
                sw.join(topic_conn, {lookup: true, announce: true});
                sw.on('error', function(socket: Dynamic, info: Dynamic) {});
                sw.on('disconnection', function(socket: Dynamic, info: Dynamic) {
                    if (!peers.exists(remote_id)){
                        return;
                    }
                    if (info.client) {
                        if (peers[remote_id].srv == socket) {
                            peers[remote_id].srv = null;
                        }
                    } else {
                        if (peers[remote_id].cli == socket) {
                            peers[remote_id].cli = null;
                        }
                    }
                });
                sw.on('connection', function(socket: Dynamic, info: Dynamic) {
                    socket.on('error', function(err: Dynamic) {});
                    socket.on('data', function(data: Dynamic) {
                        println("");
                        print("Message from ");
                        print(remote_id);
                        print(":");
                        println(data);
                        rl.prompt();
                    });
                    if (info.client) {
                        if (peers[remote_id].cli != null) {
                            peers[remote_id].cli.destroy();
                        } else {
                            println("");
                            print("Sender for ");
                            println(remote_id);
                            rl.prompt();
                        }
                        peers[remote_id].cli = socket;
                    } else {
                        if (peers[remote_id].srv != null) {
                            peers[remote_id].srv.destroy();
                        } else {
                            println("");
                            print("Receiver for ");
                            println(remote_id);
                            rl.prompt();
                        }
                        peers[remote_id].srv = socket;
                    }
                });

                println("");
                print("Connection from ");
                println(remote_id);
                print("Topic: ");
                println(ids_conn.join(""));
                rl.prompt();
            });
            socket.write(id);
        });
    }
    
	public static function main() {
        var app = new Main();
        app.start();
    }
}