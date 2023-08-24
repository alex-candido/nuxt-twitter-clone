const usePosts = async () => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    '/api/posts',
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

export default usePosts
