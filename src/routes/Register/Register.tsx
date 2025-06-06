import { useState, useCallback, type FormEvent, ChangeEvent } from 'react'
import { useRegister } from '../../queryHooks/auth/useRegister'
import { useNavigate } from 'react-router'

const Register = () => {

  const navigate = useNavigate()
  const { mutation } = useRegister()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleFormSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (!email || !password) return false
    mutation.mutate({ email, password })
  }, [mutation, email, password]);

  const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
  }, [])

  const handlePasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
  }, [])

  if (mutation.isSuccess) {
    navigate('/')
  }

  return (
    <section>
      {mutation.isError && (
        <h2>There was an error</h2>
      )}
      <form
        onSubmit={handleFormSubmit}
        className="w-120 p-10 m-auto text-gray-700 flex flex-col border-1 border-gray-300 rounded-md bg-gray-50">
        <h2
          className="p-2 text-center text-3xl">Register</h2>
        <div
          className="p-2 m-auto">
          <label htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={handleEmailChange}
            className="ml-2 bg-gray-50 border-1 border-gray-300 rounded-md" />
        </div>
        <div
          className="p-2 m-auto">
          <label htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            required
            onChange={handlePasswordChange}
            className="ml-2 bg-gray-50 border-1 border-gray-300 rounded-md" />
        </div>
        <input
          type="submit"
          value="Register"
          className="w-50 m-auto bg-gray-50 border-1 border-gray-300 rounded-md" />
      </form>
    </section>
  )
}

export { Register }
