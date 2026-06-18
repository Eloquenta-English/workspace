# Resonance DAW

A web-based digital audio workstation inspired by [MAGDA](https://github.com/Conceptual-Machines/magda-core) (Multi-Agent Digital Audio). Built with TypeScript, React, Zustand, and the Web Audio API.

## Features

- **Hybrid tracks** — every track hosts both audio and MIDI clips
- **Three views** — Arrangement, Session, and Mix
- **AI chat assistant** — natural language commands via OpenRouter (BYOAK)
- **Device chain** — synth, reverb, delay, EQ, compressor per track
- **Rack system** — parallel processing chains, fully nestable
- **Modulation matrix** — 16 LFOs + 16 macro knobs per device
- **Piano roll** — MIDI note editor with velocity and CC lanes
- **Drum grid** — 16-pad drum trigger
- **Mixer** — faders, pan, mute, solo, sends, level meters
- **Collapsible panels** — Inspector (left), Browser (right), Editor (bottom)

## Tech Stack

- TypeScript (strict)
- Vite (build tool)
- React 18 (UI framework)
- Zustand (state management)
- SCSS (styling)
- Web Audio API (audio engine)
- AudioWorklet (DSP processing)

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── index.ts              # App entry
├── engine/               # Audio engine, transport scheduler
├── state/                # Zustand store, types, selectors
├── dsp/                  # Audio devices, racks, modulation
│   ├── devices/          # Synth, reverb, delay, EQ, compressor, LFO, drum grid
│   ├── worklets/         # AudioWorklet processors
│   ├── DeviceChain.ts    # Device chain manager
│   ├── Rack.ts           # Parallel processing rack
│   └── ModulationMatrix.ts
├── ui/                   # React components
│   ├── arrangement/      # Timeline view
│   ├── session/          # Clip-launching grid
│   ├── mix/              # Mixer view
│   ├── editors/          # Piano roll, drum grid, automation
│   ├── panels/           # Inspector, browser, FX rack
│   └── shared/           # Knob, fader, meter, button
└── ai/                   # AI chat, command parser, agent system
```

## License

GPL-3.0 — see [LICENSE](LICENSE) for details.

## Acknowledgments

Inspired by [MAGDA](https://github.com/Conceptual-Machines/magda-core) by Conceptual Machines. MAGDA is © 2026 Conceptual Machines, GPL-3.0.
