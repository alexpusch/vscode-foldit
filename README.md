# Foldit

Foldit provides a command to fold all ```it```, and other spec definition methods. It's designed with Javascripts Mocha/Jasmine framework in mind, but there's no reason it won't work on other languages and frameworks. By default the following methods will be folded: ```it```, ```before```, ```beforeEach```, ```after```, ```afterEach```

## Usage
In a spec file, open the command pallet (Ctrl+Shirt+P) and type "Fold spec methods". 

You can configure a keybind for it by adding to keybindings.json the following:
```
{
    "key": "ctrl+k ctrl+i",
    "command": "foldit.fold",
    "when": "editorTextFocus"
}
```

## Extension Settings
This extension contributes the following settings:

* `foldIt.methodsToFold`: specifies which methods will be folded


## Release Notes

### 1.0.0 Initial release
