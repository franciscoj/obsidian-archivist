import { Rule, ruleFrom } from "lib/rules";
import {
	ArchivistSettingTab,
	ArchivistSettings,
	defaultSettings,
} from "lib/settings";
import { Notice, Plugin } from "obsidian";

export default class Archivist extends Plugin {
	settings: ArchivistSettings;

	async onload() {
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Archivist: loaded");

		this.addCommand({
			id: "archivist-arhive-note",
			name: "Archive note",
			checkCallback: (checking: boolean) => {
				const file = this.app.workspace.getActiveFile();

				// This command can only run when there's an active file.
				if (checking) return !!file;
				if (!file) return;

				this.settings.rules.every(async (r: Rule) => {
					const rule = ruleFrom(r, this.app);
					let archived: boolean = false;

					rule.matches(file).then((matches) => {
						if (matches) {
							archived = true;
							rule.archive(file)
								.then((newPath) => {
									new Notice(
										`Archived ${file.name} to ${newPath}.`,
									);
								})
								.catch((e) => {
									console.error(e);
								});
						}
					});

					// Returning `false` will exit from the `every` loop.
					return !archived;
				});
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ArchivistSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			defaultSettings(this.app),
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
