import type { Rule } from "lib/rules";
import { PropertyRule } from "lib/rules";
import { Setting } from "obsidian";
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

	renderProperty(property: PropertyRule, el: HTMLElement): void {
		new Setting(el)
			.setName("Folder From Property")
			.setDesc(
				"Archivist will look for the name of a folder in this property and will move the note there to archive it.",
			)
			.addText((field) => {
				field
					.setValue(property.name)
					.setPlaceholder("archive_to")
					.onChange((value) => {
						property.name = value;
						this.plugin.saveSettings();
					});
			})
			.addExtraButton((btn) => {
				btn.setIcon("circle-x")
					.setTooltip("Remove this rule")
					.onClick(() => {
						console.info(
							"Archivist",
							"settings",
							"removing",
							property,
						);
					});
			});
	}
}

export { Renderer };
