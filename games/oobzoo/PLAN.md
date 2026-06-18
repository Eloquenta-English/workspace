# OobzoO DAW — Comprehensive Development Plan

## Reference: BandLab Feature Analysis
Based on https://www.audeobox.com/learn/bandlab/

### BandLab Core Features:
1. **Drum Programming** — Step sequencer, drum pads, pattern-based beat making
2. **Melodic Programming** — MIDI piano roll, note editing, quantization
3. **Loop Library** — Pre-made loops, samples, sound packs
4. **Import Audio** — Drag & drop audio files, sample import
5. **Core Effects** — EQ, compression, reverb, delay, distortion, chorus, phaser
6. **Mixing** — Multi-track mixer, panning, volume, solo/mute, sends
7. **Collaboration** — Fork, share, real-time collaboration
8. **Automation** — Parameter automation over time
9. **Arrangement** — Song sections, copy/paste, timeline
10. **Export** — WAV, MP3, stems
11. **Templates** — Project templates, starting points
12. **Layering** — Stacking sounds, layering techniques
13. **Keyboard Shortcuts** — Efficiency workflow
14. **Reference Listening** — A/B comparison

---

## OobzoO Development Plan — Phased Approach

### PHASE 1: Core Synth & Sound Engine (Current → Week 1)
**Goal: Make the built-in synth fully functional and testable**

#### Task 1.1: Fix Current Synth Panel
- Verify all synth knobs render and respond to drag
- Test oscillator waveforms (saw/square/triangle/sine)
- Test filter cutoff/resonance
- Test ADSR envelope (attack/decay/sustain/release)
- Test piano keyboard click and keyboard mapping
- Test synth routing to Track 3 mixer chain
- **Test:** Play notes, hear sound through mixer, adjust EQ/FX on Track 3

#### Task 1.2: Add Sub-Oscillator & Noise Generator
- Add sub-oscillator (square wave, -1 octave) with level knob
- Add noise generator (white/pink) with level knob
- Add oscillator mix controls
- **Test:** Blend sub-osc and noise with main oscillator

#### Task 1.3: Add LFO Section
- Add LFO with rate, depth, waveform selector
- Add LFO targets: pitch, filter cutoff, amplitude
- Add LFO sync to BPM option
- **Test:** Modulate filter cutoff with LFO, hear wobble effect

#### Task 1.4: Add Polyphony & Voice Management
- Support up to 8 simultaneous voices
- Add voice mode: poly/mono/legato
- Add portamento/glide control
- **Test:** Play chords in poly mode, play legato lines in mono mode

---

### PHASE 2: Sampler & Audio Import (Week 2)
**Goal: Import and manipulate audio samples**

#### Task 2.1: Audio File Import
- Drag & drop audio file import (WAV, MP3, OGG)
- File browser in explorer panel
- Audio file preview/playback
- **Test:** Import a drum loop, hear it play back

#### Task 2.2: Sampler Instrument
- Load audio sample into sampler
- Play sample across keyboard (pitch shifting)
- Sample start/end/loop controls
- ADSR envelope for sample playback
- **Test:** Load a vocal sample, play it across the keyboard

#### Task 2.3: Sample Slicing
- Auto-detect transients in audio
- Slice sample at transient points
- Map slices to individual pads/keys
- **Test:** Slice a drum loop, trigger individual hits

#### Task 2.4: Loop Player
- Import loop files with BPM detection
- Auto-stretch loops to project BPM
- Loop start/end/crossfade controls
- **Test:** Import a 120BPM loop, play at project tempo

---

### PHASE 3: Step Sequencer & Drum Machine (Week 3)
**Goal: Pattern-based beat programming**

#### Task 3.1: Step Sequencer Grid
- 16-step grid per track
- 8 pattern slots per track
- Pattern chaining/sequencing
- Step velocity and probability
- **Test:** Program a basic 4-on-the-floor kick pattern

