import { App, parseFrontMatterEntry, TFile } from "obsidian";
import type { RuleProps } from "./rule";

class Property {
	constructor({ name, app }: { name: string } & RuleProps) {
		this.__type = "property";
		this.name = name;
		this.app = app;
	}

	__type: "property";
	name: string;
	app: App;

	matches(f: TFile): boolean {
		const prop = this.getProp(f);

		return prop !== "";
	}

	async archive(f: TFile): Promise<string> {
		const path = this.getProp(f);
		const archiveTo = `${path}/${f.name}`;

		await this.ensureFolder(path);
		await this.app.fileManager.renameFile(f, archiveTo);

		return archiveTo;
	}

	private getProp(f: TFile): string {
		const metadata = this.app.metadataCache.getCache(f.path);
		const frontmatter = metadata?.frontmatter;
		if (!frontmatter) return "";

		return parseFrontMatterEntry(frontmatter, this.name) || "";
	}

	private async ensureFolder(path: string): Promise<void> {
		const folder = this.app.vault.getFolderByPath(path);

		if (!folder) {
			await this.app.vault.createFolder(path);
		}
	}
}

export { Property };
