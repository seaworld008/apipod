import { Container } from "@/components/container";
import { notFound } from "next/navigation";

export default function FeaturesPage() {
  notFound();
  return <Container className="py-12" />;
}