#### Task 3.2: Drum Pad Mode
- 16 velocity-sensitive pads per track
- Pad color coding
- Note repeat/roll function
- **Test:** Tap pads to trigger drum sounds

#### Task 3.3: Note Repeat & Roll
- Hold pad for note repeat
- Adjustable repeat rate (1/4, 1/8, 1/16, 1/32)
- Roll function for fills
- **Test:** Hold a hi-hat pad, hear rapid repeats

#### Task 3.4: Pattern Variations
- Create pattern variations (A/B/C/D)
- Pattern mute/solo
- Pattern copy/paste
- **Test:** Create verse and chorus patterns, chain them

---

### PHASE 4: Piano Roll & MIDI Editor (Week 4)
**Goal: Visual note editing and composition**

#### Task 4.1: Piano Roll Grid
- Vertical piano keyboard (C2-C6)
- Horizontal time grid (bars/beats/sixteenths)
- Note blocks with drag to position/resize
- **Test:** Draw notes on the grid, play back

#### Task 4.2: Note Editing Tools
- Draw mode, select mode, erase mode
- Note copy/paste/duplicate
- Note velocity editing (per-note)
- Quantize notes to grid
- **Test:** Draw a melody, quantize it, adjust velocities

#### Task 4.3: MIDI Import/Export
- Import MIDI files
- Export project as MIDI
- MIDI file parsing and mapping
- **Test:** Import a MIDI file, hear it play through synth

#### Task 4.4: Scale & Chord Assistance
- Scale highlighting on piano roll
- Chord suggestions
- Arpeggiator mode
- **Test:** Enable scale mode, see highlighted notes

---

### PHASE 5: Effects Rack (Week 5)
**Goal: Comprehensive effects processing**

#### Task 5.1: Built-in Effects (per track)
- 3-band EQ (low/mid/high) ✓ (exists, needs improvement)
- Compressor with visual gain reduction ✓ (exists)
- Reverb (algorithmic + IR) ✓ (exists)
- Delay (time-based, ping-pong) ✓ (exists)
- Distortion/Overdrive/Saturation ✓ (exists)
- Chorus/Flanger/Phaser ✓ (exists)
- Tremolo/Pan modulation ✓ (exists)
- Bitcrusher ✓ (exists)
- Limiter ✓ (exists)
- Noise Gate ✓ (exists)
- **Test:** Chain multiple effects, hear the result

#### Task 5.2: Send/Return FX
- Create send tracks (FX returns)
- Route any track to send
- Send level per track
- **Test:** Create a reverb send, route multiple tracks to it

#### Task 5.3: Master Bus Effects
- Master EQ
- Master Compressor/Limiter
- Stereo width control
- **Test:** Apply master limiting, hear loudness increase

#### Task 5.4: Effect Presets
- Save/load effect presets
- Factory presets for common sounds
- User preset library
- **Test:** Save a "warm pad" preset, recall it later

---

### PHASE 6: Mixer & Routing (Week 6)
**Goal: Professional mixing console**

#### Task 6.1: Channel Strip Improvements
- Input gain with metering
- Phase invert switch
- Stereo/mono switch
- Channel color coding
- **Test:** Route audio through channel, verify all controls

#### Task 6.2: Group/Bus Tracks
- Create group tracks
- Route tracks to groups
- Group fader and mute
- **Test:** Group all drums, control with one fader

#### Task 6.3: Sidechain Compression
- Sidechain input selector per compressor
- Ducking (volume sidechain)
- **Test:** Sidechain kick to bass, hear pumping effect

#### Task 6.4: Mixer Automation
- Record mixer moves (fader, pan, mute)
- Automation lanes per parameter
- Automation curve editing
- **Test:** Record a fader sweep, play it back

---

### PHASE 7: Arrangement & Timeline (Week 7)
**Goal: Song structure and arrangement**

#### Task 7.1: Arrangement Timeline
- Horizontal timeline with bars/beats
- Track lanes with clip blocks
- Clip drag, copy, paste, split
- **Test:** Arrange clips into a song structure

