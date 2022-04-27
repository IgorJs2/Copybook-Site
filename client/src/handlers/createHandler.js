export const createHandler = async (ClassAction, dispatch, form) => {
  try {
    await ClassAction(dispatch, form, 'CREATE_CLASS')
    return 0
  } catch (e) {
    throw new Error(error)
    return 0
  }
}
