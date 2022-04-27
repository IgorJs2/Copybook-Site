export const customStylesForSelect = {
  container: (provided) => ({
    ...provided,
    width: 'max-content',
    minWidth: '100%',
    color: 'white',
    '&:hover': {
      background: 'red',
    },
  }),
  control: (base, state) => ({
    ...base,
    background: '#5380aa',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'white',
  }),
  option: (base) => ({
    ...base,
    background: '#5380aa',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: '#5380aa',
    padding: 0,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),
}
