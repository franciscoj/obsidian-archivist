import type { Rule } from "lib/rules";

class Settings {
	rules: Rule[];

	constructor() {
		this.rules = [];
	}

	addRule(r: Rule) {
		this.rules.push(r);
	}
}

export { Settings };
