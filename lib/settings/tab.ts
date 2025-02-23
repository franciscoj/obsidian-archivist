import type { Rule } from "lib/rules";
import { App, Plugin, PluginSettingTab } from "obsidian";
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
		containerEl.createEl("h2", { text: "Archivist" });
		const renderer = new Renderer(this.plugin);

		this.plugin.settings.rules.forEach(
			(p: Rule, idx: number, ary: Rule[]) => {
				renderer.render(p, containerEl);
			},
		);
	}
}

export { Tab };
