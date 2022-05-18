package;

import coroutine.Routine;
import coroutine.CoroutineRunner;

/**
 * ...
 * @author Kyrasuum
**/

function count(timer: haxe.Timer) {
    var i = 0;
    while(true){
        trace(i++);
        if (i > 10) break;
        @yield return WaitNextFrame;
    }
    timer.stop();
}

function delay(processor: CoroutineProcessor, i: Int, f) {
    var timer = new haxe.Timer(i);
    timer.run = function() {
        processor.updateEnterFrame();
        processor.updateTimer(haxe.Timer.stamp());
        processor.updateExitFrame();
        timer.stop();
    };
    @yield return WaitNextFrame;
    f();
}

function main() {
    // Start a coroutine for counter every 10 ms
    trace("Start count timer");
    var runner1 = new CoroutineRunner();
    var timer = new haxe.Timer(100);
    timer.run = function() {
        var processor = CoroutineProcessor.of(runner1);
        processor.updateEnterFrame();
        processor.updateTimer(haxe.Timer.stamp());
        processor.updateExitFrame();
    };
    runner1.startCoroutine( count(timer) );

    // Start a coroutine for delayed end print
    var runner2 = new CoroutineRunner();
    runner2.startCoroutine( delay(CoroutineProcessor.of(runner2), 1101, function () {
        trace("End of count timer");
    }) );
}