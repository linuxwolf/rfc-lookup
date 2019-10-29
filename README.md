# IETF RFC Lookup #

A WebExtension to help with opening IETF RFCs, BCPs, STDs, and Internet-Drafts.

This WebExtension is designed for [**Firefox**](https://firefox.com) version 52 or higher.

## For Developers

This section is for anyone enhancing the WebExtension.

### Prerequisites

The following must be installed in order to build this WebExtension:

* **[node](https://nodejs.org)** version _12.0 or higher_
* **[NPM](https://npmjs.com)** version _6.11 or higher_ (usually bundled with node)

### Preparing

Before building, install the `node` dependencies:

```bash
npm install
```

### Building

To build an _**unsigned** add-on package (via `web-ext build`):

```bash
npm run build
```

The package is located in the `dist` directory, with the display name and version of this WebExtension (e.g., `ietf_rfc_lookup-0.1.0.zip`).

To compile the sources without creating an add-onp package:

```bash
npm run compile
```

The compiled WebExtension (including `manifest.json`) is located in the `dist/app` directory.

### Debug Installation

This WebExtension can be installed for debugging ("Install Temporary Add-On" from the Firefox Devtools page) from the `dist/app` directory.  Be sure to compile first!

### Cleaning up

To clean the built output files:

```bash
npm run clean
```

To fully clean the working copy:

```bash
npm run distclean
```
