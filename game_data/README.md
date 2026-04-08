# The Last Blessing — Claude Data README

This package is the normalized JSON export generated from `last_blessing_game_data.xlsx`.

## Source of truth
The spreadsheet is the authority. These JSON files are derived from it and normalized so Claude Code can read them reliably.

## Important logic changes from the older JSON set
- **CP, not SP, drives combat level progression.**
- `skill_boxes.json` now uses `cp_earned`.
- `class_promotion_rules.json` now uses `cp_pool_required`.
- Cross-file references were normalized so IDs are available everywhere they matter.
- Flat stat columns were nested into `stat_bonuses` or `total_stats` objects where appropriate.

## Core progression rules
- Players spend **LP** to unlock skill boxes.
- Skill boxes grant **CP**.
- Combat level formula:
  - `combat_level = floor(total_cp / 25) + 1`
- Unlearning refunds LP at rate `1`.
- Unlearning removes granted stat bonuses: `true`
- Unlearning removes granted skills: `true`

## File guide
- `classes.json` — class definitions and total class stat pools
- `species.json` — species/sub-race modifiers and banned classes
- `skill_boxes.json` — core progression boxes, LP costs, CP gains, and stat bonuses
- `skills.json` — skills linked to specific skill boxes
- `skills_effects.json` — effect glossary used by skills
- `class_promotion_rules.json` — class unlock requirements
- `stats.json` — stat glossary
- `elements.json` — elemental matchup data
- `weapon_types.json` — weapon categories, EXP pools, licenses
- `weapons.json` — starter weapons and their bonuses
- `rarity_index.json` — rarity list
- `consumables.json` — consumables list
- `gear_types.json` — gear slot/type definitions
- `gear_sets.json` — set identities and stat themes
- `gear_set_bonuses.json` — 2–6 piece set bonus totals
- `combat_level_formula.json` — formula constants

## Rules for Claude Code
1. Treat these JSON files as authoritative unless the spreadsheet is explicitly edited later.
2. Do not rename IDs.
3. Do not invent new classes, skills, effects, or stats unless asked.
4. Preserve cross-file IDs when editing.
5. A skill should always belong to a `skill_box_id`.
6. Promotion logic should come from `class_promotion_rules.json`, not guessed from class names.

## Notes on normalization
- Some spreadsheet sheets contained helper/reference columns; these were trimmed or converted.
- Some files preserve both `*_id` and `*_name` for readability, but IDs should be treated as canonical.
- Spreadsheet inconsistencies such as “SP pool” wording were normalized to **CP pool** where the gameplay logic clearly refers to combat-point progression.
