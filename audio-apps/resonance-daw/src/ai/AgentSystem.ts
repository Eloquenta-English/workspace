// ─── Agent System: Orchestrates AI conversations and command execution ───

import { AiClient, ChatMessage } from './ApiClient';
import { parseCommands } from './commands/CommandParser';

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface SendMessageResult {
  response: string;
  commandsExecuted: number;
}

export class AgentSystem {
  public messages: AgentMessage[] = [];
  public client: AiClient;
  private store: {
    project: {
      tracks: Array<{
        id: string;
        name: string;
        type: string;
        muted: boolean;
        solo: boolean;
        volume: number;
        pan: number;
        clips: Array<{ id: string; name: string }>;
      }>;
    };
    transport: {
      playing: boolean;
      loopEnabled: boolean;
      loopStart: number;
      loopEnd: number;
    };
    addTrack: (opts?: { name?: string; color?: string; type?: string }) => void;
    removeTrack: (id: string) => void;
    updateTrack: (id: string, changes: Record<string, unknown>) => void;
    addClip: (trackId: string, opts?: Record<string, unknown>) => void;
    removeClip: (trackId: string, clipId: string) => void;
    setTransport: (changes: Record<string, unknown>) => void;
    setBpm: (bpm: number) => void;
  };

  constructor(
    client: AiClient,
    store: {
      project: {
        tracks: Array<{
          id: string;
          name: string;
          type: string;
          muted: boolean;
          solo: boolean;
          volume: number;
          pan: number;
          clips: Array<{ id: string; name: string }>;
        }>;
      };
      transport: {
        playing: boolean;
        loopEnabled: boolean;
        loopStart: number;
        loopEnd: number;
      };
      addTrack: (opts?: { name?: string; color?: string; type?: string }) => void;
      removeTrack: (id: string) => void;
      updateTrack: (id: string, changes: Record<string, unknown>) => void;
      addClip: (trackId: string, opts?: Record<string, unknown>) => void;
      removeClip: (trackId: string, clipId: string) => void;
      setTransport: (changes: Record<string, unknown>) => void;
      setBpm: (bpm: number) => void;
    }
  ) {
    this.client = client;
    this.store = store;
  }

  async sendMessage(userText: string): Promise<SendMessageResult> {
    // 1. Add user message to history
    this.messages.push({
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    });

    // 2. Build system prompt from current store state
    const systemPrompt = buildAgentSystemPrompt({
      project: this.store.project,
      transport: this.store.transport,
    });

    // 3. Build full message history for API
    const apiMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...this.messages.map((m): ChatMessage => ({
        role: m.role as 'system' | 'user' | 'assistant',
        content: m.content,
      })),
    ];

    // 4. Call API
    const response = await this.client.chat(apiMessages);

    // 5. Parse response for DSL commands
    const commands = this.parseCommands(response);

    // 6. Execute each command
    let commandsExecuted = 0;
    for (const cmd of commands) {
      if (this.executeCommand(cmd)) {
        commandsExecuted++;
      }
    }

    // 7. Add AI response to history
    this.messages.push({
      role: 'assistant',
      content: response,
      timestamp: Date.now(),
    });

