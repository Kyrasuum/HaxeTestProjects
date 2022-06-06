package;

/**
 * ...
 * @author Kyrasuum
**/
class Main {
    static final modRoot = 'mods';
    var mods: Array<String>;
    var parser = new hscript.Parser();
    var interp = new hscript.Interp();

    function new() {
        mods = list(modRoot);
        interp.variables.set("test", test);
        refresh();
        trace(mods);
    }

    public function test() {
        trace("test");
    }

    private function refresh() {
        for (mod in mods) {
            var files = list(mod);
            var scripts = [];

            for (file in files) {
                if (file.indexOf(".hx") > 0) {
                    scripts.push(file);
                }
            }

            for (script in scripts) {
                var content = contents(script);
                var program = parser.parseString(content);
                interp.execute(program);
            }
        }
    }

    private function contents(str: String): String {
        var loader = hxd.Res.loader;
        var root = loader.fs.getRoot();
        try {
            var file = root.get(str);
            return file.getText();
        }
        return "";
    }

	private function list(str: String): Array<String> {
        var loader = hxd.Res.loader;
        var root = loader.fs.getRoot();
        try {
            var path = root.get(str);
            var files = [];
            for (asset in path) {
                files.push(asset.path);
            };
            return files;
        }
        return [];
    }


    static function main() {
		hxd.Res.initLocal();
        new Main();
    }
}
