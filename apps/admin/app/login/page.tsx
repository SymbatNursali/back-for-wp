export default function LoginPage() {
  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <section style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '360px' }}>
        <h1>Admin login</h1>
        <p>
          Set cookie <code>admin_session</code> to access protected routes.
        </p>
      </section>
    </main>
  );
}
