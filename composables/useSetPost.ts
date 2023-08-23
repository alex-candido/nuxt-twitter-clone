interface UsersPayloadInterface {
  id?: string
  url: string
  text: string
}

const useSetPost = async ({ url, text, id }: UsersPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    url,
    {
      method: 'POST',
      body: {
        id,
        text,
      },
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

export default useSetPost
