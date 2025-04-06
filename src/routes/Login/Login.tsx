import { useCallback, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { API } from '../../api/api';
import { useLoginStore } from '../../store/login';

const Login = () => {
  const navigate = useNavigate()
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus)

  const handleFormSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()
    const currentTarget = event.currentTarget as HTMLFormElement
    const email = (currentTarget.elements.namedItem('email') as HTMLInputElement).value
    const password = (currentTarget.elements.namedItem('password') as HTMLInputElement).value

    const { data, error } = await API.login({ email, password });
    if (error) {
      console.error(error)
      return
    }
    setLoginStatus(data)
    navigate('/')

  }, [setLoginStatus, navigate]);

  return (
    <section>
      <form
        onSubmit={handleFormSubmit}
        className="w-120 p-10 m-auto text-gray-700 flex flex-col border-1 border-gray-300 rounded-md bg-gray-50">
        <h2
          className="p-2 text-center text-3xl">Login</h2>
        <div
          className="p-2 m-auto">
          <label htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            required
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
            className="ml-2 bg-gray-50 border-1 border-gray-300 rounded-md" />
        </div>
        <input
          type="submit"
          value="Login"
          className="w-50 m-auto bg-gray-50 border-1 border-gray-300 rounded-md" />
      </form>
    </section>
  )
}

export { Login }
