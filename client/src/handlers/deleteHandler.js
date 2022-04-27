export const deleteHandler = async (ClassAction, dispatch, form) => {
  try {
    await ClassAction(dispatch, form, 'DELETE_CLASS')
    return 0
  } catch (e) {
    throw new Error(error)
    return 0
  }
}
