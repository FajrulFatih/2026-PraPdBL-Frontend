export default function PageWrapper({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="page-wrapper">
      <h1>{title}</h1>
      {children}
    </section>
  )
}