BIN_DIR = ./bin

.PHONY: all compile package clean deps

all: compile

compile: $(BIN_DIR)/html5 $(BIN_DIR)/hl $(BIN_DIR)/linux $(BIN_DIR)/windows

clean:
	@rm -rf $(BIN_DIR)

deps:
	@haxelib install feathersui
	@haxelib run openfl setup

# web
$(BIN_DIR)/html5: deps src/**
	@openfl build html5

# hashlink
$(BIN_DIR)/hl: deps src/**
	@openfl build hl

# linux
$(BIN_DIR)/linux: deps src/**
	@openfl build linux

# windows
$(BIN_DIR)/windows: deps src/**
	@openfl build windows