export const metadata = {
  title: 'Farmacia Mozart — Studio',
  description: 'Pannello di gestione contenuti Farmacia Mozart',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: 0, height: '100vh' }}>{children}</div>
  );
}
