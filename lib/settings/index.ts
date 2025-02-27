import { Tab } from "./tab";
import { PropertyRule } from "lib/rules";
import { App } from "obsidian";
import { Settings } from "./model";

const defaultSettings = function (app: App): Settings {
	const settings = new Settings();
	settings.addRule(new PropertyRule({ name: "archive_to", app }));

	return settings;
};

export {
	defaultSettings,
	Tab as ArchivistSettingTab,
	Settings as ArchivistSettings,
};
