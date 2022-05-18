BUILD_DIR = ./build/

.PHONY: prereq all compile compile-debug package clean hl-dx hl-dx-debug hl-sdl hl-sdl-debug js js-debug swf swf-debug

all: compile package

compile: $(BUILD_DIR)hl-dx $(BUILD_DIR)hl-sdl $(BUILD_DIR)js $(BUILD_DIR)swf

compile-debug: $(BUILD_DIR)hl-dx-debug $(BUILD_DIR)hl-sdl-debug $(BUILD_DIR)js-debug $(BUILD_DIR)swf-debug

package: hl-dx hl-sdl js swf

clean:
	@rm -rf bin

$(BUILD_DIR)hl-dx:
	@haxe $@.hxml

hl-dx: $(BUILD_DIR)hl-dx
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

$(BUILD_DIR)hl-dx-debug:
	@haxe $@.hxml

hl-dx-debug: $(BUILD_DIR)hl-dx-debug
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

$(BUILD_DIR)hl-sdl:
	@haxe $@.hxml

hl-sdl: $(BUILD_DIR)hl-sdl
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml
	@mkdir release/hl-sdl/opengl_lin
	@cp lib/hl release/hl-sdl/opengl_lin/
	@cp bin/client-sdl.hl release/hl-sdl/opengl_lin/
	@zip -r release/hl-sdl/opengl_lin.zip release/hl-sdl/opengl_lin/

$(BUILD_DIR)hl-sdl-debug:
	@haxe $@.hxml

hl-sdl-debug: $(BUILD_DIR)hl-sdl-debug
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

$(BUILD_DIR)js:
	@haxe $@.hxml

js: $(BUILD_DIR)js
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

$(BUILD_DIR)js-debug:
	@haxe $@.hxml

js-debug: $(BUILD_DIR)js-debug
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

$(BUILD_DIR)swf:
	@haxe $@.hxml

swf: $(BUILD_DIR)swf
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml

$(BUILD_DIR)swf-debug:
	@haxe $@.hxml

swf-debug: $(BUILD_DIR)swf-debug
	@rm -rf release/$@
	@haxelib run redistHelper -hl32 -zip -pak -o release/$@ -p $@ $(BUILD_DIR)$@.hxml
