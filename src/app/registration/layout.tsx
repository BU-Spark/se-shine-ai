export default function RegistrationLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px"}}>
        {children}
      </section>
    )
  }