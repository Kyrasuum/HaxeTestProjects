package;

/**
 * ...
 * @author Kyrasuum
 */

var net = js.Syntax.code("require('net.js');");

        //net.start();
        //net.exit();
        //net.send_all(msg);

        //net.topic_str = "TestWorld";

        //var recv_msg = net.recv_msg;
        //var new_conn = net.new_conn;
        //var tim_conn = net.tim_conn;
        //var lst_conn = net.lst_conn;
        //var rst_conn = net.rst_conn;
        //var err_msg = net.err_msg;

        //net.recv_msg = function(remote_id: Dynamic, msg: String): String {
        //    return msg;
        //};
        //net.new_conn = function(remote_id: Dynamic, topic: Dynamic) {
        //};
        //net.tim_conn = function(remote_id: Dynamic) {
        //};
        //net.lst_conn = function(remote_id: Dynamic) {
        //};
        //net.rst_conn = function(remote_id: Dynamic) {
        //};
        //net.err_msg = function(stage: String, remote_id: Dynamic, err: Dynamic) {
        //    if (stage == "connection") {
        //    }
        //};


class Main extends hxd.App {
    override function init() {
        var tf = new h2d.Text(hxd.res.DefaultFont.get(), s2d);
        tf.text = "Hello World !";
    }

	static function main() {
        var app = new Main();
    }
}
