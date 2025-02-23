import { App } from "obsidian";
import { Property } from "./property";

type Rule = Property;

// NOTE(franciscoj): [On 23/02/2025] I'm not sure I like this. I'm thinking
// about splitting rules into 2-3 objects:
//
// - A DTO to serialize/deserialize the config
// - A Matcher object
// - An Archiver object
function ruleFrom(r: Rule, app: App): Rule {
	if (r.__type == "property") {
		return new Property({ name: r.name, app });
	}

	return r;
}

export type { Rule };
export { Property as PropertyRule, ruleFrom };
