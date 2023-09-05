export interface mediaFileProps {
  url: string
  providerPublicId: string
}

export interface CloudinaryResourceProps {
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
  profile: string
  cover: string
}

export interface ImageProps {
  size: number
  filepath: string
  newFilename: string
  mimetype: string
  mtime: string
  originalFilename: string
}

export interface FilesProps {
  media_file_profile_0: PersistentFile | ImageProps
  media_file_cover_0: PersistentFile | ImageProps
}

export interface FormidableProps {
  fields: Fields | FieldsProps
  files: Files | FilesProps
}
