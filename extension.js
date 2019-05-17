const vscode = require('vscode');

const METHODS_TO_FOLD_CONFIG_NAME = 'methodsToFold';

function activate(context) {
  const disposable = vscode.commands.registerCommand('foldit.fold', foldCommand);
  context.subscriptions.push(disposable);
}

async function foldCommand() {
  const methodsToFold = vscode.workspace
    .getConfiguration('foldIt')
    .get(METHODS_TO_FOLD_CONFIG_NAME);

  const editor = vscode.window.activeTextEditor;
  const { document } = editor;

  const linesToFold = findLineNumbersOfMethods(document, methodsToFold);

  await foldLines(editor, linesToFold);
}

function findLineNumbersOfMethods(document, methodsNames) {
  return methodsNames
    .map(methodName => findLineNumbersOfMethod(document, methodName))
    .reduce((out, cur) => [...out, ...cur], []);
}

function findLineNumbersOfMethod(doc, methodName) {
  const text = doc.getText();
  const methodNameRegEx = new RegExp(`${methodName}\\s*\\(`);

  return text
    .split(/\r?\n/)
    .map((line, i) => [line, i])
    .filter(([line]) => methodNameRegEx.test(line))
    .map(([_line, i]) => i);
}

async function foldLines(editor, linesToFold) {
  const initialPosition = editor.selection.active.line;
  moveCursorTo(editor, linesToFold);
  await vscode.commands.executeCommand('editor.fold');
  moveCursorTo(editor, [initialPosition]);
}

function moveCursorTo(editor, lineNumbers) {
  const position = editor.selection.active;

  const newSelections = lineNumbers.map((lineNumber) => {
    const newPosition = position.with(lineNumber, 0);
    return new vscode.Selection(newPosition, newPosition);
  });

  // eslint-disable-next-line no-param-reassign
  editor.selections = newSelections;
}

function deactivate() {}

module.exports = { activate, deactivate };
