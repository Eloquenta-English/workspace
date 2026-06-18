import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../state/store';
import { AiClient } from '../../ai/ApiClient';
import { parseCommands } from '../../ai/commands/CommandParser';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('resonance-ai-key') || '');
  const [model, setModel] = useState('openai/gpt-4o-mini');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [client, setClient] = useState<AiClient | null>(null);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('resonance-ai-key', apiKey);
      setClient(new AiClient({ apiKey, model }));
    }
  }, [apiKey, model]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !client) return;
    setError('');
    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    const userText = input;
    setInput('');
    setLoading(true);

    try {
      const store = useStore.getState();
      const systemPrompt = buildSystemPrompt(store);
      const allMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: userText },
      ];

      const response = await client.chat(allMessages);
      const commands = parseCommands(response);

      let executedCount = 0;
      for (const cmd of commands) {
        if (executeCommand(cmd)) executedCount++;
      }

      const aiMsg: Message = {
        role: 'assistant',
        content: response + (executedCount > 0 ? `\n\n(${executedCount} commands executed)` : ''),
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`ai-chat ${collapsed ? 'collapsed' : ''}`}>
      <div className="ai-chat-header" onClick={() => setCollapsed(!collapsed)}>
        <span>AI Assistant</span>
        <span className="ai-chat-toggle">{collapsed ? '+' : '−'}</span>
      </div>
      {!collapsed && (
        <>
          <div className="ai-chat-settings">
            <input
              type="password"
              className="ai-key-input"
              placeholder="API Key (OpenRouter)"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
            <select className="ai-model-select" value={model} onChange={e => setModel(e.target.value)}>
              <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
              <option value="openai/gpt-4o">GPT-4o</option>
              <option value="anthropic/claude-sonnet-4">Claude Sonnet 4</option>
              <option value="meta-llama/llama-4-maverick">Llama 4 Maverick</option>
            </select>
          </div>
          <div className="ai-messages">
            {messages.filter(m => m.role !== 'system').map((msg, i) => (
              <div key={i} className={`ai-message ai-message-${msg.role}`}>
                <span className="ai-role">{msg.role === 'user' ? 'You' : 'AI'}</span>
                <span className="ai-content">{msg.content}</span>
              </div>
            ))}
            {loading && <div className="ai-message ai-message-loading">Thinking...</div>}
            {error && <div className="ai-message ai-message-error">Error: {error}</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="ai-input-row">
            <input
              className="ai-text-input"
              placeholder="Ask AI to help..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            />
            <button className="ai-send-btn" onClick={sendMessage} disabled={loading || !client}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildSystemPrompt(store: any): string {
  const proj = store.project;
  const tracks = proj.tracks.map((t: { id: string; name: string; volume: number; muted: boolean; solo: boolean; clips: unknown[] }) =>
    `- ${t.name} (id: ${t.id}, vol: ${t.volume}, muted: ${t.muted}, solo: ${t.solo}, clips: ${t.clips.length})`
  ).join('\n');

  return `You are an AI assistant for Resonance DAW, a web-based digital audio workstation.

Current project: "${proj.name}"
Tempo: ${proj.bpm} BPM
Time Signature: ${proj.timeSignature.numerator}/${proj.timeSignature.denominator}
Tracks:
${tracks || '(none)'}

You can control the DAW using this DSL format (one command per line):
TRACK CREATE name="Name" color="#hex"
TRACK DELETE id="uuid"
TRACK RENAME id="uuid" name="New Name"
TRACK MUTE id="uuid"
TRACK SOLO id="uuid"
TRACK VOLUME id="uuid" value=0.0-1.0
TRACK PAN id="uuid" value=-1.0-1.0
CLIP CREATE track="uuid" start=0 duration=4 type="midi|audio"
CLIP DELETE track="uuid" clip="uuid"
TRANSPORT PLAY
TRANSPORT STOP
TRANSPORT SET_TEMPO bpm=120
TRANSPORT SET_LOOP enabled=true start=0 end=16
DEVICE ADD track="uuid" type="synth|reverb|delay|eq|compressor|drum-grid"
DEVICE REMOVE track="uuid" device="uuid"
DEVICE SET_PARAM track="uuid" device="uuid" param="name" value=0

Respond naturally to the user, then include any commands on separate lines.
If the user just wants to chat, no commands needed.`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function executeCommand(cmd: { type: string; params: Record<string, string> }): boolean {
  const store = useStore.getState();
  try {
    switch (cmd.type) {
      case 'TRACK': {
        const action = cmd.params.ACTION?.toUpperCase();
        if (action === 'CREATE') {
          store.addTrack();
          return true;
        }
        if (action === 'DELETE' && cmd.params.ID) {
          store.removeTrack(cmd.params.ID);
          return true;
        }
        if (action === 'MUTE' && cmd.params.ID) {
          const track = store.project.tracks.find((t: { id: string }) => t.id === cmd.params.ID);
          if (track) store.updateTrack(cmd.params.ID, { muted: !(track as { muted: boolean }).muted });
          return true;
        }
        if (action === 'SOLO' && cmd.params.ID) {
          const track = store.project.tracks.find((t: { id: string }) => t.id === cmd.params.ID);
          if (track) store.updateTrack(cmd.params.ID, { solo: !(track as { solo: boolean }).solo });
          return true;
        }
        if (action === 'VOLUME' && cmd.params.ID) {
          store.updateTrack(cmd.params.ID, { volume: parseFloat(cmd.params.VALUE) });
          return true;
        }
        if (action === 'PAN' && cmd.params.ID) {
          store.updateTrack(cmd.params.ID, { pan: parseFloat(cmd.params.VALUE) });
          return true;
        }
        return false;
      }
      case 'TRANSPORT': {
        const action = cmd.params.ACTION?.toUpperCase();
        if (action === 'PLAY') {
          store.setTransport({ playing: true });
          return true;
        }
        if (action === 'STOP') {
          store.setTransport({ playing: false });
          return true;
        }
        if (action === 'SET_TEMPO') {
          store.setBpm(parseInt(cmd.params.BPM) || 120);
          return true;
        }
        return false;
      }
      default:
        return false;
    }
  } catch {
    return false;
  }
}
