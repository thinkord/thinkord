# Contribution guideline
These guides are intended for people working on Thinkord project.

- Code of Conduct
- [Pull Requests](pull-requests.md)
- Issues
- Documentation Styleguide
- Source Code Directory Structure
- [Coding Style](coding-style.md)
- Testing

## Branch naming guidelines

Common prefixes:

  - feature: Any code changes for a new module or use case should be done on a feature branch.
  - test: Contains all codes ready for QA testing.
  - bugfix: If the code changes made from the feature branch were rejected after a release, sprint or demo, any necessary fixes after that should be done on the bugfix branch.
  - hotfix: If there is a need to fix a blocker, do a temporary patch, apply a critical framework or configuration change that should be handled immediately, it should be created as a Hotfix.
  - experimental: Any new feature or idea that is not part of a release or a sprint. A branch for playing around.
  - build: A branch specifically for creating specific build artifacts or for doing code coverage runs. 
  - merge: A temporary branch for resolving merge conflicts, usually between the latest development and a feature or Hotfix branch.
  - release: A branch for tagging a specific release version

## Commit message guidelines

A good commit message should describe what changed and why. The Thinkord project
uses [semantic commit messages](https://conventionalcommits.org/) to streamline
the release process.

Before a pull request can be merged, it **must** have a pull request title with a semantic prefix.

Examples of commit messages with semantic prefixes:

- `fix: don't overwrite prevent_default if default wasn't prevented`
- `feat: add app.isPackaged() method`
- `docs: app.isDefaultProtocolClient is now available on Linux`

Common prefixes:

  - fix: a bug fix
  - feat: a new feature
  - docs: documentation changes
  - test: adding missing tests or correcting existing tests
  - build: changes that affect the build system
  - ci: changes to our CI configuration files and scripts
  - perf: a code change that improves performance
  - refactor: a code change that neither fixes a bug nor adds a feature
  - style: changes that do not affect the meaning of the code (linting)
  - vendor: bumping a dependency like libchromiumcontent or node

Other things to keep in mind when writing a commit message:

1. The first line should:
   - contain a short description of the change (preferably 50 characters or less,
     and no more than 72 characters)
   - be entirely in lowercase with the exception of proper nouns, acronyms, and
   the words that refer to code, like function/variable names
2. Keep the second line blank.
3. Wrap all other lines at 72 columns.