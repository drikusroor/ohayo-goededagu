import { MetaTags } from '@redwoodjs/web'

const RoutePage = () => {
  return (
    <>
      <MetaTags title="Route" description="Route page" />
      <div className="h-[20rem] w-[20rem] p-4 sm:w-[35rem] md:h-5/6 md:w-[45rem] lg:w-[60rem]">
        <iframe
          title="Route"
          src="https://www.google.com/maps/d/embed?mid=1ArsHjITlNvUl5SemqV6B5QmF6xmgqk8&ehbc=2E312F&noprof=1"
          // width="640"
          // height="480"
          className="h-full w-full"
        ></iframe>
      </div>
    </>
  )
}

export default RoutePage
