export const changeHandler = (setForm, form, event) => {
  if (event.value) {
    setForm({ ...form, [event.name]: event.value })
  } else if (event.target) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  return 0
}
