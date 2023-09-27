import { MetaTags } from '@redwoodjs/web'

const RoutePage = () => {
  return (
    <>
      <MetaTags title="Route" description="Route page" />
      <iframe
        title="Route"
        src="https://www.google.com/maps/d/embed?mid=1ArsHjITlNvUl5SemqV6B5QmF6xmgqk8&ehbc=2E312F&noprof=1"
        width="640"
        height="480"
      ></iframe>
    </>
  )
}

export default RoutePage
