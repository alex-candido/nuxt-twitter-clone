interface UserPayloadInterface {
  userId: string | null | undefined
}

const useUser = async ({ userId }: UserPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/users/${userId}`,
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

export default useUser
