export const metadata = {
  title: 'Farmacia Mozart — Studio',
  description: 'Pannello di gestione contenuti Farmacia Mozart',
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
