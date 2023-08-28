/* eslint-disable object-shorthand */

import { CurrentUser } from '../types/user'

interface SetLikePayloadInterface {
  postId: string
  method: any
  currentUser: CurrentUser | null
}

const useSetLike = async ({
  postId,
  currentUser,
  method,
}: SetLikePayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/like`,
    {
      method: method,
      body: { postId: postId, isCurrentUser: currentUser },
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

export default useSetLike
