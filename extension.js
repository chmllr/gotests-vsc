'use strict';

let vscode = require('vscode');
let cp = require('child_process');

function activate(context) {

    console.log('gotests-vsc started');
    
    let disposable = vscode.commands.registerCommand('extension.goTestsAll', function () {
        let fileName = vscode.window.activeTextEditor.document.fileName;
        let cmd = 'gotests';
        let args = ['-all', '-w', fileName];
        let result = cp.execFileSync(cmd, args);
        vscode.window.showInformationMessage("Unit tests added successfully!");
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;