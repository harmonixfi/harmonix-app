/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'rock-onyx-app',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    new sst.aws.Nextjs('HarmonixApp', {
      domain: {
        name: 'app.harmonix.fi',
        dns: false,
        cert: 'arn:aws:acm:us-east-1:211125391360:certificate/5dfcdc71-bf51-46c9-811d-d3f5089a17b0',
      },
    });
  },
});
