import { Account } from './account';
import {Activity} from './activity'
import { Log } from './log';

export interface Student {
 nome: string;
 cognome: string;
 corso: string;
 utenza: number;
 matricola: number;
 attivita:Activity[];
 user:Account;
 log:Log[];
}
