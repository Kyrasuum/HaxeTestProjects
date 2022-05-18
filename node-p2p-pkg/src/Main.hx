package;

import p2p.P2P;

import js.Node.*;
import js.node.*;
import js.node.readline.Interface;

/**
 * ...
 * @author Kyrasuum
 */

class Main {
    var rl = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var net: P2P;

    public function new() {
        net = new P2P();
        net.topic_str = "TestWorld";

        var recv_msg = net.recv_msg;
        var new_conn = net.new_conn;
        var tim_conn = net.tim_conn;
        var lst_conn = net.lst_conn;
        var rst_conn = net.rst_conn;
        var err_msg = net.err_msg;

        net.recv_msg = function(remote_id: Dynamic, msg: String): String {
            msg = recv_msg(remote_id, msg);
			rl.prompt();
            return msg;
        };
        net.new_conn = function(remote_id: Dynamic, topic: Dynamic) {
            new_conn(remote_id, topic);
			rl.prompt();
        };
        net.tim_conn = function(remote_id: Dynamic) {
            tim_conn(remote_id);
			rl.prompt();
        };
        net.lst_conn = function(remote_id: Dynamic) {
            lst_conn(remote_id);
			rl.prompt();
        };
        net.rst_conn = function(remote_id: Dynamic) {
            rst_conn(remote_id);
			rl.prompt();
        };
        net.err_msg = function(stage: String, remote_id: Dynamic, err: Dynamic) {
            if (stage == "connection") {
                err_msg(stage, remote_id, err);
                rl.prompt();
            }
        };
    }

    public function exit() {
        net.exit();
        Sys.exit(0);
    }

    public function start() {
        net.start();

		rl.setPrompt('Send message: ');
		rl.prompt();
		rl.on(InterfaceEvent.Line, function(msg: Dynamic) {
            net.send_all(msg);
			rl.prompt();
		}).on(InterfaceEvent.Close, function() {
            exit();
		});
    }

	public static function main() {
        var app = new Main();
        app.start();
    }
}