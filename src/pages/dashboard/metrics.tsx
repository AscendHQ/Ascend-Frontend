import { Container } from "@/components/layout/dashboard";
import MetricsDashboard from "@/components/platform/metrics-dashboard";

export default function PlatformMetricsPage() {
  return (
    <Container headerTitle="Metrics">
      <MetricsDashboard />
    </Container>
  );
}
