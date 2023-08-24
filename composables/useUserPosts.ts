interface UsePostsPayloadInterface {
  userId?: string
}

const useUserPosts = async (userId?: UsePostsPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `api/posts/user?userId=${userId}`,
    { method: 'GET' },
  )

  console.log(data.value)

  return {
    data: data.value,
    error,
    execute,
    pending,
    refresh,
    status,
  }
}

export default useUserPosts
