import Archivist from "main";
import { TFile } from "obsidian";

const archive = async function (plugin: Archivist, file: TFile): Promise<void> {
	const destinationPath = await getDestinationPath(plugin, file);
	if (destinationPath === "") {
		return;
	}

	const archiveTo = `${destinationPath}/${file.name}`;

	await ensureFolder(plugin, destinationPath);
	await archiveFile(plugin, file, archiveTo);
};

const ensureFolder = async function (
	plugin: Archivist,
	path: string,
): Promise<void> {
	const folder = plugin.app.vault.getFolderByPath(path);
	if (!folder) {
		await plugin.app.vault.createFolder(path);
	}
};

const archiveFile = async function (
	plugin: Archivist,
	file: TFile,
	archiveTo: string,
) {
	await plugin.app.fileManager.renameFile(file, archiveTo);
	console.log("Archivist", "new file name", archiveTo);
};

const getDestinationPath = async function (
	plugin: Archivist,
	file: TFile,
): Promise<string> {
	let destinationPath = "";

	await plugin.app.fileManager.processFrontMatter(
		file,
		(frontmatter: { [key: string]: unknown }) => {
			const destinationPathProp = plugin.settings.archiveTo;
			destinationPath = frontmatter[destinationPathProp] as string;
		},
	);

	return destinationPath;
};

export { archive };
