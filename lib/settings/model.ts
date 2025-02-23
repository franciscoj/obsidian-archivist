import type { Rule } from "lib/rules";

// NOTE(franciscoj): [On 23/02/2025] this looks pretty overengineered like
// this. I kept it from a previous version where I had different types of rules
// and my next step is to implement more, so I'm keeping it, but if after a
// couple of weeks it is still here and not used, remember to remove it!!
interface Settings {
	rules: Rule[];
}

export type { Settings };
