const {toMatchImageSnapshot} = require('jest-image-snapshot');

expect.extend({toMatchImageSnapshot});

// yarn test:integration
//yarn run jest:integration --updateSnapshot