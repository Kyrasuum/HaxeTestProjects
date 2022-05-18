BUILD_DIR = ./build/
BIN_DIR = ./bin/
RELEASE_DIR = ./release/

.PHONY: all compile package clean hl

all: compile package

compile: $(BIN_DIR)hl

package: hl

clean:
	@rm -rf $(BIN_DIR) $(RELEASE_DIR)

$(BUILD_DIR)hl.hxml: src/**
	@touch $@

$(BIN_DIR)hl: $(BUILD_DIR)hl.hxml
	@haxelib install $^ --always
	@haxe $^

hl: $(BIN_DIR)hl
	@haxelib run redistHelper -linux -zip -pak -o $(RELEASE_DIR) -p $@ $(BUILD_DIR)$@.hxml
