// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const specMethodName = vscode.workspace
    .getConfiguration('foldIt')
    .get('specMethodName');

  var disposable = vscode.commands.registerCommand('foldit.fold', () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;
    const itLines = findIts(editor.document, specMethodName);

    itLines.forEach(lineNum => {
      moveCursorTo(editor, lineNum);
      vscode.commands.executeCommand('editor.fold');
    });
  });

  context.subscriptions.push(disposable);
}

function findIts(doc, specMethodName) {
  const text = doc.getText();
  const itRegEx = new RegExp(`${specMethodName}\\s*\\(`);

  return text
    .split(/\r?\n/)
    .map((line, i) => [line, i])
    .filter(([line, i]) => itRegEx.test(line))
    .map(([line, i]) => i);
}

function moveCursorTo(editor, lineNum) {
  const position = editor.selection.active;

  var newPosition = position.with(lineNum, 0);
  var newSelection = new vscode.Selection(newPosition, newPosition);
  editor.selection = newSelection;
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = { activate, deactivate };
