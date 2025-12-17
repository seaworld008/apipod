import { Container } from "@/components/container";
import { ModelsShell } from "@/features/models/models-shell";

export default async function ModelsPage() {
  return (
    <Container className="py-12">
      <ModelsShell basePath="" mode="list" />
    </Container>
  );
}
