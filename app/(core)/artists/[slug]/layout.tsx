import Gallery from '@components/gallery'

export default function Layout({
    children}
: Readonly<{children: React.ReactNode;}>) {
  return (
      <Gallery />
  );
}