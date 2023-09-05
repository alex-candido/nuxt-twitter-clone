import formidable, { Fields, Files } from 'formidable'
import {
  CloudinaryResourceProps,
  FormidableProps,
  ImageProps,
} from '../../types/edit'
import { getUserById, updatedUserEdit } from '../db/users'
import { uploadToCloudinary } from '../libs/cloudinary'

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

  const user = await getUserById(fields.userId as string)

  try {
    if (files.media_file_profile_0 && !files.media_file_cover_0) {
      const filePromises = Object.keys(files).map(async (index) => {
        const filter = files[
          index as keyof typeof files
        ] as unknown as ImageProps

        const cloudinaryResource = (await uploadToCloudinary(
          filter.filepath,
        )) as CloudinaryResourceProps

        return {
          url: cloudinaryResource.secure_url,
          providerPublicId: cloudinaryResource.public_id,
          originalFilename: filter.originalFilename,
          newFilename: filter.newFilename,
        }
      })

      const filePromisesData = {
        profileImage: await filePromises[0],
      }

      const dataImages = {
        profileImage: ('' as string) || undefined,
        coverImage: ('' as string) || undefined,
      }

      if (filePromisesData) {
        if (files.media_file_profile_0) {
          dataImages.profileImage =
            (filePromisesData.profileImage.url as string) || undefined
          dataImages.coverImage = user.coverImage || ''
        }
      }

      const updatedUser = await updatedUserEdit({
        userId: fields.userId as string,
        name: fields.name as string,
        username: fields.username as string,
        bio: fields.bio as string,
        profileImage: dataImages.profileImage as string,
        coverImage: dataImages.coverImage as string,
      })

      console.log(updatedUser)
      return updatedUser
    }

    if (files.media_file_cover_0 && !files.media_file_profile_0) {
      const filePromises = Object.keys(files).map(async (index) => {
        const filter = files[
          index as keyof typeof files
        ] as unknown as ImageProps

        const cloudinaryResource = (await uploadToCloudinary(
          filter.filepath,
        )) as CloudinaryResourceProps

        return {
          url: cloudinaryResource.secure_url,
          providerPublicId: cloudinaryResource.public_id,
          originalFilename: filter.originalFilename,
          newFilename: filter.newFilename,
        }
      })

      const filePromisesData = {
        coverImage: await filePromises[0],
      }

      const dataImages = {
        profileImage: ('' as string) || undefined,
        coverImage: ('' as string) || undefined,
      }

      if (filePromisesData) {
        if (files.media_file_cover_0) {
          dataImages.profileImage = user.profileImage || ''
          dataImages.coverImage =
            (filePromisesData.coverImage.url as string) || undefined
        }
      }

      const updatedUser = await updatedUserEdit({
        userId: fields.userId as string,
        name: fields.name as string,
        username: fields.username as string,
        bio: fields.bio as string,
        profileImage: dataImages.profileImage as string,
        coverImage: dataImages.coverImage as string,
      })

      console.log(updatedUser)
      return updatedUser
    }

    if (files.media_file_cover_0 && files.media_file_profile_0) {
      const filePromises = Object.keys(files).map(async (index) => {
        const filter = files[
          index as keyof typeof files
        ] as unknown as ImageProps

        const cloudinaryResource = (await uploadToCloudinary(
          filter.filepath,
        )) as CloudinaryResourceProps

        return {
          url: cloudinaryResource.secure_url,
          providerPublicId: cloudinaryResource.public_id,
          originalFilename: filter.originalFilename,
          newFilename: filter.newFilename,
        }
      })

      const filePromisesData = {
        profileImage: await filePromises[0],
        coverImage: await filePromises[1],
      }

      const dataImages = {
        profileImage: ('' as string) || undefined,
        coverImage: ('' as string) || undefined,
      }

      if (filePromisesData) {
        if (files.media_file_cover_0 && files.media_file_profile_0) {
          dataImages.profileImage =
            (filePromisesData.profileImage.url as string) || undefined
          dataImages.coverImage =
            (filePromisesData.coverImage.url as string) || undefined
        }
      }

      const updatedUser = await updatedUserEdit({
        userId: fields.userId as string,
        name: fields.name as string,
        username: fields.username as string,
        bio: fields.bio as string,
        profileImage: dataImages.profileImage as string,
        coverImage: dataImages.coverImage as string,
      })

      console.log(updatedUser)
      return updatedUser
    }
  } catch (error) {
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: 'Internal Server Error' }),
    )
  }
})
