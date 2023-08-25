const usePost = (postId: string) => {
  const { data, error, execute, pending, refresh, status } = useFetch(
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
