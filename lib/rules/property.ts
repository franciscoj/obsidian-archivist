import { App, TFile } from "obsidian";
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

	async matches(f: TFile): Promise<boolean> {
		const prop = await this.getProp(f);

		return prop !== "";
	}

	async archive(f: TFile): Promise<string> {
		const path = await this.getProp(f);
		const archiveTo = `${path}/${f.name}`;

		await this.ensureFolder(path);
		await this.app.fileManager.renameFile(f, archiveTo);
		console.debug("Archivist: ", "moved", f.path, archiveTo);

		return archiveTo;
	}

	private async getProp(f: TFile): Promise<string> {
		let prop = "";

		await this.app.fileManager.processFrontMatter(f, (frontmatter) => {
			prop = frontmatter[this.name] || "";
		});

		return prop;
	}

	private async ensureFolder(path: string): Promise<void> {
		const folder = this.app.vault.getFolderByPath(path);

		if (!folder) {
			await this.app.vault.createFolder(path);
		}
	}
}

export { Property };
