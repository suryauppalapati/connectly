---
name: git-stage
description: Group related changes and stage them logically. Automatically commits each group. Use before pushing.
---

# Git Stage and Commit

1. Run `git status` (and `git diff` if needed) to find all modified, deleted, and untracked files.
2. Analyze the paths and semantic relationship between the files.
3. Group strongly related files (e.g., a user route file and its corresponding type definitions) into a single logical commit.
4. Separate unrelated changes (e.g., unrelated type definitions, configuration changes) into distinct commits.
5. For each group:
   - Stage the group with `git add <files>`.
   - Formulate a commit message by adhering strictly to the formatting rules defined in the `git-commit` skill.
   - Run `git commit -m "<message>"`.
6. Repeat step 5 until all files are successfully committed. Unrelated changes must be grouped into separate atomic commits.
