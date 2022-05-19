package;

import p2p.P2P;

import js.Node.*;
import js.node.*;

/**
 * ...
 * @author Kyrasuum
 */
var net: P2P;
class Main {
	public static function main() {
        net = new P2P();
    }
}
var exp = js.Syntax.code("module.exports = {0}", net);
