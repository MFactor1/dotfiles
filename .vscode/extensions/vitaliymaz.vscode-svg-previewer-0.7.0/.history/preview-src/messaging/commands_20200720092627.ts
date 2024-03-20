import messageBroker from './'

const TELEMETRY_EVENT_ZOOM = 'zoom'

class Commands {
    changeBoundingBoxVisibility(visible: boolean) {
    messageBroker.send({
      command: 'changeBoundingBoxVisibility',
      payload: { visible }
    })
  }
}

export default new Commands()
