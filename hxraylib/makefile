BUILD_DIR = ./build/
BIN_DIR = ./bin/
RELEASE_DIR = ./release/

.PHONY: all compile package clean linux mac windows

all: compile

compile: $(BIN_DIR)linux $(BIN_DIR)mac $(BIN_DIR)windows

clean:
	@rm -rf $(BIN_DIR) $(RELEASE_DIR)

# linux
$(BUILD_DIR)linux.hxml: src/**
	@touch $@

$(BIN_DIR)linux: $(BUILD_DIR)linux.hxml
	@haxelib install $^ --always
	@haxe $^

linux: $(BIN_DIR)linux
	@mkdir -p release/Linux
	@cp bin/linux/Main* release/Linux/

# mac
$(BUILD_DIR)mac.hxml: src/**
	@touch $@

$(BIN_DIR)mac: $(BUILD_DIR)mac.hxml
	@haxelib install $^ --always
	@haxe $^

mac: $(BIN_DIR)mac
	@mkdir -p release/macOs
	@cp bin/mac/Main* release/macOs/
	
# windows
$(BUILD_DIR)windows.hxml: src/**
	@touch $@

$(BIN_DIR)windows: $(BUILD_DIR)windows.hxml
	@haxelib install $^ --always
	@haxe $^

windows: $(BIN_DIR)windows
	@mkdir -p release/Windows
	@cp bin/windows/Main* release/Windows/
