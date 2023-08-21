interface RegisterPayloadInterface {
  email: string
  password: string
  username: string
  name: string
}

const useRegister = async ({
  email,
  password,
  username,
  name,
}: RegisterPayloadInterface) => {
  const { data, error, execute, pending, refresh, status } = await useFetch(
    '/api/register',
    {
      method: 'POST',
      body: {
        email,
        password,
        username,
        name,
      },
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

export default useRegister
