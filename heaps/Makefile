BUILD_DIR = ./build/
BIN_DIR = ./bin/
RELEASE_DIR = ./release/

.PHONY: all compile compile-debug package clean hl-dx hl-dx-debug hl-sdl hl-sdl-debug js js-debug swf swf-debug

all: compile package

compile: $(BIN_DIR)hl-dx $(BIN_DIR)hl-sdl $(BIN_DIR)js $(BIN_DIR)swf

compile-debug: $(BIN_DIR)hl-dx-debug $(BIN_DIR)hl-sdl-debug $(BIN_DIR)js-debug $(BIN_DIR)swf-debug

package: hl-dx hl-sdl js swf

clean:
	@rm -rf $(BIN_DIR) $(RELEASE_DIR)

# hl-dx
$(BUILD_DIR)hl-dx.hxml: src/**
	@touch $@

$(BIN_DIR)hl-dx: $(BUILD_DIR)hl-dx.hxml
	@haxelib install $^ --always
	@haxe $^

hl-dx: $(BIN_DIR)hl-dx
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

# hl-dx-debug
$(BUILD_DIR)hl-dx-debug.hxml: src/**
	@touch $@

$(BIN_DIR)hl-dx-debug: $(BUILD_DIR)hl-dx-debug.hxml
	@haxelib install $^ --always
	@haxe $^

hl-dx-debug: $(BIN_DIR)hl-dx-debug
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

# hl-sdl
$(BUILD_DIR)hl-sdl.hxml: src/**
	@touch $@

$(BIN_DIR)hl-sdl: $(BUILD_DIR)hl-sdl.hxml
	@haxelib install $^ --always
	@haxe $^

hl-sdl: $(BIN_DIR)hl-sdl
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

# hl-sdl-debug
$(BUILD_DIR)hl-sdl-debug.hxml: src/**
	@touch $@

$(BIN_DIR)hl-sdl-debug: $(BUILD_DIR)hl-sdl-debug.hxml
	@haxelib install $^ --always
	@haxe $^

hl-sdl-debug: $(BIN_DIR)hl-sdl-debug
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

# js
$(BUILD_DIR)js.hxml: src/**
	@touch $@

$(BIN_DIR)js: $(BUILD_DIR)js.hxml
	@haxelib install $^ --always
	@haxe $^

js: $(BIN_DIR)js
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

# js-debug
$(BUILD_DIR)js-debug.hxml: src/**
	@touch $@

$(BIN_DIR)js-debug: $(BUILD_DIR)js-debug.hxml
	@haxelib install $^ --always
	@haxe $^

js-debug: $(BIN_DIR)js-debug
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

# swf
$(BUILD_DIR)swf.hxml: src/**
	@touch $@

$(BIN_DIR)swf: $(BUILD_DIR)swf.hxml
	@haxelib install $^ --always
	@haxe $^

swf: $(BIN_DIR)swf
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

# swf-debug
$(BUILD_DIR)swf-debug.hxml: src/**
	@touch $@

$(BIN_DIR)swf-debug: $(BUILD_DIR)swf-debug.hxml
	@haxelib install $^ --always
	@haxe $^

swf-debug: $(BIN_DIR)swf-debug
	@rm -rf release/$@
	@haxelib run redistHelper -linux -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml
