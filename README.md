# Component catalog

A browser over my private component collection: 2,204 items across 11 libraries,
filterable by library, tier and text.

**This repository holds metadata only.** Names, descriptions, counts and file
paths. No component source, no stylesheets from the libraries. The code lives in
a private repository, which is why the "Folder on GitHub" links 404 for anyone
but me.

Tiers say how a file came to exist:

- **A** the library published this file itself
- **B** recovered from a compiled module the library serves to the browser
- **C** someone rebuilt it from the outside

Regenerate `catalog.json` with `node build-catalog.mjs` from the private repo, then
copy the four static files here.