    return { response, commandsExecuted };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseCommands(response: string): any[] {
    return parseCommands(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  executeCommand(command: any): boolean {
    try {
      const { type, params } = command;

      switch (type) {
        case 'TRACK': {
          const action = params.action || this.inferTrackAction(params);
          return this.executeTrackCommand(action, params);
        }
        case 'CLIP': {
          const action = params.action || this.inferClipAction(params);
          return this.executeClipCommand(action, params);
        }
        case 'TRANSPORT': {
          return this.executeTransportCommand(params);
        }
        case 'DEVICE': {
          return this.executeDeviceCommand(params);
        }
        default:
          return false;
      }
    } catch {
      return false;
    }
  }

  private inferTrackAction(params: Record<string, string>): string {
    if (params.name && !params.id) return 'CREATE';
    if (params.name && params.id) return 'RENAME';
    if ('muted' in params || Object.keys(params).filter(k => k !== 'id').length === 0) return 'MUTE';
    if ('solo' in params) return 'SOLO';
    if ('volume' in params) return 'VOLUME';
    if ('pan' in params) return 'PAN';
    return 'UPDATE';
  }

  private executeTrackCommand(action: string, params: Record<string, string>): boolean {
    switch (action.toUpperCase()) {
      case 'CREATE': {
        this.store.addTrack({
          name: params.name || 'New Track',
          color: params.color,
          type: params.type as 'midi' | 'audio' | 'return' | 'master' | undefined,
        });
        return true;
      }
      case 'DELETE': {
        if (params.id) {
          this.store.removeTrack(params.id);
          return true;
        }
        return false;
      }
      case 'RENAME': {
        if (params.id && params.name) {
          this.store.updateTrack(params.id, { name: params.name });
          return true;
        }
        return false;
      }
      case 'MUTE': {
        if (params.id) {
          this.store.updateTrack(params.id, { muted: true });
          return true;
        }
        return false;
      }
      case 'SOLO': {
        if (params.id) {
          this.store.updateTrack(params.id, { solo: true });
          return true;
        }
        return false;
      }
      case 'VOLUME': {
        if (params.id && params.value) {
          this.store.updateTrack(params.id, { volume: parseFloat(params.value) });
          return true;
        }
        return false;
      }
      case 'PAN': {
        if (params.id && params.value) {
          this.store.updateTrack(params.id, { pan: parseFloat(params.value) });
          return true;
        }
        return false;
      }
      default:
        return false;
    }
  }

  private inferClipAction(params: Record<string, string>): string {
    if (params.start || (params.track && !params.clip)) return 'CREATE';
    if (params.clip) return 'DELETE';
    return 'UPDATE';
  }

  private executeClipCommand(action: string, params: Record<string, string>): boolean {
    switch (action.toUpperCase()) {
      case 'CREATE': {
        if (params.track) {
          this.store.addClip(params.track, {
            startBeat: params.start ? parseFloat(params.start) : 0,
            duration: params.duration ? parseFloat(params.duration) : 4,
          });
          return true;
        }
        return false;
      }
      case 'DELETE': {
        if (params.track && params.clip) {
          this.store.removeClip(params.track, params.clip);
          return true;
        }
        return false;
      }
      default:
        return false;
    }
  }

  private executeTransportCommand(params: Record<string, string>): boolean {
    // The DSL format uses: TRANSPORT PLAY, TRANSPORT STOP, etc.
    // But since parseCommand only captures KEY=value, we need to handle
    // the action from the first key or infer from params
    const keys = Object.keys(params);

    if (keys.includes('PLAY') || (keys.length === 0 && !keys.includes('STOP'))) {
      this.store.setTransport({ playing: true });
      return true;
    }
    if (keys.includes('STOP')) {
      this.store.setTransport({ playing: false });
      return true;
    }
    if (keys.includes('bpm')) {
      this.store.setBpm(parseFloat(params.bpm));
      return true;
    }
    if (keys.includes('enabled')) {
      this.store.setTransport({
        loopEnabled: params.enabled === 'true',
        loopStart: params.start ? parseFloat(params.start) : 0,
        loopEnd: params.end ? parseFloat(params.end) : 256,
      });
      return true;
    }

    return false;
  }

  private executeDeviceCommand(params: Record<string, string>): boolean {
    // Device commands are logged but not fully implemented yet
    // since the store doesn't have device-level actions
    console.log('Device command:', params);
    return true;
  }

  clearHistory(): void {
    this.messages = [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAgentSystemPrompt(state: any): string {
  const proj = state.project;
  const tracks = proj.tracks.map((t: any) =>
    `- ${t.name} (id: ${t.id}, vol: ${t.volume}, muted: ${t.muted}, solo: ${t.solo}, clips: ${t.clips.length})`
  ).join('\n');

  return `You are an AI assistant for Resonance DAW, a web-based digital audio workstation.

Current project: "${proj.name}"
Tempo: ${proj.bpm} BPM
Tracks:
${tracks || '(none)'}

You can control the DAW using this DSL format (one command per line):
TRACK CREATE name="Name"
TRACK DELETE id="uuid"
TRACK MUTE id="uuid"
TRACK SOLO id="uuid"
TRACK VOLUME id="uuid" value=0.8
TRACK PAN id="uuid" value=-0.3
CLIP CREATE track="uuid" start=0 duration=4
CLIP DELETE track="uuid" clip="uuid"
TRANSPORT PLAY
TRANSPORT STOP
TRANSPORT SET_TEMPO bpm=128

Respond naturally to the user, then include any commands on separate lines.
If the user just wants to chat, no commands needed.`;
}
