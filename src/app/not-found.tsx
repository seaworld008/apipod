import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-semibold">404</h1>
      <h2 className="mt-3 text-xl font-medium">Page Not Found</h2>
      <p className="mt-2 text-foreground/70">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-6">
        <Link
          className="inline-flex h-10 items-center rounded-md bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    </Container>
  );
}
