const Plate = require('./schema');

exports.getPlates = function(res, params) {
    console.log('Getting plates for params:');
    console.log(params);
    
    const page = params && params.page ? Number.parseInt(params.page) : 0;
    const size = params && params.size ? Number.parseInt(params.size) : 10;
    let sort = {'_id': 1};
    let match = { }
    
    if(params && params.order && params.column) {
        const order = params.order.toUpperCase() === 'DESC' ? -1 : 1;
        sort = { }
        sort[params.column] = order;
    }

    if(params && params.filter) {
        const pattern = {$regex: params.filter, $options: 'i'}
        match = {
            $or: [
                {'_id': pattern},
                {'name': pattern},
                {'surname': pattern},
                {'address': pattern},
                {'email': pattern}
            ]
        }
    }

    Plate.aggregate([
        { '$match'  : match },
        { '$sort'   : sort },
        { '$facet'  : {
            metadata: [ 
                { $count: "totalElements" }, 
                { $addFields: 
                    {   page: page,  
                        size: size, 
                        totalPages: {$ceil: {$divide: ["$totalElements", size] } } 
                    } 
                } 
            ],
            data: [ 
                { $skip: page * size }, 
                { $limit: size } 
            ]
        } }
    ]).exec((err, plates) => {
        if(err) {
            console.error(err);
            res.status(400).json({'message': 'Cannot get plates list'});
        } else {
            const emptyMetaData = {
                totalElements: 0,
                page: 0,
                size: 10,
                totalPages: 0
            }
            const metadata = plates[0].metadata[0] ? plates[0].metadata[0] : emptyMetaData;
            res.json({'data': plates[0].data, 'pageInfo': metadata});
        }
    })
}


exports.daletePlate = function(res, plateId) { 
    console.log('Deleting plate: ' + plateId);

    Plate.findByIdAndRemove({_id: plateId}, function(err, success){
        if(err) {
            console.error(err);
            res.status(400).json({'message': 'Plate cannot be deleted'});
        } else {
            res.json({'message': 'Successfully removed'});
        }
    });
}


exports.addPlate = function(res, plate) { 
    console.log('Creating Plate ... ');
    console.log(plate);

    let newPlate = new Plate(plate);
    newPlate.save()
        .then(succes => {
            res.json({'message': 'Plate ' + plate._id + ' sucessfully created'});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({'message': 'Unable to save plate'});
        });
}


exports.updatePlate = function(res, plate) {
    console.log('Updateing Plate: ' + plate._id);

    Plate.findById(plate._id, function(err, result) {
        if (!result)
          return next(new Error('Could not find plate'));
        else {
            result.name = plate.name;
            result.surname = plate.surname;
            result.address = plate.address;
            result.phone = plate.phone;
            result.email = plate.email;
      
            result.save(function(err) {
                if (err) {
                    console.error(err);
                    res.status(400).json({'message': err.message})
                } else {
                    res.json({'message': 'Plate updated'});
                }
            });
        }
      });
}