export function parseCommand(line: string): { type: string; params: Record<string, string> } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return null;

  const match = trimmed.match(/^([A-Z_]+)\s+(.+)$/);
  if (!match) return null;

  const type = match[1];
  const rest = match[2];
  const params: Record<string, string> = {};

  // Parse KEY=value pairs, handling quoted strings
  const regex = /(\w+)=(?:"([^"]*?)"|(\S+))/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(rest)) !== null) {
    const key = m[1];
    const val = m[2] !== undefined ? m[2] : m[3];
    params[key] = val;
  }

  if (Object.keys(params).length === 0) return null;
  return { type, params };
}

export function parseCommands(text: string): Array<{ type: string; params: Record<string, string> }> {
  return text
    .split('\n')
    .map(line => parseCommand(line))
    .filter((cmd): cmd is { type: string; params: Record<string, string> } => cmd !== null);
}
