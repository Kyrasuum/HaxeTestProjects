package;

/**
 * ...
 * @author Kyrasuum
 */
class Main {
    static public function main() {
        var size = 10000;
        var data: Array<Array<Int>> = [for (i in 0...size) [for (j in 0...size) cast Math.random()]];

        var total = 0;

        for (row in data){
            var subtotal = 0;
            for (elem in row){
                subtotal += elem;
            }
            switch (data.indexOf(row) % 4){
                case 0:
                    total += subtotal;
                case 1:
                    total -= subtotal;
                case 2:
                    total *= subtotal;
                case 3:
                    total = cast total / subtotal;
            }
        }
    }
}
