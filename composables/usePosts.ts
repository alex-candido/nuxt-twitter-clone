interface UsePostsPayloadInterface {
  userId?: string
}

const usePosts = async (userId?: UsePostsPayloadInterface) => {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts'
  const { data, error, execute, pending, refresh, status } = await useFetch(url)

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

export default usePosts
