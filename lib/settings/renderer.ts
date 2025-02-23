import { Setting } from "obsidian";
import { PropertyRule } from "lib/rules";
import type { Rule } from "lib/rules";
import { Settings } from "./model";

interface Plugin {
	saveSettings(): Promise<void>;
	settings: Settings;
}

class Renderer {
	plugin: Plugin;

	constructor(plugin: Plugin) {
		this.plugin = plugin;
	}

	render(r: Rule, el: HTMLElement): void {
		if (r.__type == "property") {
			this.renderProperty(r, el);
		} else {
			throw "Unknown rule";
		}
	}

	renderProperty(p: PropertyRule, el: HTMLElement): void {
		new Setting(el)
			.setName("Archive Property")
			.setDesc(
				"The name of the property where Archivist will move this note.",
			)
			.addText((txt) => {
				txt.setValue(p.name)
					.setPlaceholder("archive_to")
					.onChange((value) => {
						p.name = value;
						this.plugin.saveSettings();
					});
			});
	}
}

export { Renderer };
