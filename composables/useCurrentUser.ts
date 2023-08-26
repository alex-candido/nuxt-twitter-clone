const useCurrentUser = async () => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    '/api/current',
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

export default useCurrentUser
