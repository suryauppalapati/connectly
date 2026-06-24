# Biome Linter Rules — Rationale

Every rule in [biome.json](file:///Users/suryauppalapati/Desktop/Lambda%205.0/connectly/biome.json) was hand-picked. Here's the thinking behind each one.

## Foundation: `"recommended": true`

This enables ~60 rules that Biome considers universally correct. They catch genuine bugs with near-zero false positives. Examples include `noDebugger`, `noUnreachable`, `noDuplicateCase`, `noSelfCompare`, etc.

**Everything below is on top of `recommended`.**

---

## Correctness — Catches real bugs

| Rule                    | Severity | Why                                                                       |
| ----------------------- | -------- | ------------------------------------------------------------------------- |
| `noUnusedVariables`     | `error`  | Dead code. Redundant with tsconfig but enforced at lint level too for CI. |
| `noUnusedImports`       | `error`  | Import clutter. Auto-fixable by Biome.                                    |
| `noUndeclaredVariables` | `error`  | Catches typos in variable names before runtime.                           |
| `noNewSymbol`           | `error`  | `new Symbol()` is a TypeError at runtime. Always a bug.                   |

---

## Suspicious — Likely mistakes, not style preferences

| Rule                        | Severity | Why                                                                                                                         |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `noExplicitAny`             | `error`  | Defeats TypeScript's purpose. Forces proper typing.                                                                         |
| `noConsole`                 | `warn`   | Reminds you to use a proper logger. Warn, not error — you need `console.log` during dev.                                    |
| `noDoubleEquals`            | `error`  | `==` coercion causes silent bugs (`"0" == false` is `true`). Always use `===`.                                              |
| `noRedeclare`               | `error`  | Redeclaring variables in the same scope is always a bug.                                                                    |
| `noShadowRestrictedNames`   | `error`  | Naming a variable `undefined`, `NaN`, `Infinity` etc. is a guaranteed footgun.                                              |
| `useAwait`                  | `warn`   | Flags `async` functions that never `await`. Usually a mistake. Warn because sometimes you want `async` for the return type. |
| `noEmptyBlockStatements`    | `warn`   | Empty `catch {}` or `if {}` blocks are usually incomplete code. Warn, not error — sometimes intentional.                    |
| `noAsyncPromiseExecutor`    | `error`  | `new Promise(async (resolve) => {})` — swallows errors silently. Always a bug.                                              |
| `noAssignInExpressions`     | `error`  | `if (x = 5)` instead of `if (x === 5)` — classic typo.                                                                      |
| `noFallthroughSwitchClause` | `error`  | Missing `break` in switch cases. Almost always a bug.                                                                       |
| `useIsArray`                | `error`  | `instanceof Array` fails across iframes/realms. `Array.isArray()` is correct.                                               |

---

## Style — Consistency that prevents confusion

| Rule                        | Severity | Why                                                                                               |
| --------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `useConst`                  | `error`  | If a variable is never reassigned, it should be `const`.                                          |
| `noNonNullAssertion`        | `warn`   | `value!` silences TypeScript. Warn to flag it — sometimes legitimate.                             |
| `useNodejsImportProtocol`   | `error`  | `import 'node:fs'` over `import 'fs'` — modern Node.js standard, disambiguates from npm packages. |
| `useImportType`             | `error`  | `import type { X }` for type-only imports — better tree-shaking and build performance.            |
| `useExportType`             | `error`  | Same as above, for exports.                                                                       |
| `noParameterAssign`         | `error`  | Reassigning function params mutates `arguments` and causes confusion.                             |
| `useTemplate`               | `warn`   | Prefer template literals over `'hello ' + name`. Warn because sometimes concatenation is clearer. |
| `useSingleVarDeclarator`    | `error`  | `const a = 1, b = 2` → separate declarations. Cleaner diffs.                                      |
| `useDefaultParameterLast`   | `error`  | `fn(a = 1, b)` is confusing — defaults should come last.                                          |
| `useThrowNewError`          | `error`  | `throw Error()` → `throw new Error()`. Consistency.                                               |
| `useConsistentArrowReturn`  | `warn`   | Enforces that arrow functions either always return a value implicitly/explicitly or never return. |
| `noMagicNumbers`            | `error`  | Flags unnamed numeric constants. Forces declaring meaningful constants (e.g. `const PORT = 3000`).|
| `useNumberNamespace`        | `error`  | `Number.parseInt()` over `parseInt()`. Avoids global pollution.                                   |
| `useExponentiationOperator` | `warn`   | `x ** 2` over `Math.pow(x, 2)`. Cleaner.                                                          |
| `useNumericSeparators`      | `warn`   | `1_000_000` over `1000000`. Readability.                                                          |
| `noNestedTernary`           | `warn`   | Deeply nested ternaries are unreadable. Warn, not error — one level is fine.                      |

---

## Complexity — Keep code maintainable

| Rule                             | Severity         | Why                                                                                                         |
| -------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `noForEach`                      | `warn`           | `for...of` is breakable, more readable. Warn because `.forEach` is sometimes idiomatic.                     |
| `noUselessCatch`                 | `error`          | `catch(e) { throw e }` — does nothing. Remove it.                                                           |
| `noUselessConstructor`           | `error`          | Empty `constructor() {}` or one that just calls `super()`. Noise.                                           |
| `noUselessRename`                | `error`          | `import { foo as foo }` — pointless.                                                                        |
| `noUselessTypeConstraint`        | `error`          | `<T extends any>` — `any` is the default. Removes noise.                                                    |
| `noUselessEmptyExport`           | `error`          | `export {}` when the file already has exports.                                                              |
| `noUselessTernary`               | `error`          | `x ? true : false` → just use `x`.                                                                          |
| `noUselessLabel`                 | `error`          | Labels on single loops. JavaScript artifact nobody uses.                                                    |
| `noThisInStatic`                 | `error`          | `this` in static methods refers to the class, not an instance. Almost always a mistake.                     |
| `useOptionalChain`               | `error`          | `a && a.b && a.b.c` → `a?.b?.c`. Cleaner, safer.                                                            |
| `useFlatMap`                     | `warn`           | `.map().flat()` → `.flatMap()`. Performance + readability.                                                  |
| `useArrowFunction`               | `warn`           | Prefer arrow functions over `function` expressions. Warn, not error — named functions have debugging value. |
| `noStaticOnlyClass`              | `warn`           | A class with only static members should be a plain object or module.                                        |
| `noExcessiveCognitiveComplexity` | `warn (max: 25)` | Flags functions that are too hard to understand. 25 is generous — catches only truly gnarly code.           |

---

## Security — Non-negotiable

| Rule           | Severity | Why                                                |
| -------------- | -------- | -------------------------------------------------- |
| `noGlobalEval` | `error`  | `eval()` is a code injection vector. Never use it. |

> [!NOTE]
> The other security rules (`noBlankTarget`, `noDangerouslySetInnerHtml`, etc.) are React/DOM-specific and not relevant for a pure backend API project.

---

## Nursery — Experimental but high-value for your stack

| Rule                          | Severity | Why                                                                                                                                                       |
| ----------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `noFloatingPromises`          | `error`  | **Critical.** A Promise that is neither `await`ed nor `.catch()`ed silently swallows errors. This is the #1 source of invisible bugs in Node.js backends. |
| `noDrizzleDeleteWithoutWhere` | `error`  | **Drizzle-specific.** Prevents `db.delete(usersTable)` without `.where()` — would delete every row.                                                       |
| `noDrizzleUpdateWithoutWhere` | `error`  | **Drizzle-specific.** Same — prevents `db.update(usersTable).set(...)` from updating every row.                                                           |
| `useImportsFirst`             | `warn`   | All imports at the top of the file, before any code.                                                                                                      |
| `noMisusedPromises`           | `warn`   | Catches Promises used in boolean positions, array callbacks, etc. where they're silently truthy. Warn because nursery rules can have false positives.     |

> [!IMPORTANT]
> Nursery rules are experimental — they may have occasional false positives. If any of them become too noisy, we can suppress individual cases with `// biome-ignore` or downgrade to `"off"`.
