/* eslint-disable object-shorthand */

interface SetLikePayloadInterface {
  postId: string
}

const useTrash = async ({ postId }: SetLikePayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/trash`,
    {
      method: 'DELETE',
      body: { postId: postId },
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

export default useTrash
