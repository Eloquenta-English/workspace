#!/bin/bash
# Agentic OS — Team Launcher
# ==========================
# Usage: ./launch.sh [agent] [task]
# 
# Agents: coo, planner, copywriter, designer, coder, scrubber
#
# Examples:
#   ./launch.sh copywriter "Write headlines for a SaaS landing page"
#   ./launch.sh planner "Plan a complete product launch workflow"
#   ./launch.sh coo "Build a landing page with copy, design, and interactivity"

set -e

AGENT="${1:?Usage: ./launch.sh [agent] [task]}"
shift
TASK="${*:?Provide a task description}"

# Model assignments
declare -A MODELS=(
  [coo]="claude-sonnet-4-6"
  [planner]="claude-opus-4"
  [copywriter]="claude-sonnet-4-6"
  [designer]="claude-sonnet-4-6"
  [coder]="claude-opus-4"
  [scrubber]="claude-haiku-4-5"
)

# Tools per agent
declare -A TOOLS=(
  [coo]="Read,Write,Edit,Glob,Bash"
  [planner]="Read,Write,Edit,Glob,Bash"
  [copywriter]="Read,Write,Edit,Glob"
  [designer]="Read,Write,Edit,Glob,Bash"
  [coder]="Read,Write,Edit,Glob,Bash"
  [scrubber]="Read,Write,Glob"
)

# Agent instructions
AGENT_DIR="$(cd "$(dirname "$0")" && pwd)/agents"

MODEL="${MODELS[$AGENT]:-claude-sonnet-4-6}"
ALLOWED_TOOLS="${TOOLS[$AGENT]:-Read,Write,Edit}"
AGENT_PROMPT=""

# Build the agent prompt from AGENT.md
AGENT_FILE="$AGENT_DIR/$AGENT/AGENT.md"
if [ -f "$AGENT_FILE" ]; then
  # Extract everything after the frontmatter
  AGENT_PROMPT=$(awk '/^---$/{if(++count==2){next; exit}} count>=2{print}' "$AGENT_FILE")
fi

# Output directory
OUTPUT_DIR="$(pwd)/agentic-outputs"
mkdir -p "$OUTPUT_DIR"/{plans,copy,designs,code,reviews,coordination}

echo "=========================================="
echo " Agentic OS — Launching $AGENT"
echo " Model: $MODEL"
echo " Tools: $ALLOWED_TOOLS"
echo " Output: $OUTPUT_DIR"
echo "=========================================="
echo ""

# Check if claude is installed
if ! command -v claude &> /dev/null; then
  echo "ERROR: Claude Code CLI not installed."
  echo "Install with: npm install -g @anthropic-ai/claude-code"
  echo "Then authenticate: claude auth login"
  exit 1
fi

# Build the full prompt
FULL_PROMPT="$AGENT_PROMPT

---

## Current Task
$TASK

## Output Directory
Save all outputs to: $OUTPUT_DIR

## Instructions
1. Read any relevant input files from $OUTPUT_DIR
2. Complete the task following your agent rules
3. Save all outputs to the appropriate subdirectory
4. Report what you produced and the file paths"

# Launch the agent
echo "Launching $AGENT with model $MODEL..."
echo ""

claude -p "$FULL_PROMPT" \
  --model "$MODEL" \
  --allowedTools "$ALLOWED_TOOLS" \
  --max-turns 20

echo ""
echo "=========================================="
echo " $AGENT complete"
echo " Check outputs in: $OUTPUT_DIR"
echo "=========================================="
