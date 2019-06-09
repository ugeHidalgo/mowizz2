use mowizz2

var defaultUserName = 'testuser',
    accounts = [{
        name: 'ING-N',
        description: 'ING Direct cuenta nómina',
        active: true,
        iban: 'AL47 2121 1009 0000 0002 3569 8741',
        comments: 'Cuenta de ING Direct para diario',
        created: new Date("2010-10-23"),
        updated: new Date("2018-04-14"),
        username: 'testuser'
    },{
        name: 'BS',
        description: 'Banco Santander',
        active: true,
        iban: 'BS47 1111 2222 3333 4444 5555 6666',
        comments: 'Cuenta del banco de Santander',
        created: new Date("2010-05-21"),
        updated: new Date("2018-04-19"),
        username: 'testuser'
    },{
        name: 'CR',
        description: 'Caja Rural',
        active: false,
        iban: 'CR47 1111 2222 3333 4444 5555 6666',
        comments: 'Cuenta de la caja rural',
        created: new Date("2011-11-25"),
        updated: new Date("2017-05-24"),
        username: 'testuser'
    },{
        name: 'CASH',
        description: 'Metálico',
        active: true,
        iban: '',
        comments: 'Efectivo.',
        created: new Date("2012-05-19"),
        updated: new Date("2019-04-10"),
        username: 'testuser'
    }];

db.accounts.insert(accounts)