'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FunctionsExplorerProvider } from './functionExplorer';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log("ERMAHGERD: We loaded!");
    const functionsProvider = new FunctionsExplorerProvider();
    vscode.window.registerTreeDataProvider('functions', functionsProvider);
    vscode.commands.registerCommand('getCommandsFromJson', () => functionsProvider.getCommandsFromJson());
}
