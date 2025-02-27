import { PropertyRule, type Rule } from "lib/rules";
import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { ArchivistSettings } from ".";
import { Renderer } from "./renderer";

interface Archivist {
	saveSettings(): Promise<void>;
	settings: ArchivistSettings;
}

class Tab extends PluginSettingTab {
	plugin: Archivist & Plugin;

	constructor(app: App, plugin: Archivist & Plugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();
		containerEl.createEl("h2", { text: "Archivist Rules" });

		new Setting(containerEl)
			.setName("Add a new rule")
			.setDesc(
				"You can add, remove, or reorder rules as you need them. Select the type of rule and click the (+) button.",
			)
			.addDropdown((dropdown) => {
				dropdown
					.addOption("property", "Folder from property")
					.addOption("tags", "Match folder by tag");
			})
			.addExtraButton((btn) => {
				btn.setIcon("circle-plus")
					.setTooltip("Add a new rule of this type")
					.onClick(() => {
						this.plugin.settings.addRule(
							new PropertyRule({
								name: "archive_to",
								app: this.plugin.app,
							}),
						);

						this.display();
					});
			});

		const renderer = new Renderer(this.plugin);

		this.plugin.settings.rules.forEach((p: Rule) =>
			renderer.render(p, containerEl),
		);
	}
}

export { Tab };
