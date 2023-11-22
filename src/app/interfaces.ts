export interface User {
    username: string;
    password: string;
}

export interface SignBuddy {
    email: string;
    password: string;
    role: string;
    name: string;
    surname: string;
    gender: string;
    citizenship: string;
    tagList:
        { name: string } [];
    birthDate: string;
    phone: string;
    localFaculty: string;
    about: string;
    campus: string;
    archived: boolean;
    foreignStudent: {};
}

export interface SignStudent {
    email: string;
    password: string;
    role: string;
    name: string;
    surname: string;
    gender: string;
    tagList:
        { name: string } [];
    birthDate: string;
    phone: string;
    localFaculty: string;
    about: string;
    campus: string;
    citizenship: string;

    foreignStudent: {
        homeCountry: string
        homeFaculty: string
        homeUniversity: string
        arrivalDateTime: string
        arrivalPlace: string
        residencePlace: string
        address: string
        localGroup: string
        isMatched: string
    };
}

export interface EditBuddy {
    id?: number;
    email: string;
    name: string;
    surname: string;
    gender: string;
    citizenship: string;
    campus: string;
    tagList:
        { name: string } [];
    birthDate: string;
    phone: string;
    localFaculty: string;
    about: string;
    role: string;
    archived?: boolean;
}

export interface EditStudent {
    id?: number;
    email: string;
    name: string;
    surname: string;
    gender: string;
    tagList:
        { name: string } [];
    birthDate: string;
    phone: string;
    localFaculty: string;
    about: string;
    role: string;
    citizenship: string;
    campus: string;
    foreignStudent: {
        homeCountry: string
        homeFaculty: string
        homeUniversity: string
        arrivalDateTime: string
        arrivalPlace: string
        residencePlace: string
        address: string
        localGroup: string
        isMatched?: string;
        volunteerId?: number;

    };
    archived?: boolean;
}

export interface EditStudentArrival {
    arrivalPlace: string;
    arrivalDateTime: string;
    /*  residencePlace: string;
      address: string;*/
}

export interface IActionLog {
    eventDateTime: string;
    eventType: string;
    participants: IParticipants[];
}

interface IParticipants {
    id: number;
    name: string;
    surname: string;
    role: string;
}

export interface IArrivalInfo {
    arrivalDateTime: string;
    arrivalPlace: string;
    address: string;
    residencePlace: string;
}

export interface IStudentTable extends EditStudent{
    buddyInfo?: EditBuddy;
}

export interface IBuddyTable extends EditBuddy{

    foreignStudent: EditStudent[];
}
