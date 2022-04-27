export const disconnectHandler = async (ClassAction, dispatch, form) => {
  try {
    await ClassAction(dispatch, form, 'DISCONNECT_CLASS')
    return 0
  } catch (e) {
    throw new Error(error)
    return 0
  }
}
