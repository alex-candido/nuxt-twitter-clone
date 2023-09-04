import formidable, { Fields, Files } from 'formidable'
import PersistentFile from 'formidable/PersistentFile'
// import { updatedUserEdit } from '../db/users'

export interface FieldsProps {
  name?: string
  username?: string
  bio: string
}

// export interface ImageProps {
//   size: number
//   filepath: string
//   newFilename: string
//   mimetype: string
//   mtime: string
//   originalFilename: string
// }

interface FilesProps {
  media_file_profile_0: PersistentFile
  media_file_cover_0: PersistentFile
}

interface FormidableProps {
  fields: Fields | FieldsProps
  files: Files | FilesProps
}

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method !== 'PATCH') {
    return sendError(
      event,
      createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }),
    )
  }

  const form = formidable({})

  const { fields, files }: FormidableProps = await new Promise(
    (resolve, reject) => {
      form.parse(event.node.req, (err, fields: Fields, files: Files) => {
        if (err) {
          reject(err)
        }
        resolve({ fields, files })
      })
    },
  )

  try {
    console.log({ method, fields, files })
    // const updatedUser = await updatedUserEdit()
    return { method }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
