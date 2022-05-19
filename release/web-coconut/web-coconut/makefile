BUILD_DIR = ./build/
BIN_DIR = ./bin/
RELEASE_DIR = ./release/

.PHONY: all compile package clean

all: compile

compile: $(BIN_DIR)web.js

clean:
	@rm -rf $(BIN_DIR) $(RELEASE_DIR)

# linux
$(BUILD_DIR)js.hxml: src/**
	@touch $@

$(BIN_DIR)web.js: $(BUILD_DIR)js.hxml
	@haxe $^
	@mkdir -p $(RELEASE_DIR)
	@cp $(BIN_DIR)* $(RELEASE_DIR)
	@cp src/index.html $(RELEASE_DIR)
