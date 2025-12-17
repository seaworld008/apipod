import { Container } from "@/components/container";
import { ModelsShell } from "@/features/models/models-shell";

export default async function ModelsPageZh() {
  return (
    <Container className="py-12">
      <ModelsShell basePath="/zh-CN" mode="list" />
    </Container>
  );
}
