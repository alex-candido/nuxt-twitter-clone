import formidable, { Fields, Files } from 'formidable'
import PersistentFile from 'formidable/PersistentFile'
import { updatedUserEdit } from '../db/users'
import { uploadToCloudinary } from '../libs/cloudinary'

export interface mediaFileProps {
  url: string
  providerPublicId: string
}

interface CloudinaryResourceProps {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: []
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  original_filename: string
  api_key: string
}

export interface FieldsProps {
  userId: string
  name?: string
  username?: string
  bio: string
}

export interface ImageProps {
  size: number
  filepath: string
  newFilename: string
  mimetype: string
  mtime: string
  originalFilename: string
}

interface FilesProps {
  media_file_profile_0: PersistentFile | ImageProps
  media_file_cover_0: PersistentFile | ImageProps
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
    const filePromises = Object.keys(files).map(async (index) => {
      const filter = files[index as keyof typeof files] as unknown as ImageProps

      const cloudinaryResource = (await uploadToCloudinary(
        filter.filepath,
      )) as CloudinaryResourceProps

      return {
        url: cloudinaryResource.secure_url,
        providerPublicId: cloudinaryResource.public_id,
      }
    })

    const filePromisesData = {
      profileImage: await filePromises[0],
      coverImage: await filePromises[1],
    }

    const updatedUser = await updatedUserEdit({
      userId: fields.userId as string,
      name: fields.name as string,
      username: fields.username as string,
      bio: fields.bio as string,
      profileImage: filePromisesData.profileImage.url as string,
      coverImage: filePromisesData.coverImage.url as string,
    })

    console.log({ method, updatedUser })

    return { method, updatedUser }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
