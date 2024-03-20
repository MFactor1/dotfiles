import messageBroker from './'

class Commands {
  changeBoundingBoxVisibility (visible: boolean) {
    messageBroker.send({
      command: 'changeBoundingBoxVisibility',
      payload: { visible }
    })
  }
}

export default new Commands()
