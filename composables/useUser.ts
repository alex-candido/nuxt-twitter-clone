interface UseUserPayloadInterface {
  userId?: string
}

const useUser = async (userId: UseUserPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/users/${userId}`,
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

export default useUser
