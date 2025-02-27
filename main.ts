import { PropertyRule, Rule, ruleFrom } from "lib/rules";
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
						new Notice(
							"There was an error while moving the file. Check the console for details.",
						);
						console.error(e);
					});
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ArchivistSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		const raw = Object.assign(
			{},
			defaultSettings(this.app),
			await this.loadData(),
		);

		const settings = new ArchivistSettings();

		raw.rules.forEach((r: Rule) => {
			if (r.__type == "property") {
				settings.addRule(
					new PropertyRule({ name: r.name, app: this.app }),
				);
			}
		});
		this.settings = settings;
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
