const useUsers = async () => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/users`,
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

export default useUsers
