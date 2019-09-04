const Plate = require('./schema');

const records = [
    {'_id': 'KRA-11111', 'name': 'Wladek', 'surname': 'Markiewicz', 'address': 'Krakow ul. Kamienna 123', 'phone': 333111666, 'email': 'mareczek@onet.pl'},
    {'_id': 'KRA-22222', 'name': 'Jan', 'surname': 'Wlodarczyk', 'address': 'Krakow ul. Betonowa 455', 'phone': 444333222, 'email': 'jawlo@bb.pl'},
    {'_id': 'KRA-33333', 'name': 'Magdalena', 'surname': 'Walas', 'address': 'Krakow al. M. Konopnickiej 2/34', 'phone': 454322345, 'email': 'madzik@bbb.ca'},
    {'_id': 'KWI-44444', 'name': 'Aleksandra', 'surname': 'Makowksa', 'address': 'Wieliczka 22', 'phone': 976323452, 'email': 'alik@ccc.pl'},
    {'_id': 'KWI-55555', 'name': 'Lukasz', 'surname': 'Smietana', 'address': 'Wieliczka ul. Przy Rondzie 22', 'phone': 888453456, 'email': 'smietana@sd.pl'},
    {'_id': 'KWI-66666', 'name': 'Wladyslaw', 'surname': 'Borowiec', 'address': 'Wieliczka 21', 'phone': 445632345, 'email': 'wlad_bor@sda.pl'},
    {'_id': 'KMY-77777', 'name': 'Mietek', 'surname': 'Smietek', 'address': 'Myslenice ul. Mietkow 22', 'phone': 445543237, 'email': 'wiesmie@ewa.pl'},
    {'_id': 'KMY-88888', 'name': 'Urszuka', 'surname': 'Renifer', 'address': 'Myslenice 122', 'phone': 556545689, 'email': 'reniferula@ree.pl'},
    {'_id': 'KMY-99999', 'name': 'Joanna', 'surname': 'Ptak', 'address': 'Myslenice ul. Zarewskiego 122', 'phone': 456784567, 'email': 'jo_ptak@dda.pl'},
    {'_id': 'CBA-12345', 'name': 'Marcin', 'surname': 'Jakistam', 'address': 'Gdziestam 1122', 'phone': 456545678, 'email': 'costam@aa.pl'},
    {'_id': 'OLX-45643', 'name': 'Jozef', 'surname': 'Cebula', 'address': 'Oswiecim 1122', 'phone': 567898789, 'email': 'osjozek@sad.pl'},
    {'_id': 'OLX-45654', 'name': 'Maria', 'surname': 'Antonina', 'address': 'Gorlice 532', 'phone': 564345321, 'email': 'manitoa@sda.pl'},
    {'_id': 'CAS-67753', 'name': 'Wladyslawa', 'surname': 'Branina', 'address': 'Zakliczyn 532', 'phone': 456533454, 'email': 'brarnina@dsafs.pl'},
    {'_id': 'CAS-26451', 'name': 'Mieczyslaw', 'surname': 'Wrobel', 'address': 'Wraocla 532', 'phone': 455565566, 'email': 'adasdas@dsafs.pl'},
    {'_id': 'CSS-23452', 'name': 'Mieczyslawa', 'surname': 'Gientek', 'address': 'Warszawa 532', 'phone': 555444567, 'email': 'giente@ss.pl'},
    {'_id': 'WWW-34431', 'name': 'Przemyslaw', 'surname': 'Zasada', 'address': 'Zasada 532', 'phone': 444333213, 'email': 'zasada@ss.pl'}
]


exports.resetDatabasEntities = function(res) {
    console.log('Removeing existing data');

    Plate.remove({}, function(error, success) {
        if(error) {
            console.error(error);
            res.status(400).json({'message': 'Cannot remove data'});
        } else {
            console.log('All records removed!')
        }
    });

    console.log('Inserting default data');

    Plate.create(records, function(error, success) {
        if(error) {
            console.error(error);
            res.status(400).json({'message': 'Cannot load data'});
        } else {
            console.log('Records uploaded')
        }
    })

    res.json({'message': 'Get what you wanted :)'});
}