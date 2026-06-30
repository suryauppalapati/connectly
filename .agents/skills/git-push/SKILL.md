---
name: git-push
description: Push committed changes to the current remote branch. Use only after a successful commit.
---

# Git Push

Push the current branch and automatically set the upstream if needed by running:

```sh
git push -u origin HEAD
```

If the push fails, stop and report the error.

Otherwise report:
- branch name
- commit SHA
