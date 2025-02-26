import { ruleFrom } from "lib/rules";
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

		this.addCommand({
			id: "archivist-arhive-note",
			name: "Archive note",
			checkCallback: (checking: boolean) => {
				const file = this.app.workspace.getActiveFile();
				if (!file) return;

				const rule = this.settings.rules.find((r) => {
					const rule = ruleFrom(r, this.app);
					return rule.matches(file);
				});

				if (checking) return !!rule;
				if (!rule) return;

				rule.archive(file)
					.then((newPath) => {
						new Notice(`Archived ${file.name} to ${newPath}.`);
					})
					.catch((e) => {
						console.error(e);
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
