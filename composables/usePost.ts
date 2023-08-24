const usePost = async (postId: string) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/posts/${postId}`,
    {
      method: 'GET',
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

export default usePost
