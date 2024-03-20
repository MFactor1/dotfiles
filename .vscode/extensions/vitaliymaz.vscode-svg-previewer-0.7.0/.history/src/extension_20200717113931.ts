import * as vscode from 'vscode'
import TelemetryReporter from 'vscode-extension-telemetry'

import { SvgContentProvider } from './features/previewContentProvider'
import { PreviewManager } from './features/previewManager'
import { PreviewEditorProvider } from './features/previewEditor'

import { CommandManager } from './commandManager'
import * as commands from './commands'

import { createTelemetryReporter, TelemetryEvents } from './telemetry'

let telemetryReporter: TelemetryReporter

export function activate (context: vscode.ExtensionContext) {
  console.log('activate start');
  vscode.workspace.getConfiguration('svg').update('preview.boundingBox', true, true)
    .then(res => {
      console.log('config changed', res);
    })
    .catch(err => {
      console.log('config err', err)
    });

  telemetryReporter = createTelemetryReporter()

  telemetryReporter.sendTelemetryEvent(TelemetryEvents.TELEMETRY_EVENT_ACTIVATION)

  const contentProvider = new SvgContentProvider(context.extensionPath)
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('svg-preview', contentProvider))

  const previewManager = new PreviewManager(context.extensionPath, telemetryReporter)
  vscode.window.registerWebviewPanelSerializer('svg-preview', previewManager)

  const commandManager = new CommandManager()

  commandManager.register(new commands.ShowPreviewToSideCommand(previewManager, telemetryReporter))
  commandManager.register(new commands.ShowPreviewCommand(previewManager, telemetryReporter))
  commandManager.register(new commands.ShowSourceCommand(previewManager, telemetryReporter))

  context.subscriptions.push(commandManager)

  context.subscriptions.push(PreviewEditorProvider.register(telemetryReporter))
}

export function deactivate () {
  telemetryReporter.dispose()
}
