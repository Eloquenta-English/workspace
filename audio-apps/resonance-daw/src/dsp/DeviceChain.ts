// ─── AudioDevice Interface & DeviceChain ───
// Manages an ordered chain of audio devices for a track.

export interface AudioDevice {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  connect(destination: AudioNode): void;
  disconnect(): void;
  dispose(): void;
  toJson(): Record<string, unknown>;
}

export class DeviceChain {
  id: string;
  name: string;
  devices: AudioDevice[] = [];
  private inputGain: GainNode;
  private outputGain: GainNode;
  private _disposed = false;

  constructor(public ctx: AudioContext, name = 'Device Chain') {
    this.id = `chain_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    this.name = name;
    this.inputGain = ctx.createGain();
    this.outputGain = ctx.createGain();
  }

  /** Add a device at the specified index (or end if not specified). */
  addDevice(device: AudioDevice, index?: number): void {
    if (index !== undefined && index >= 0 && index <= this.devices.length) {
      this.devices.splice(index, 0, device);
    } else {
      this.devices.push(device);
    }
  }

  /** Remove a device by ID. */
  removeDevice(deviceId: string): void {
    const idx = this.devices.findIndex((d) => d.id === deviceId);
    if (idx !== -1) {
      const device = this.devices[idx];
      device.dispose();
      this.devices.splice(idx, 1);
    }
  }

  /** Get a device by ID. */
  getDevice(deviceId: string): AudioDevice | undefined {
    return this.devices.find((d) => d.id === deviceId);
  }

  /** Wire all enabled devices in series: input → device1 → device2 → ... → output. */
  connect(input: AudioNode, output: AudioNode): void {
    // Disconnect existing connections first
    this.disconnect();

    // Filter to enabled devices only
    const activeDevices = this.devices.filter((d) => d.enabled);

    if (activeDevices.length === 0) {
      // No devices, wire input directly to output
      this.inputGain.connect(output);
      return;
    }

    // Wire: input → inputGain → device[0] → device[1] → ... → device[n] → outputGain → output
    this.inputGain.connect(activeDevices[0] as unknown as AudioNode);

    for (let i = 0; i < activeDevices.length - 1; i++) {
      (activeDevices[i] as unknown as AudioNode).connect(activeDevices[i + 1] as unknown as AudioNode);
    }

    (activeDevices[activeDevices.length - 1] as unknown as AudioNode).connect(this.outputGain);
    this.outputGain.connect(output);
  }

  /** Disconnect all devices in the chain. */
  disconnect(): void {
    try {
      this.inputGain.disconnect();
    } catch {
      // already disconnected
    }

    for (const device of this.devices) {
      try {
        device.disconnect();
      } catch {
        // already disconnected
      }
    }

    try {
      this.outputGain.disconnect();
    } catch {
      // already disconnected
    }
  }

  /** Dispose all devices and clean up. */
  dispose(): void {
    if (this._disposed) return;
    this._disposed = true;

    for (const device of this.devices) {
      device.dispose();
    }
    this.devices = [];

    try {
      this.inputGain.disconnect();
      this.outputGain.disconnect();
    } catch {
      // already disconnected
    }
  }

  /** Serialize the chain to JSON. */
  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      devices: this.devices.map((d) => d.toJson()),
    };
  }

  /** Deserialize a chain from JSON. Note: device reconstruction requires a registry. */
  fromJson(data: Record<string, unknown>, deviceRegistry?: (type: string, json: Record<string, unknown>) => AudioDevice | null): void {
    if (typeof data.id === 'string') this.id = data.id;
    if (typeof data.name === 'string') this.name = data.name;

    // Dispose existing devices
    for (const device of this.devices) {
      device.dispose();
    }
    this.devices = [];

    if (Array.isArray(data.devices) && deviceRegistry) {
      for (const deviceJson of data.devices) {
        const dj = deviceJson as Record<string, unknown>;
        const type = dj.type as string;
        const device = deviceRegistry(type, dj);
        if (device) {
          this.devices.push(device);
        }
      }
    }
  }
}
