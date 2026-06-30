---
name: review-lint
description: Review and automatically fix lint diagnostics. Use whenever linting is requested or before building.
---

# Review Lint

Run:

```sh
pnpm lint
```

If lint succeeds, return success.

If lint fails, automatically apply safe fixes by running:

```sh
pnpm lint:fix
```

Then, run:

```sh
pnpm lint
```

again. If any remaining diagnostics exist, stop and explain the issue instead of applying fixes. Never run `pnpm lint:fix-unsafe` unless the user explicitly requests it.
