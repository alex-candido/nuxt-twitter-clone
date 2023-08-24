const usePost = async (postId: string) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/posts/${postId}`,
    {
      method: 'GET',
    },
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

export default usePost
