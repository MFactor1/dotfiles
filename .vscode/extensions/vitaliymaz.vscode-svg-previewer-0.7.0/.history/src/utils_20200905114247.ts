import * as vscode from 'vscode'

export function isSvgUri (uri: vscode.Uri) {
  return uri.path.endsWith('.svg')
}

export function getUpdateWebViewMessage (uri: vscode.Uri) {
  const document = await vscode.workspace.openTextDocument(uri)
  const showBoundingBox = <boolean>vscode.workspace.getConfiguration('svg').get('preview.boundingBox')
  const showTransparencyGrid = <boolean>vscode.workspace.getConfiguration('svg').get('preview.transparencyGrid')
  
  return updatePreview({
    uri: uri.toString(),
    data: document.getText(),
    settings: { showBoundingBox, showTransparencyGrid }
  })
}