# foldit README
Foldit provides a command to fold all ```it``` methods of your specs. It's designed with Javascripts Mocha/Jasmine framework in mind, but there's no reason it won't work on other languages and frameworks.

## Usage
In a spec file, open the command pallet (Ctrl+Shirt+P) and type "Fold spec methods". 

You can configure a keybind for it by adding to keybindings.json the following:
```
{
    "key": "ctrl+k ctrl+i",
    "command": "foldit.fold",
    "when": "editorTexstFocus"
}
```

## Extension Settings
This extension contributes the following settings:

* `foldIt.specMethodName`: replace 'it' with a different method name to fold


## Release Notes

### 1.0.0 Initial release
