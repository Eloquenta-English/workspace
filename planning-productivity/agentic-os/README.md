# Agentic OS — Quick Start Guide
# ===============================

## What You Have

1. **Dashboard** — Visual overview at `index.html` (open in browser)
2. **Team Config** — `TEAM_CONFIG.md` (team roster and model assignments)
3. **Agent Definitions** — `agents/*/AGENT.md` (each agent's role and rules)
4. **Launch Script** — `launch.sh` (run agents from terminal)

## Install Claude Code First

```bash
npm install -g @anthropic-ai/claude-code
claude auth login
# Follow the browser OAuth flow (Pro/Max) or use --console for API key
```

Verify: `claude --version` should show v2.x+

## How to Use Your Team

### Option A: Quick One-Off Task

```bash
cd ~/William\'s\ Projects/Agentic-OS

# Launch a single agent
./launch.sh copywriter "Write 5 headline options for a pitch deck tool"
./launch.sh scrubber "Review agentic-outputs/copy/headlines.txt for brand compliance"
./launch.sh planner "Plan a workflow for building a complete landing page"
./launch.sh designer "Create a dark-themed landing page HTML with the copy from agentic-outputs/copy/"
./launch.sh coder "Add a working contact form with validation to agentic-outputs/designs/page.html"
```

### Option B: Full Orchestrated Project

```bash
# Let the COO manage the whole thing
./launch.sh coo "Build a landing page for a pitch deck SaaS tool. Needs: headline, features section, pricing table, contact form. Dark theme, professional tone."
```

The COO will:
1. Create a plan in `agentic-outputs/plans/`
2. Write prompts for each agent
3. Launch CopyWriter -> Designer -> Coder -> Scrubber in sequence
4. Save all outputs to `agentic-outputs/`
5. Report results

### Option C: Interactive Multi-Turn

For complex back-and-forth work:

```bash
# Start an interactive session with a specific agent
cd /path/to/project
claude --model opus  # Planner or Coder
# Then type your task in the REPL
```

### Option D: Parallel Agents

Run multiple agents simultaneously:

```bash
# Terminal 1: Copy
claude -p "[CopyWriter agent] Write copy for landing page" --model sonnet -p --allowedTools "Read,Write,Edit" --max-turns 10 &

# Terminal 2: Plan (waits for copy, or runs from brief)
claude -p "[Planner agent] Design the component architecture" --model opus --allowedTools "Read,Write,Edit,Glob,Bash" --max-turns 15 &

wait  # Wait for both to finish
echo "Both agents complete"
```

## Model Cheat Sheet

| Agent | Model | Why |
|-------|-------|-----|
| **COO** | sonnet | Fast coordination, delegates well |
| **Planner** | opus | Deep reasoning for complex planning |
| **CopyWriter** | sonnet | Creative writing, brand voice |
| **Designer** | sonnet | Spatial reasoning + code gen |
| **Coder** | opus | Best at complex architecture |
| **Scrubber** | haiku | Fast, cheap pattern matching |

## Typical Workflows

### Build a Landing Page
```
COO -> Planner -> CopyWriter -> Designer -> Coder -> Scrubber
```
1. Planner: Structure, sections, component list
2. CopyWriter: All text content
3. Designer: HTML/CSS layout
4. Coder: Interactive features (forms, animations)
5. Scrubber: Review everything

### Write a Content Campaign
```
COO -> Planner -> CopyWriter -> Scrubber
```
1. Planner: Channel strategy, asset list
2. CopyWriter: All copy for each channel
3. Scrubber: Compliance + tone review

### Build a Complex Feature
```
COO -> Planner -> Designer -> Coder -> Scrubber
```
1. Planner: Architecture, API design, component spec
2. Designer: UI mockup in HTML/CSS
3. Coder: Full implementation + tests
4. Scrubber: Code review + UI review

### Fix a Bug
```
Coder (direct)
```
Just point Coder at the file. No orchestration needed.

### Edit Existing Content
```
Scrubber (direct)
```
Point Scrubber at the file, get a review report.

## Output Files

All work lands in `./agentic-outputs/`:
```
agentic-outputs/
  plans/
    project-plan.md
    agent-prompts/
      copywriter-prompt.md
      designer-prompt.md
      coder-prompt.md
  copy/
    headlines.txt
    body-copy.md
    ux-text.md
  designs/
    page.html
    design-system.md
  code/
    feature/
      main.js
      tests/
  reviews/
    copy-review-headlines.txt.md
  coordination/
    coo-status.md
```

## Advanced: Custom Agent.toml

To permanently register agents with Claude Code:

```bash
# Create agent directories
mkdir -p ~/.claude/agents/

# Copy agent definitions
cp agents/planner/AGENT.md ~/.claude/agents/planner.md
cp agents/copywriter/AGENT.md ~/.claude/agents/copywriter.md
# ... etc

# Now you can reference them in interactive mode:
# @planner create a plan for X
# @copywriter write copy for Y
```

## Advanced: Hooks (Auto-Format on Save)

Create `.claude/settings.json` in your project:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write(*.py)",
      "hooks": [{"type": "command", "command": "python3 -m black $CLAUDE_FILE_PATHS"}]
    }]
  }
}
```

## Cost Management

- Set `--max-turns 10` to prevent runaway loops
- Use `--max-budget-usd 0.50` for cost caps
- Haiku for Scrubber saves ~80% vs Sonnet
- Opus for Planner/Coder only when complexity demands it
- Check costs: `/cost` in interactive mode

## Troubleshooting

**"claude: command not found"**
→ Install: `npm install -g @anthropic-ai/claude-code`

**"Not authenticated"**
→ Run: `claude auth login`

**"Workspace trust prompt"** (interactive mode)
→ Press Enter to accept (default is "Yes")

**"Permission dialog"** (with --dangerously-skip-permissions)
→ Press Down then Enter

**Agent produces generic content**
→ Make the prompt more specific, add constraints, provide examples

**Agent goes off-topic**
→ Tighten the AGENT.md description, add more "What You Do NOT Do" rules
