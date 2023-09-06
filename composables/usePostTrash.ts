/* eslint-disable object-shorthand */

interface SetPostTrashPayloadInterface {
  postId: string
}

const usePostTrash = async ({ postId }: SetPostTrashPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/posts/trash`,
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

export default usePostTrash
