import messageBroker from './'

const TELEMETRY_EVENT_ZOOM = 'zoom'

class Commands {
    changeBoundingBoxVisibility (visible,) {
    messageBroker.send({
      command: 'changeBoundingBoxVisibility',
      payload: {
        
        eventName: TELEMETRY_EVENT_ZOOM,
        properties: { type, source }
      }
    })
  }
}

export default new Commands()
