import { Container } from "@/components/container";
import { notFound } from "next/navigation";

export default function BlogPage() {
  notFound();
  return <Container className="py-12" />;
}