#### Task 7.2: Song Sections
- Define sections (Intro, Verse, Chorus, Bridge, Outro)
- Section markers on timeline
- Section-based playback
- **Test:** Mark sections, jump between them

#### Task 7.3: Clip Launcher (Session View)
- Grid of clips per track
- Launch clips independently
- Scene launching (row of clips)
- **Test:** Launch different clips, build arrangement live

#### Task 7.4: Arrangement Recording
- Record clip launches into arrangement
- Overdub mode
- Punch in/out recording
- **Test:** Record a live clip launch session

---

### PHASE 8: Project Management (Week 8)
**Goal: Save, load, organize projects**

#### Task 8.1: Project Save/Load
- Save project to localStorage
- Save project as JSON file
- Load project from file
- **Test:** Create a project, save it, reload page, load project

#### Task 8.2: Project Templates
- Factory templates (Empty, Beat, Song, Podcast)
- Save custom templates
- Template browser
- **Test:** Start from a template, verify it loads correctly

#### Task 8.3: Audio Export
- Export mixdown to WAV
- Export stems (per-track)
- Export to MP3 (if encoder available)
- **Test:** Export a mix, verify audio file plays

#### Task 8.4: Undo/Redo System
- Full undo/redo history
- Keyboard shortcuts (Ctrl+Z / Ctrl+Shift+Z)
- History panel
- **Test:** Make changes, undo them, redo them

---

### PHASE 9: UI/UX Polish (Week 9)
**Goal: Professional, responsive interface**

#### Task 9.1: Responsive Layout
- Collapsible panels
- Mobile-friendly touch controls
- Resizable mixer channels
- **Test:** Resize window, verify layout adapts

#### Task 9.2: Dark/Light Theme
- Theme selector
- Consistent color scheme
- High contrast mode
- **Test:** Switch themes, verify all elements update

#### Task 9.3: Keyboard Shortcuts
- Comprehensive shortcut map
- Shortcut help overlay (press ?)
- Customizable shortcuts
- **Test:** Use shortcuts for common actions

#### Task 9.4: Tooltips & Help
- Hover tooltips on all controls
- Context-sensitive help
- Onboarding tutorial
- **Test:** Hover over controls, see tooltips

---

### PHASE 10: Advanced Features (Week 10)
**Goal: Power-user features**

#### Task 10.1: Spectral Analyzer
- Real-time frequency spectrum display
- Per-track and master
- **Test:** Play audio, see spectrum visualization

#### Task 10.2: Tuner & Metronome
- Instrument tuner
- Metronome with accent patterns
- Click track output
- **Test:** Enable metronome, hear click in time

#### Task 10.3: Recording
- Multi-track audio recording
- Input monitoring
- Recording arm per track
- **Test:** Record audio from mic onto a track

#### Task 10.4: Freeze & Bounce
- Freeze track to audio (CPU saving)
- Bounce selection to new track
- **Test:** Freeze a synth track, verify CPU reduction

---

## Testing Strategy

Each phase includes:
1. **Unit test** — Test the new feature in isolation
2. **Integration test** — Test how it interacts with existing features
3. **Regression test** — Verify existing features still work
4. **Performance test** — Check CPU/memory impact
5. **Mobile test** — Verify touch controls work

## File Structure
```
OobzoO/
├── index.html          (main app)
├── plan.md             (this file)
├── css/
│   ├── layout.css
│   ├── mixer.css
│   ├── synth.css
│   ├── sequencer.css
│   └── theme.css
├── js/
│   ├── audio-engine.js
│   ├── synth.js
│   ├── sampler.js
│   ├── sequencer.js
│   ├── piano-roll.js
│   ├── mixer.js
│   ├── effects.js
│   ├── arrangement.js
│   ├── project.js
│   └── ui.js
└── assets/
    ├── samples/
    ├── presets/
    └── icons/
```
