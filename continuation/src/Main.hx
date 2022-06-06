package;

import com.dongxiguo.continuation.Continuation;

/**
 * ...
 * @author Kyrasuum
**/
@:build(com.dongxiguo.continuation.Continuation.cpsByMeta(":async"))
class Main {
    function new() {
        trace("Async start");
        test(function(){
            trace("Async done");
        });
    }

    @:async private function test() {
        for (i in 0...10) {
            @await delay(100);
            trace("Run " + i + " times.");
        }

        @fork(i in 0...10) {
            trace("Fork " + i + " start");
            @await delay(1000);
            trace("Fork " + i + " done");
        }
    }

    private function delay(time: Int, handler: Void->Void) {
        haxe.Timer.delay(handler, time);
    }
    
    static function main() {
        new Main();
    }
}
