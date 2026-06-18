// ─── DSP Barrel Export ───

export { SynthVoice } from './devices/SynthVoice';
export type { SynthParams, OscType } from './devices/SynthVoice';

export { Filter } from './devices/Filter';
export type { FilterBand, FilterBandType } from './devices/Filter';

export { Reverb } from './devices/Reverb';
export type { ReverbParams } from './devices/Reverb';

export { Delay } from './devices/Delay';
export type { DelayParams } from './devices/Delay';

export { Compressor } from './devices/Compressor';
export type { CompressorParams } from './devices/Compressor';

export { LFO } from './devices/LFO';
export type { LfoParams, LfoWaveform } from './devices/LFO';

export { DeviceChain } from './DeviceChain';
export type { AudioDevice } from './DeviceChain';

export { Rack } from './Rack';
export type { RackChain } from './Rack';

export { ModulationMatrix } from './ModulationMatrix';
export type { ModulationRoute, MacroKnob } from './ModulationMatrix';
