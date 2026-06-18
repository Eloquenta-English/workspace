# Agentic OS — Team Configuration
# =================================
# This file defines your multi-agent team. Each agent has a role,
# a preferred model, and specific tools/permissions.
#
# HOW TO USE:
# 1. Install Claude Code: npm install -g @anthropic-ai/claude-code
# 2. Authenticate: claude auth login (or claude auth login --console for API key)
# 3. Place this file at ~/.claude/CLAUDE.md (global) or ./CLAUDE.md (per-project)
# 4. Create agent files in ~/.claude/agents/ (see below)
# 5. Launch agents via: claude -p "task" --model <model> --allowedTools "Read,Edit,Write,Bash"

## Team Roster

| Agent | Role | Model | Why This Model |
|-------|------|-------|-----------------|
| COO | Orchestrator / Manager | claude-sonnet-4-6 | Best balance of reasoning + speed for coordination |
| CopyWriter | Marketing copy, UX text, emails | claude-sonnet-4-6 | Strong creative writing, understands brand voice |
| Scrubber | Edit, tone-check, compliance review | claude-haiku-4-5 | Fast, cheap, good at pattern matching and rules |
| Planner | Project plans, prompt design, strategy | claude-opus-4 | Deep reasoning for complex planning |
| Designer | Visual design, HTML/CSS, layouts | claude-sonnet-4-6 | Good spatial reasoning + code generation |
| Coder | Complex features, architecture, debugging | claude-opus-4 | Best coding model, handles complexity |

## Model Selection Guide

| Model | Strengths | Cost | Use For |
|-------|-----------|------|---------|
| claude-opus-4 | Deep reasoning, complex analysis, best code | $$$ | Planning, architecture, complex coding |
| claude-sonnet-4-6 | Balanced speed/quality, good at most things | $$ | General purpose, copy, design, orchestration |
| claude-haiku-4-5 | Fast, cheap, good at structured tasks | $ | Editing, scrubbing, simple tasks, reviews |
| gpt-4o | Strong all-rounder, good with tools | $$ | Alternative for coding, web research |
| gemini-2.5-pro | Long context, good at analysis | $$ | Large document analysis, planning |

## Agent Communication Pattern

The COO agent orchestrates work by:
1. Receiving a task from the user
2. Breaking it into subtasks
3. Delegating to the appropriate specialist agent
4. Reviewing outputs
5. Coordinating handoffs between agents

Example flow for "Build a landing page":
  COO -> Planner: "Design the page structure and copy plan"
  Planner -> COO: Returns plan.md with sections, copy briefs, layout notes
  COO -> CopyWriter: "Write copy for these sections: [plan]"
  CopyWriter -> COO: Returns copy.md with all text content
  COO -> Designer: "Create HTML/CSS layout based on [plan] and [copy]"
  Designer -> COO: Returns landing-page.html
  COO -> Coder: "Add interactive features: [list from plan]"
  Coder -> COO: Returns enhanced landing-page.html
  COO -> Scrubber: "Review all copy and code for issues"
  Scrubber -> COO: Returns scrub-report.md with fixes
  COO -> User: Delivers final files + summary

## File Conventions

All agent outputs go to: ./agentic-outputs/
  ./agentic-outputs/plans/       — Planner outputs
  ./agentic-outputs/copy/        — CopyWriter outputs
  ./agentic-outputs/designs/     — Designer outputs
  ./agentic-outputs/code/        — Coder outputs
  ./agentic-outputs/reviews/     — Scrubber outputs
  ./agentic-outputs/coordination/ — COO coordination files

## Task Templates

### New Feature Request
  COO receives: feature description + requirements
  COO delegates to: Planner -> CopyWriter -> Designer -> Coder -> Scrubber
  Output: Complete feature with copy, design, code, and review

### Content Campaign
  COO receives: campaign brief (audience, channels, goals)
  COO delegates to: Planner -> CopyWriter -> Scrubber
  Output: Campaign plan + all copy assets + compliance review

### Code Refactor
  COO receives: codebase path + refactor goals
  COO delegates to: Planner -> Coder -> Scrubber (for code review)
  Output: Refactored code + plan + review report

### Design System
  COO receives: brand guidelines + component list
  COO delegates to: Planner -> Designer -> Coder -> Scrubber
  Output: Design system docs + HTML/CSS components + review
