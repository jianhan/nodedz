"use strict";
module.exports = function (app, passport) {
    app.use('/api/v1', require('./auth')(app, passport));
};
//# sourceMappingURL=api.js.map