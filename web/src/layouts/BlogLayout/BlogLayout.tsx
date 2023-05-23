type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <>
      <header className="w-full pb-5 pt-3 text-center">
        <h1 className="text-2xl">Ohayou Goededagu</h1>
        <pre>Collectieve reisblog voor de reis van 2023 naar Japan.</pre>
      </header>
      <main className="mx-auto max-w-xl">{children}</main>
    </>
  )
}

export default BlogLayout
