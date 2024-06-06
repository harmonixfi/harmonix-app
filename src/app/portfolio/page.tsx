import PortfolioTemplate from '@/components/portfolio/PortfolioTemplate';
import Page from '@/components/shared/Page';

export default async function Portfolio() {
  return (
    <Page title="Portfolio">
      <PortfolioTemplate />
    </Page>
  );
}
