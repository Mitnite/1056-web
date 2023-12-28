export const checkData = {

  campus(campusName: string) {
    switch (campusName) {
      case 'moscow':
        return 'Moscow';
      case 'saint_petersburg':
        return 'Saint-Petersburg';
      case 'nizhniy_novgorod':
        return 'Nizhniy Novgorod';
      case 'perm':
        return 'Perm';
      default:
        return '';
    }
  },

  campusDB(campusName: string) {
    switch (campusName) {
      case 'Moscow':
        return  'moscow';
      case 'Saint-Petersburg':
        return  'saint_petersburg';
      case 'Nizhniy Novgorod':
        return  'nizhniy_novgorod';
      case 'Perm':
        return  'perm';
      default:
        return '';
    }
  },

  localGroup(localGroupName: string) {
    switch (localGroupName) {
      case 'exchange_international_student':
        return 'Exchange';
      case 'full_degree_international_student':
        return ' Full degree';
      case 'prep_year_student':
        return 'Prep year';
      case 'short_term_student':
        return 'Short term';
      case 'research':
        return 'Research';
      default:
        return '';
    }
  },

  localGroupDB(localGroupName: string) {
    switch (localGroupName.toLowerCase().split(' ').join('')) {
      case 'exchange':
        return  'EXCHANGE_INTERNATIONAL_STUDENT';
      case 'fulldegree':
        return  'FULL_DEGREE_INTERNATIONAL_STUDENT';
      case 'prepyear':
        return  'PREP_YEAR_STUDENT';
      case 'shortterm':
        return  'SHORT_TERM_STUDENT';
      case 'researh':
        return  'RESEARCH';
      default:
        return '';
    }
  },

  placeOfResidence(placeOfResidenceName: string) {
    switch (placeOfResidenceName) {
      case 'dorm':
        return 'Dorm';
      case 'hotel':
        return 'Hotel';
      case 'rental_apartment':
        return 'Rental apartment';
      case 'family_friends':
        return 'Family friends';
      case 'other':
        return 'Other';
      default:
        return '';
    }
  },

  placeOfResidenceDB(placeOfResidenceName: string) {
    switch (placeOfResidenceName) {
      case 'Dorm':
        return  'DORM';
      case 'Hotel':
        return  'HOTEL';
      case 'Rental apartment':
        return  'rental_apartment';
      case 'Family friends':
        return  'family_friends';
      case 'Other':
        return  'OTHER';
      default:
        return '';
    }
  },

  birthDate(date: string) {
    const birth = date.split('');
    return `${birth[8]}${birth[9]}.${birth[5]}${birth[6]}.${birth[0]}${birth[1]}${birth[2]}${birth[3]}`;
  },

  arrivalDate(arrivalDateTime: string) {
    const date = arrivalDateTime.split('');
    return `${date[8]}${date[9]}.${date[5]}${date[6]}.${date[0]}${date[1]}${date[2]}${date[3]}`;
  },

  arrivalTime(arrivalDateTime: string) {
    const date = arrivalDateTime.split('');
    return `${date[11]}${date[12]}:${date[14]}${date[15]}`;
  },

  gender(gender: string) {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  }
};
