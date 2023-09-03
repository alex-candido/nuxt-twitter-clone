const useNotifications = async (userId: string) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/notifications/${userId}`,
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

export default useNotifications
