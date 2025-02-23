# Obsidian Archivist

Archivist is a plugin to automate ordering your notes and archiving them.

It is written to scratch my own itch while adopting the PARA method and trying
to find an easy way to archive my journals after I've reviewed and processed
them (I use separated ones for personal life and work).

**BE WARNED!!**: This is ALPHA quality software! Use it at your own risk!

For now this can't be installed from obsidian. You'll need to build it and then
copy both the manifest and the build `main.js` files to your vault under the
`.obsidian/plugins/archivist` folder or equivalent.

I advise you not to do that until the plugin reaches a more stable state.

## Realistic Roadmap

- New types of rules
  - Based on a list of tags (if any of them matches, move to the desired
  	folder)
  - Based on `property: value` pairs (if the property matches, move to the
  	desired folder).
- `ArchivedFrom` field that keeps information from where the note was before
  being archived, eventually allowing to "unarchive" it.

## "I'd like to try implementing it" Roadmap

- Regex/templated rules (if the regex matches, move the note to a folder whose
  template can be build from the regex captures)
- More complex `property: value` matches (`includes`, `not`).
- Custom rules (i.e. Use this JavaScript function to decide where to archive).
