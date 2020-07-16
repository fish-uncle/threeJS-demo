const path = require('path');
module.exports = {
  dev: {
    template: path.join(__dirname, './index-dev.html')
  },
  prod: {
    template: path.join(__dirname, './index-prod.html')
  },
};
