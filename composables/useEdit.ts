interface EditPayloadInterface {
  name: string
  username: string
  bio: string
  profileImage: string
  coverImage: string
}

const useEdit = async ({
  name,
  username,
  bio,
  profileImage,
  coverImage,
}: EditPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    '/api/edit',
    {
      method: 'PATCH',
      body: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    },
  )

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
