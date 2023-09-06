/* eslint-disable object-shorthand */

interface SetPostTrashPayloadInterface {
  notificationId: string
}

const useNotificationTrash = async ({
  notificationId,
}: SetPostTrashPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    `/api/notifications/trash`,
    {
      method: 'DELETE',
      body: { notificationId: notificationId },
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

export default useNotificationTrash
