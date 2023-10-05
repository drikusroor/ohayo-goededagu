import { MetaTags } from '@redwoodjs/web'

import TravelProgressBar from 'src/components/TravelProgressBar/TravelProgressBar'

const RoutePage = () => {
  return (
    <>
      <MetaTags title="Route" description="Route page" />
      <div className="w-full p-4">
        <iframe
          title="Route"
          src="https://www.google.com/maps/d/embed?mid=1ArsHjITlNvUl5SemqV6B5QmF6xmgqk8&ehbc=2E312F&noprof=1"
          className="aspect-[16/8] w-full"
        ></iframe>
        <TravelProgressBar />
      </div>
    </>
  )
}

export default RoutePage
