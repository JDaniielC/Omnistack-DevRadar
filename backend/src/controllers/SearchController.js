const Dev = require('../models/dev');
const StringAsArray = require('../utils/StringAsArray');

module.exports = {
    async index(request, response) {
        const {latitude, longitude, techs } = request.query;

        const techsArray = StringAsArray(techs);
        
        let techs_query;
        if (techsArray[0] == "") {
            techs_query = {
                $ne: techsArray
            }
        } else {
            techs_query = {
                $in: techsArray,
            }
        }
        const devs = await Dev.find({
            techs: techs_query,
            location: {
                $near: {
                    $geometry: {
                        type:'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        
        return response.json(devs);
    }

}