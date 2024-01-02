import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "translation",
        "security",
        "changeset",
      ],
    ],
  },

  /*
   * Custom URL to show upon failure
   */
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  /*
   * Custom prompt configs
   */
  // prompt: {
  //   messages: {},
  //   questions: {
  //     type: {
  //       description: "please input type:",
  //     },
  //   },
  // },

  // prompt: {
  //   settings: {},
  //   messages: {
  //     skip: ":skip",
  //     max: "upper %d chars",
  //     min: "%d chars at least",
  //     emptyWarning: "can not be empty",
  //     upperLimitWarning: "over limit",
  //     lowerLimitWarning: "below limit",
  //   },
  //   questions: {
  //     type: {
  //       description: "Select the type of change that you're committing:",
  //       enum: {
  //         feat: {
  //           description: "A new feature",
  //           title: "Features",
  //           emoji: "✨",
  //         },
  //         fix: {
  //           description: "A bug fix",
  //           title: "Bug Fixes",
  //           emoji: "🐛",
  //         },
  //         docs: {
  //           description: "Documentation only changes",
  //           title: "Documentation",
  //           emoji: "📚",
  //         },
  //         style: {
  //           description:
  //             "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
  //           title: "Styles",
  //           emoji: "💎",
  //         },
  //         refactor: {
  //           description:
  //             "A code change that neither fixes a bug nor adds a feature",
  //           title: "Code Refactoring",
  //           emoji: "📦",
  //         },
  //         perf: {
  //           description: "A code change that improves performance",
  //           title: "Performance Improvements",
  //           emoji: "🚀",
  //         },
  //         test: {
  //           description: "Adding missing tests or correcting existing tests",
  //           title: "Tests",
  //           emoji: "🚨",
  //         },
  //         build: {
  //           description:
  //             "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
  //           title: "Builds",
  //           emoji: "🛠",
  //         },
  //         ci: {
  //           description:
  //             "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
  //           title: "Continuous Integrations",
  //           emoji: "⚙️",
  //         },
  //         chore: {
  //           description: "Other changes that don't modify src or test files",
  //           title: "Chores",
  //           emoji: "♻️",
  //         },
  //         revert: {
  //           description: "Reverts a previous commit",
  //           title: "Reverts",
  //           emoji: "🗑",
  //         },
  //       },
  //     },
  //     scope: {
  //       description:
  //         "What is the scope of this change (e.g. component or file name)",
  //     },
  //     subject: {
  //       description:
  //         "Write a short, imperative tense description of the change",
  //     },
  //     body: {
  //       description: "Provide a longer description of the change",
  //     },
  //     isBreaking: {
  //       description: "Are there any breaking changes?",
  //     },
  //     breakingBody: {
  //       description:
  //         "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
  //     },
  //     breaking: {
  //       description: "Describe the breaking changes",
  //     },
  //     isIssueAffected: {
  //       description: "Does this change affect any open issues?",
  //     },
  //     issuesBody: {
  //       description:
  //         "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself",
  //     },
  //     issues: {
  //       description: 'Add issue references (e.g. "fix #123", "re #123".)',
  //     },
  //   },
  // },
};

module.exports = Configuration;

/* 
  build:
    Explanation: Commits related to the build system and dependencies. 
    Example: You've updated your project's dependencies, and you want to reflect those changes in the build system.
    Command -- build: update webpack to version 5

  chore:
    Explanation: General maintenance and tasks that are not tied to a specific feature or bug fix.
    Example: You've cleaned up code formatting, removed unused dependencies, or performed other general maintenance tasks.
    Command -- chore: remove obsolete utility functions

  ci:
    Explanation: Changes to the continuous integration configuration and scripts.
    Example: You've modified the continuous integration configuration to add a new testing step.
    Command -- ci: add unit tests to GitHub Actions workflow

  docs:
    Explanation: Commits related to documentation.
    Example: You've updated the project's documentation to include instructions for a new feature.
    Command -- docs: add usage documentation for new authentication feature

  feat:
    Explanation: The introduction of a new feature to the project.
    Example: You've added a new feature, such as user authentication.
    Command -- feat: implement user authentication using OAuth

  perf:
    Explanation: Commits focused on improving performance.
    Example: You've optimized a database query for better performance.
    Command -- perf: improve efficiency of user profile retrieval

  refactor:
    Explanation: Code refactoring without changing the overall behavior.
    Example: You've reorganized the project's folder structure to improve code maintainability.
    Command -- refactor: restructure project folders for clarity

  revert:
    Explanation: Reverting a previous commit, effectively undoing changes.
    Example: You've discovered that a recent commit introduced a critical bug, and you need to revert it.
    Command -- revert: revert changes causing authentication issue

  style:
    Explanation: Changes that do not affect the meaning of the code, such as formatting and indentation.
    Example: You've fixed code formatting issues, such as indentation or inconsistent spacing.
    Command -- style: correct indentation in authentication module

  test:
    Explanation: Adding or modifying tests to ensure the codebase is adequately tested.
    Example: You've added unit tests to ensure proper functionality of a new or existing feature.
    Command -- test: add tests for user authentication

  translation:
    Explanation: Updates to translations and language files.
    Example: You've added support for a new language, such as French.
    Command -- translation: add French language support

  security:
    Explanation: Commits related to security fixes or enhancements.
    Example: You've updated project dependencies to address known vulnerabilities.
    Command -- security: update npm packages to patch security vulnerabilities

  changeset:
    Explanation: Commits related to managing changeset files, often used in monorepos to track and version changes across packages.
    Example: In a monorepo, you've created a changeset to track and version changes across multiple packages.
    Command -- changeset: prepare changes for version 2.0.0 across packages

    */
