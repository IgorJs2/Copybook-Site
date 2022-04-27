import React from 'react'

const File_Download = ({ src, UI, currentLang }) => {
  return (
    <a className={UI} href={'/api/file/download/' + src}>
      <i class="bx bxs-file-import"></i>
    </a>
  )
}

export default File_Download
