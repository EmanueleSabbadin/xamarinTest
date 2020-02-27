import { Student } from './student';
import { Place } from './place';

export interface Activity {
   /* position: number;
    id:number;
    start_date:string;
    end_date:string;
    place:Place;
    type:string;
    students:Student[];
    nStud:number;    */
    datainizio: Date;
    datafine: Date;
    attivita_id: number;
    luogo_id: number;
    attivita: string;
    studenti: Student[];
    studente_id: number;
    luogo: Place;
    Location: Place;
    numero_studenti: number;
}

