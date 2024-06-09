/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'harmonix-app',
      removal: input?.stage === 'mainnet' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const isMainnet = $app.stage === 'mainnet';

    const appName = isMainnet ? 'HarmonixMainnetApp' : 'HarmonixTestnetApp';

    const domainName = isMainnet ? 'app.harmonix.fi' : 'testnet.harmonix.fi';
    const domainCertSecret = new sst.Secret('DomainCert');

    new sst.aws.Nextjs(appName, {
      domain: {
        name: domainName,
        dns: false,
        cert: domainCertSecret.value,
      },
    });
  },
});
