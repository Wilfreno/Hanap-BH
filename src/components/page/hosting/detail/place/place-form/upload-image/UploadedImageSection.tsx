export default function UploadedImageSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section className="aspect-video w-[45vw] h-auto bg-white border border-gray-300 rounded-lg shadow-inner">
      {children}
    </section>
  );
}
