import ServiceClient from "./service-client";

// This part tells Vercel which pages to "pre-cook" for the iPhone app
export async function generateStaticParams() {
  const ids = ["police", "consumer", "cyber", "itr", "gst", "challan", "registration", "ipo"];
  return ids.map((id) => ({ id }));
}

// This part takes the service ID and gives it to the UI file above
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ServiceClient id={id} />;
}