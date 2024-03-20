import TelemetryReporter from 'vscode-extension-telemetry'

import * as events from './events'

const extensionId = require('../../package.json').name
const extensionVersion = require('../../package.json').version
const key = Buffer.from('NmE1MjFkYmYtYWEzOS00Y2QzLWEwMGMtZGFlMTQ5NzI5YzYz', 'base64').toString()

export function createTelemetryReporter () : TelemetryReporter | any {
  // return new TelemetryReporter(extensionId, extensionVersion, key)
  return {
    sendTelemetryEvent(event, payload = {}) {
      console.log('sendTelemetry', event, JSON.stringify(payload));
    }
  };
}

export const TelemetryEvents = events
