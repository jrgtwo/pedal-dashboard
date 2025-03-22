import { Link } from 'react-router'

const Navigation = () => {

  return (
    <nav role="navigation"
      className="mt-5 mb-10">
      <ol
        className="flex flex-row justify-self-end gap-4">
        <li
          className="font-black hover:underline"><Link to="/">Home</Link></li>
        <li
          className="font-black hover:underline text-zinc-400"><Link to="/create">Create</Link></li>
        <li
          className="font-black hover:underline text-zinc-400"><Link to="/about">About</Link></li>
      </ol>
    </nav>
  )
}

export { Navigation }