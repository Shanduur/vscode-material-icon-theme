import * as vscode from 'vscode';
import * as helpers from './../helpers';
import * as i18n from './../i18n';
import { folderIcons } from '../icons';

/** Command to toggle the folder icons. */
export const toggleFolderIcons = () => {
    return checkFolderIconsStatus()
        .then(showQuickPickItems)
        .then(handleQuickPickActions)
        .catch(err => console.log(err));
};

/** Show QuickPick items to select prefered configuration for the folder icons. */
const showQuickPickItems = (activeTheme: string) => {
    const options = folderIcons.map((theme): vscode.QuickPickItem => ({
        description: i18n.instant(`folders.${theme.name}.name`),
        detail: i18n.instant(`folders.${theme.name}.description`),
        label: theme.name === activeTheme ? '\u2714' : '\u25FB'
    }));

    return vscode.window.showQuickPick(options, {
        placeHolder: i18n.instant('folders.toggleIcons'),
        ignoreFocusOut: false
    });
};

/** Handle the actions from the QuickPick. */
const handleQuickPickActions = (value: vscode.QuickPickItem) => {
    if (!value || !value.description) return;
    return helpers.setThemeConfig('folders.icons', value.description.toLowerCase(), true);
};

/** Are the folder icons enabled? */
export const checkFolderIconsStatus = (): Promise<string> => {
    return helpers.getMaterialIconsJSON().then((config) => config.options.folderTheme);
};