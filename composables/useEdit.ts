interface EditPayloadInterface {
  userId?: string
  name?: string
  username?: string
  bio?: string
  profileImage?: any[]
  coverImage?: any[]
}

const useEdit = async ({
  userId,
  name,
  username,
  bio,
  profileImage,
  coverImage,
}: EditPayloadInterface) => {
  const form = new FormData()

  form.append('userId', userId || '')
  form.append('name', name || '')
  form.append('username', username || '')
  form.append('bio', bio || '')

  if (profileImage) {
    profileImage?.forEach((mediaFile, index) => {
      form.append('media_file_profile_' + index, mediaFile || [])
    })
  }

  if (coverImage) {
    coverImage?.forEach((mediaFile, index) => {
      form.append('media_file_cover_' + index, mediaFile || [])
    })
  }

  const { data, error, execute, pending, refresh, status } = await useFetch(
    '/api/edit',
    {
      method: 'PATCH',
      body: form,
    },
  )

  console.log({
    name,
    username,
    bio,
    profileImage,
    coverImage,
  })

  return {
    data: data.value,
    error,
    execute,
    pending,
    refresh,
    status,
  }
}

export default useEdit
