const usePosts = () => {
  const { data, error, execute, pending, refresh, status } = useFetch(
    '/api/posts',
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

export default usePosts
