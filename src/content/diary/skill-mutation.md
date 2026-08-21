---
title: "Evolving LLM skills"
date: 2026-08-10
summary: "What I'm working on: treating skill files as genomes and benchmarks as natural selection."
tags: [research, llm, agents]
---

The research I'm doing with Prof. Anant Sahai asks a simple question: if a
skill file changes how well an LLM performs a task, can we *evolve* better
skills instead of hand-writing them?

The loop looks like this:

1. **Mutate** — an orchestrator spawns parallel edits of a skill.
2. **Evaluate** — each variant runs against a benchmark deterministically,
   scored on accuracy, token usage, and step count.
3. **Select** — those metrics become a fitness signal; the mutator decides
   what to keep, what to combine, and what to dump.
4. **Generalize** — a held-out gate stops the skill from overfitting to the
   benchmark it trained on.

So far the loop has optimized skills for code editing, SQL, data science, and
logic puzzles. The open-source half of this work is
[skill-mutator](https://github.com/maxlbchung/skill-mutator).
