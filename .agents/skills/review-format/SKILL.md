---
name: review-format
description: Evaluate and apply formatting. Use whenever formatting needs to be checked or applied.
---

# Review Formatting

Run:

```sh
pnpm format:check
```

If the format check fails due to formatting issues (and no syntax errors are reported), automatically run:

```sh
pnpm format
```

This ensures all code is consistently formatted without manual intervention.
