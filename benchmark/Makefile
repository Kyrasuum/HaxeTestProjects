all:
	@haxe build.hxml > /dev/null
	@gcc -O3 -o mainhl -I hl hl/main.c -lhl -L /usr/local/lib/ > /dev/null
	@time haxe interp.hxml
	@time java -jar main.jar
	@time python main.py
	@time cpp/Main
	@time ./mainhl
	@time lua main.lua
