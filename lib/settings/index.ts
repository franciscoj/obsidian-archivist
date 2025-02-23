import { Tab } from "./tab";
import { PropertyRule } from "lib/rules";
import { App } from "obsidian";
import { Settings } from "./model";

const defaultSettings = function (app: App): Settings {
	return {
		rules: [new PropertyRule({ name: "archive_to", app })],
	};
};

export { defaultSettings, Tab as ArchivistSettingTab };
export type { Settings as ArchivistSettings };
