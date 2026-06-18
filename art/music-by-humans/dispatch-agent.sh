#!/bin/bash
# dispatch-agent.sh — Quick subagent dispatcher
# Usage: ./dispatch-agent.sh <agent-role> "<task>" [toolset1,toolset2,...]
#
# Roles: orchestrator, architect_coder, web_researcher, html_scout, messenger, artist
#
# Examples:
#   ./dispatch-agent.sh web_researcher "Find 10 underground ska artists" web,terminal
#   ./dispatch-agent.sh architect_coder "Build YouTube player in js/player.js" terminal,file
#   ./dispatch-agent.sh artist "Create retro-broadcast skin CSS" image_gen,vision,file

ROLE="${1:?Usage: $0 <role> <task> [toolsets]}"
TASK="${2:?Usage: $0 <role> <task> [toolsets]}"
CUSTOM_TOOLSETS="${3:-}"

# MODEL USAGE RULE: Default to free models. Only escalate to paid when free fails.
# Free models: gpt-4o-mini, llama-4-maverick, haiku
# Paid escalation: claude-sonnet-4, gpt-4o, claude-opus-4 (only after 2 free attempts fail)
declare -A MODELS=(
    [orchestrator]="openai/gpt-4o-mini"
    [architect_coder]="openai/gpt-4o-mini"
    [web_researcher]="openai/gpt-4o-mini"
    [html_scout]="openai/gpt-4o-mini"
    [messenger]="openai/gpt-4o-mini"
    [artist]="openai/gpt-4o"
)

# Paid escalation models (use only when free fails twice)
declare -A MODELS_PAID=(
    [orchestrator]="anthropic/claude-sonnet-4"
    [architect_coder]="anthropic/claude-sonnet-4"
    [web_researcher]="openai/gpt-4o"
    [html_scout]="openai/gpt-4o"
    [messenger]="openai/gpt-4o"
    [artist]="openai/gpt-4o"
)

declare -A TOOLSETS=(
    [orchestrator]="terminal,file,web"
    [architect_coder]="terminal,file"
    [web_researcher]="web,terminal"
    [html_scout]="web,file"
    [messenger]="web"
    [artist]="image_gen,vision,file"
)

if [[ -z "${MODELS[$ROLE]+x}" ]]; then
    echo "Unknown role: $ROLE"
    echo "Valid roles: ${!MODELS[*]}"
    exit 1
fi

MODEL="${MODELS[$ROLE]}"
if [[ -n "$CUSTOM_TOOLSETS" ]]; then
    TOOLSETS_OVERRIDE="$CUSTOM_TOOLSETS"
else
    TOOLSETS_OVERRIDE="${TOOLSETS[$ROLE]}"
fi

echo "┌─────────────────────────────────────────────"
echo "│ DISPATCHING: $ROLE"
echo "│ MODEL:       $MODEL"
echo "│ TOOLSETS:    $TOOLSETS_OVERRIDE"
echo "│ TASK:        $TASK"
echo "└─────────────────────────────────────────────"
echo ""

# Output the delegate_task call for the agent
# This script prints the command; the agent executes it
echo "delegate_task("
echo "    goal=\"$TASK\","
echo "    context=\"ROLE: $ROLE\nPROJECT: Music By Humans\nPROJECT_DIR: /home/irieb/William's Projects/Music-By-Humans/\nTASK: $TASK\","
echo "    model={\"provider\": \"openrouter\", \"model\": \"$MODEL\"},"
echo "    toolsets=[$(echo "$TOOLSETS_OVERRIDE" | sed 's/,/\", \"/g; s/^/\"/; s/$/\"/')]"
echo ")"
