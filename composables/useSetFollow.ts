/* eslint-disable object-shorthand */

import { CurrentUser } from '../types/user'

interface SetFollowPayloadInterface {
  userId: string
  method: any
  currentUser: CurrentUser | null
}

const useSetFollow = async ({
  userId,
  currentUser,
  method,
}: SetFollowPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/follow`,
    {
      method: method,
      body: { userId: userId, isCurrentUser: currentUser },
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

export default useSetFollow
