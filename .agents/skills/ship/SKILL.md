---
name: ship
description: Safely validate, build, stage, commit, and push a repository. Use whenever the user asks to ship, publish, or push changes.
---

# Ship Workflow

Execute the following workflow in order. You must stop immediately if any step fails. Never continue after a failed validation.

1. Use the `review-format` skill.
2. Use the `review-lint` skill.
3. Use the `build-project` skill.
4. Use the `git-stage` skill.
5. Use the `git-push` skill.
