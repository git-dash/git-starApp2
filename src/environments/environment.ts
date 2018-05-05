// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  roomDefaultLocation: 'assets/images/hotel/',
  confRoomDefaultLocation: 'assets/images/hotels/',
  firebaseConfig: {
    apiKey: '-',
    authDomain: '-',
    databaseURL: '-',
    projectId: '-',
    storageBucket: '-',
    messagingSenderId: '-',
  },
  appBillingListTableColumns: [
    'id',
    'name',
    'cost',
    // 'Date',
    // 'Category',
  ],
  appGuestListTableColumns: [
    'id',
    'name',
    'phone',
    'age',
  ],
  filterData: {

    commonService: [
      { selected: false, value: 0, symbol: 'wifi.png', label: 'Wifi' },
      { selected: false, value: 1, symbol: 'dumbbell.png', label: 'Gym' },
      { selected: false, value: 2, symbol: 'food.png', label: 'Breakfast' },
      { selected: false, value: 3, symbol: 'swimming-pool.png', label: 'Swimming Pool' },
      { selected: false, value: 4, symbol: 'lotus-position.png', label: 'Yoga Classes' },
      { selected: false, value: 5, symbol: 'pets.png', label: 'Pet' }

    ],
    roomTypes: [
      { selected: false, label: 'Single', desc: ' A room assigned to one person. Can have one or more beds.' },
      { selected: false, label: 'Double', desc: ' A room assigned to two people. Can have one or more beds.' },
      { selected: false, label: 'Triple', desc: ' A room assigned to three people. Can have two or more beds.' },
      { selected: false, label: 'Quad', desc: ' A room assigned to four people. Can have two or more beds.' },
      { selected: false, label: 'Queen', desc: ' A room with a queen-sized bed. Can be occupied by one or more people.' },
      { selected: false, label: 'King', desc: ' A room with a king-sized bed. Can be occupied by one or more people.' },
      { selected: false, label: 'Twin', desc: ' A room with two beds. Can be occupied by one or more people.' },
      {
        selected: false, label: 'Double-double', desc: ` A room with two double (or perhaps queen)
      beds.Can be occupied by one or more people.` },
      {
        selected: false, label: 'Studio', desc: `A room with a studio bed– a couch that can be converted into
        a bed. Can also have an additional bed.` }
    ],
    guestRating: [
      { selected: false, label: 3 },
      { selected: false, label: 4 },
      { selected: false, label: 4.5 },

    ],
    starRating: [
      { selected: false, starValue: new Array(1), label: 1 },
      { selected: false, starValue: new Array(2), label: 2 },
      { selected: false, starValue: new Array(3), label: 3 },
      { selected: false, starValue: new Array(4), label: 4 },
      { selected: false, starValue: new Array(5), label: 5 }

    ],
    foodType: [
      { selected: false, label: 'Veg', desc: ' A room assigned to one person. Can have one or more beds.' },
      { selected: false, label: 'Non-Veg', desc: ' A room assigned to one person. Can have one or more beds.' },
    ]
  },

  data2:
    // tslint:disable-next-line:max-line-length
    'data:image/png;base64,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'

};
