# Pull Requests

* [Setting up your local environment](#setting-up-your-local-environment)
  * [Step 1: Fork](#step-1-fork)
  <!-- * [Step 2: Build](#step-2-build) -->
  * [Step 2: Branch](#step-2-branch)
* [Making Changes](#making-changes)
  * [Step 3: Code](#step-3-code)
  * [Step 4: Commit](#step-4-commit)
    * [Commit message guidelines](#commit-message-guidelines)
  * [Step 5: Rebase](#step-5-rebase)
  * [Step 6: Test](#step-6-test)
  * [Step 7: Push](#step-7-push)
  * [Step 8: Opening the Pull Request](#step-8-opening-the-pull-request)
  * [Step 9: Discuss and Update](#step-9-discuss-and-update)
    * [Approval and Request Changes Workflow](#approval-and-request-changes-workflow)
  * [Step 10: Landing](#step-10-landing)
  * [Continuous Integration Testing](#continuous-integration-testing)

## Setting up your local environment

### Step 1: Fork

Fork the project [on GitHub](https://github.com/thinkord/thinkord) and clone your fork
locally.

```sh
$ git clone git@github.com:username/thinkord.git
$ cd thinkord
$ git remote add upstream https://github.com/thinkord/thinkord.git
$ git fetch upstream
```

### Step 2: Branch

To keep your development environment organized, create local branches to
hold your work. These should be branched directly off of the `master` branch.

```sh
$ git checkout -b my-branch -t upstream/master
```
Examples of branch names:
  - `feature/ipc-main`
  - `bugfix/user-login`
  - `release/v1.0.0`

## Making Changes

### Step 3: Code

Most pull requests opened against the `thinkord/thinkord` repository include
changes to either the Electron code in the `main/` folder, the React code in the `src/`, the documentation in `docs/`.

Please be sure to run `npm run lint` from time to time on any code changes
to ensure that they follow the project's code style.

### Step 4: Commit

It is recommended to keep your changes grouped logically within individual
commits. Many contributors find it easier to review changes that are split
across multiple commits. There is no limit to the number of commits in a
pull request.

```sh
$ git add my/changed/files
$ git commit
```

Note that multiple commits often get squashed when they are landed.

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional
body or footer section introduces a breaking API change (correlating with Major
in semantic versioning). A breaking change can be part of commits of any type.
e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any
other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### Step 5: Rebase

Once you have committed your changes, it is a good idea to use `git rebase`
(not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

or more succinct
```sh
$ git pull --rebase upstream/master
```

This ensures that your working branch has the latest changes from `thinkord/thinkord`
master.

<!-- ### Step 6: Test

Bug fixes and features should always come with tests. A
[testing guide](https://electronjs.org/docs/development/testing) has been
provided to make the process easier. Looking at other tests to see how they
should be structured can also help.

Before submitting your changes in a pull request, always run the full
test suite. To run the tests:

```sh
$ npm run test
```

Make sure the linter does not report any issues and that all tests pass.
Please do not submit patches that fail either check.

If you are updating tests and want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

The above would only run spec modules matching `menu`, which is useful for
anyone who's working on tests that would otherwise be at the very end of
the testing cycle. -->

### Step 7: Push

Once your commits are ready to go -- with passing tests and linting --
begin the process of opening a pull request by pushing your working branch
to your fork on GitHub.

```sh
$ git push origin my-branch
```

### Step 8: Opening the Pull Request

Open a new pull request from within GitHub.

### Step 9: Discuss and update

You will probably get feedback or requests for changes to your pull request.
This is a big part of the submission process so don't be discouraged! Some
contributors may sign off on the pull request right away. Others may have
detailed comments or feedback. This is a necessary part of the process
in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local
branch, add a new commit with those changes, and push those to your fork.
GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using
`git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are
awaiting an answer on something. If you encounter words or acronyms that
seem unfamiliar, refer to this
[glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### Approval and Request Changes Workflow

All pull requests require approval from a
Code Owner
of the area you modified in order to land. Whenever a maintainer reviews a pull
request they may request changes. These may be small, such as fixing a typo, or
may involve substantive changes. Such requests are intended to be helpful, but
at times may come across as abrupt or unhelpful, especially if they do not include
concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek
the input of another project contributor. Often such comments are the result of
a reviewer having taken insufficient time to review and are not ill-intended.
Such difficulties can often be resolved with a bit of patience. That said,
reviewers should be expected to provide helpful feeback.

### Step 10: Landing

In order to land, a pull request needs to be reviewed and approved by
at least one Thinkord Code Owner and pass CI. After that, if there are no
objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### Continuous Integration Testing

Every pull request is tested on the Continuous Integration (CI) system, GitHub Actions, to
confirm that it works on Thinkord's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms.
This means that all tests pass and there are no linting errors. However,
it is not uncommon for the CI infrastructure itself to fail on specific
platforms or for so-called "flaky" tests to fail ("be red"). Each CI
failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only
core maintainers can restart a CI run. If you believe CI is giving a
false negative, ask a maintainer to restart the tests.

## Disclaimer
This guidelines are modified from [this link](https://www.electronjs.org/docs/development/pull-requests).
