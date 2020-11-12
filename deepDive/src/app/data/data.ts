export interface Person {
  Firstname: string;
  Middlename: string;
  Surname: string;
  DateOfBirth: Date;
  ImageUrl?: string;
}

export const people: Array<Person> = [
  {
    Firstname: 'Samson',
    Middlename: 'Ringera',
    Surname: 'M\'Abira',
    DateOfBirth: new Date(1922, 1, 1)
  },
  {
    Firstname: 'Charity',
    Middlename: 'Nkaimura',
    Surname: 'M\'Mwitari',
    DateOfBirth: new Date(1930, 1, 1)
  },
  {
    Firstname: 'Andrew',
    Middlename: 'Muthomi',
    Surname: 'Ringera',
    DateOfBirth: new Date(1960, 10, 20)
  },
  {
    Firstname: 'Catheline',
    Middlename: 'Karimi',
    Surname: 'Muriungi',
    DateOfBirth: new Date(1964, 11, 12)
  },
  {
    Firstname: 'Remus',
    Middlename: 'Thuranira',
    Surname: 'Muthomi',
    DateOfBirth: new Date(1987, 6, 24),
    ImageUrl: '../assets/images/remus.jpeg'
  },
  {
    Firstname: 'Neema',
    Middlename: 'Dolica',
    Surname: 'Lechipya',
    DateOfBirth: new Date(1989, 1, 30)
  },
  {
    Firstname: 'Remus',
    Middlename: 'Muthomi',
    Surname: 'Junior',
    DateOfBirth: new Date(2014, 11, 18)
  }
];

