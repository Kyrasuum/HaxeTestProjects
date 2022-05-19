package ;

import js.Browser.*;
import coconut.ui.View;
import coconut.Ui.hxx;
using coconut.ui.Renderer;

/**
 * ...
 * @author Kyrasuum
 */
// App.hx

class Main extends View {
    static function main() {
        document.getElementById('demo').mount(<Main/>);
    }
  
    @:state var count:Int = 0;
  
    function render()
        '<div>
            <button onclick={() -> count++}>
                Click Here! (Clicked {count} times)
            </button>
            <Bar />
        </div>';
}

class Foo extends View {
    @:attribute var foo:Int;
    function render() '<div id="foo-$foo">foo-{foo}</div>';
}

class Bar extends View {
    function render() '<Foo foo={42} />';
}
