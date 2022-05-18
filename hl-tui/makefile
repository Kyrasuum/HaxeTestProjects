BUILD_DIR = ./build/
BIN_DIR = ./bin/
RELEASE_DIR = ./release/

.PHONY: prereq all compile package clean hl

all: compile package

compile: $(BIN_DIR)hl

package: hl

clean:
	@rm -rf $(BIN_DIR) $(RELEASE_DIR)

prereq:
	@haxelib install default.hxml
	@haxelib install redistHelper

$(BUILD_DIR)hl: src/**
	@true

$(BIN_DIR)hl: $(BUILD_DIR)hl
	@haxe $^.hxml

hl: $(BIN_DIR)hl
	@haxelib run redistHelper -linux -zip -pak -o $(RELEASE_DIR) -p $@ $(BUILD_DIR)$@.hxml
