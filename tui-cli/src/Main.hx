package;

import captain.Command;
import haxe.ds.Option;

/**
 * ...
 * @author Kyrasuum
**/
class Main {
    function new() {
    }

    static public function main() {
        final command = new Command(Sys.args());

        command.arguments = [
            {
                name: "firstname",
                description: "Your first name.",
            },
        ];
        command.options = [
            {
                name: "leaving",
                shortName: "l",
                boolean: true,
                description: "Switch to leaving message",
            },
            {
                name: "help",
                shortName: "h",
                boolean: true,
                description: "Display this help text",
            },
        ];

        final name = switch (command.getArgument("firstname")) {
            case Some(value): value;
            case None: "N/A";
        }

        final leaving = switch (command.getOption("leaving")) {
            case Some(value): true;
            case None: false;
        }

        final help = switch (command.getOption("help")) {
            case Some(value): true;
            case None: false;
        };

        if (help) {
            trace(command.getInstructions());
        } else {
            if (leaving) {
                trace("Goodbye " + name);
            } else {
                trace("Hello " + name);
            }
        }
    
        new Main();
    }
}
