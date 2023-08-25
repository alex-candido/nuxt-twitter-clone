const useUserPosts = (userId?: string) => {
  const { data, error, execute, pending, refresh, status } = useFetch(
    `/api/posts/user?userId=${userId}`,
    { method: 'GET' },
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

export default useUserPosts
