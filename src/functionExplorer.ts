import * as vscode from 'vscode';
import * as fs from 'fs';

export class FunctionsExplorerProvider implements vscode.TreeDataProvider<Command> {
    private _onDidChangeTreeData: vscode.EventEmitter<Command | undefined> = new vscode.EventEmitter<Command | undefined>();
    readonly onDidChangeTreeData: vscode.Event<Command | undefined> = this._onDidChangeTreeData.event;

    constructor() {

    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: Command): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Command): Thenable<Command[]> {
        return Promise.resolve(this.getCommandsFromJson(););
    }

    
    getCommandsFromJson(): Command[] {
        const commandsJson = JSON.parse(fs.readFileSync('e:\\temp\\commands.json', 'utf-8'));

        const toCommand = (command: any): Command => {
            return new Command(command.ModuleName + '\\' + command.Name, vscode.TreeItemCollapsibleState.None);       };
        const commands = commandsJson.map(toCommand);
        return commands;
    }


}

class Command extends vscode.TreeItem {
    constructor(public readonly label: string,
        //private module: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState) {
        super(label, collapsibleState);
    }
}