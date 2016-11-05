'use strict';

let vscode = require('vscode');
let cp = require('child_process');

function activate(context) {

    context.subscriptions.push(vscode.commands.registerCommand('extension.goTestsAll', generateCommand('-all')));
    context.subscriptions.push(vscode.commands.registerCommand('extension.goTestsExported', generateCommand('-exported')));
    
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;

function generateCommand (param) {
    return function () {
        let fileName = vscode.window.activeTextEditor.document.fileName;
        let cmd = 'gotests';
        let args = [param, '-w', fileName];
        let result = cp.execFileSync(cmd, args);
        vscode.window.showInformationMessage(cmd + ' ' + args.join(" ") + ' executed successfully!');
    }
}