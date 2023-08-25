/* eslint-disable object-shorthand */

interface SetLikePayloadInterface {
  postId: string
  method: any
}

const useSetLike = async ({ postId, method }: SetLikePayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/like`,
    { method: method, body: postId },
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

export default useSetLike
