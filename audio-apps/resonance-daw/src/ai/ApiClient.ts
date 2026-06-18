export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class AiClient {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor({ apiKey, model, baseUrl = 'https://openrouter.ai/api/v1' }: {
    apiKey: string;
    model: string;
    baseUrl?: string;
  }) {
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://resonance-daw.local',
        'X-Title': 'Resonance DAW',
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`API error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('No response content from API');
    return content;
  }
}
