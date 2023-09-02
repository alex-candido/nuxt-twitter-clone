const useUserPosts = async ({
  userId,
}: {
  userId: string | null | undefined
}) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
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
