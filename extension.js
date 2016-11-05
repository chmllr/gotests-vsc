'use strict';

let vscode = require('vscode');
let cp = require('child_process');

function activate(context) {

    context.subscriptions.push(vscode.commands.registerCommand('extension.goTestsAll', generateCommand(['-all'])));
    context.subscriptions.push(vscode.commands.registerCommand('extension.goTestsExported', generateCommand(['-exported'])));
    context.subscriptions.push(vscode.commands.registerCommand('extension.goTestsOnly', function () {
        let editor = vscode.window.activeTextEditor;
        let selectedText = editor.document.getText(editor.selection);
        let regexp = /func\s+(.+)\s*\(/g;
        let groups = regexp.exec(selectedText);
        if (groups == null || groups.length < 2) {
            vscode.window.showWarningMessage("Couldn't find any function names in the selection");
        } else {
            generateCommand(['-only', groups[1]])();
        }
    }));

}
exports.activate = activate;

function deactivate() { }
exports.deactivate = deactivate;

function generateCommand(params) {
    return function () {
        let fileName = vscode.window.activeTextEditor.document.fileName;
        let cmd = 'gotests';
        let args = params.concat(['-w', fileName]);
        let result = cp.execFileSync(cmd, args);
        vscode.window.showInformationMessage(cmd + ' ' + args.join(" ") + ': ' + result);
    }
}