(function() {
    'use strict';

    class BaseController {
        constructor(model, key) {
            this.model = model;
            this.key = key;

            this.modelName = this.model.modelName.toLowerCase();
        }

        create(data) {
            return this.model
                .create(data)
                .then(instance => {
                    var response = {};
                    response[this.modelName] = instance;
                    return response;
                });
        }

        read(id) {
            var filter = {};
            filter[this.key] = id;

            return this.model
                .findOne(filter)
                .then(instance => {
                    var response = {};
                    response[this.modelName] = instance;
                    return response;
                });
        }

        //update(id, data)

        delete(id) {
            var filter = {};
            filter[this.key] = id;

            return this.model
                .remove(filter)
                .then(() => {});
        }
    }

    module.exports = BaseController;

}());
