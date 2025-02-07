# Connectivity Planning Toolkit (CPP) Documentation

Welcome to the `CPP` documentation repository. This repository houses comprehensive resources, guides, and tutorials for users and developers looking to harness the power of the toolkit in their projects.

## Quick Links

The full documentation is hosted using the GitHub Pages framework, and built using the `mkdocs` package.

- Documentation Website: https://FNS-Division.github.io/cpp-user-guide/
- GitHub Pages: [Learn more](https://pages.github.com/)
- MkDocs Framework: [User Guide](https://www.mkdocs.org/user-guide/)

## Getting Started

To get started with the documentation:

1. Visit our documentation website for the most up-to-date information.
2. Explore the `docs/` directory in this repository for markdown source files.
3. Check out the `mkdocs.yml` file to understand the structure of our documentation.

## Contributing

We welcome contributions from the community. Below are the guidelines for contributing to the documentation.

### Prerequisites

- Install MkDocs:

```sh
pip install mkdocs
```

### Editing a Page

1. Clone the repository and switch to the `main` branch:

```sh
git clone git@github.com:FNS-Division/cpp-user-guide.git
cd cpt-user-guide
git checkout main
```

2. Edit your markdown document (with file extension `.md`) containing documentation in `docs/`, and save your changes. For example, rename one of the titles in `doc/about.md`.

3. After editing your markdown document, build the site locally using this command, to preview your changes.

```sh
mkdocs build
```

This will automatically build the static website inside the repository folder `site/`. Do not edit the files in `site/` directly.

4. In order to deploy those changes live on the documentation website, use the following command.

```sh
mkdocs gh-deploy
```

This command pushes the changes to another branch called `gh-pages`, which only contains the content of the updated `/site` folder. You do not need to switch to branch `gh-pages` before running this command. The changes should now be live on the documentation [website](https://FNS-Division.github.io/cpt-user-guide/). They may take a few minutes to appear.


### Adding a New Page

If you would like to add a new page to the documentation website, for example relating to a new model, follow the steps below.

1. Create a new markdown document inside the `docs/` folder. For example, create a file called `docs/newmodel.md`.
2. In order for the new page to be indexed in the documentation website, also update the `mkdocs.yml` file.

```python
site_name: cpp-user-guide
nav:
  - Home: index.md
  - About: about.md
  - New model: newmodel.md ### ADDED LINE ###
theme: readthedocs
```

3. Follow step 4 from above to re-deploy the page containing the edits.

### Editing Draw.io Diagrams

- The documentation pages include editable diagrams, created using draw.io.
- Each diagram is hosted inside this repository, in the `docs/diagrams` folder.
- In order to display a diagram inside one of the pages, use the following markdown syntax.

```python
![my-diagram](diagrams/my-diagram.svg)
```

The diagrams are stored in SVG (Scalable Vector Graphics) format, which are editable.

**Top tip**: If you are using the VS Code editor, extensions such as [draw.io integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) allow for editing these diagrams from within your code editor.

### Need Help?

If you have any questions or need assistance, please open an issue in this repository or contact the maintainers directly.
Thank you for contributing to the Giga-Inframapkit documentation!