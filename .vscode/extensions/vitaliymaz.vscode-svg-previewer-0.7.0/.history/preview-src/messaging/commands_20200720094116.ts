import messageBroker from './'

class Commands {
  changeBoundingBoxVisibility (visible: boolean) {
    messageBroker.send({
      command: 'changeBoundingBoxVisibility',
      payload: { visible }
    })
    console.log('sent', visible);
  }
}

export default new Commands()
