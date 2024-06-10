// CREAZIONE INTERFACCE

interface IMezzo {
    tipo:string
    ID:string
    stato:boolean

    assegnaUtente(utente:IUtente):void
}

interface ICitta {
    nome:string
    elencoMezzi:IMezzo[]

    aggiungiMezzo(mezzo:IMezzo):void
}

interface IUtente {
    nome:string
    cognome:string
    email:string
    metodoPagamento:string

    prenotaMezzo(mezzo:IMezzo,citta:ICitta):void
    terminaPrenotazione(mezzo:IMezzo):void
}

//CREAZIONE CLASSI

class Mezzo implements IMezzo {
    constructor (public tipo:string,public ID:string,public stato:boolean ){}
    
    assegnaUtente(utente: IUtente): void {
        this.stato = true
    }
}

class Citta implements ICitta {
    constructor (public nome:string, public elencoMezzi:IMezzo[]){}
    
    aggiungiMezzo(mezzo: IMezzo): void {
        if (this.elencoMezzi.indexOf(mezzo) === -1) {
            this.elencoMezzi.push(mezzo)
        }

        else {
            console.log('il mezzo è già stato aggiunto')
        }
    }
}

class Utente implements IUtente {
    constructor (public nome:string, public cognome:string, public email:string, public metodoPagamento:string){}
    
    prenotaMezzo(mezzo: IMezzo, citta: ICitta): void {
        if (mezzo.stato === true || citta.elencoMezzi.indexOf(mezzo) === -1) {
            console.log('il mezzo non è disponibile')
        } else {
            mezzo.stato = true
            mezzo.assegnaUtente(this)
            citta.elencoMezzi.splice(citta.elencoMezzi.indexOf(mezzo), 1)
            console.log(`l'utente ${this.nome} ${this.cognome} ha prenotato il mezzo ${mezzo.tipo} ${mezzo.ID}`)
        }
       
    }
    //AGGIUNTA DI UN METODO PER TERMINARE LA PRENOTAZIONE
    terminaPrenotazione(mezzo: IMezzo): void {
        if(mezzo.stato === true) {
            mezzo.stato = false
            cittaMilano.elencoMezzi.push(mezzo)
            console.log(`l'utente ${this.nome} ${this.cognome} ha terminato la prenotazione del mezzo ${mezzo.tipo} ${mezzo.ID}`)
        }

        else {
            console.log('il mezzo non è ancora prenotato')
        }
 }
}
//CREAZIONE ISTANZE DEI MEZZI

const scooter1 = new Mezzo('scooter', 'S1', false);
const scooter2 = new Mezzo('scooter', 'S2', false);
const scooter3 = new Mezzo('scooter', 'S3', false);
const scooter4 = new Mezzo('scooter', 'S4', false);
const scooter5 = new Mezzo('scooter', 'S5', false);

const bici1 = new Mezzo('bici', 'B1', false);
const bici2 = new Mezzo('bici', 'B2', false);
const bici3 = new Mezzo('bici', 'B3', false);
const bici4 = new Mezzo('bici', 'B4', false);

const monopattino1 = new Mezzo('monopattino', 'M1', false);
const monopattino2 = new Mezzo('monopattino', 'M2', false);
const monopattino3 = new Mezzo('monopattino', 'M3', false);

//OGGETTO CON I VARI ARRAY DEI MEZZI DIVISI PER CATEGORIA
let listaMezzi = {
    'scooter': [scooter1,scooter2,scooter3,scooter4,scooter5],
    'bici': [bici1,bici2,bici3,bici4],
    'monopattino': [monopattino1,monopattino2,monopattino3]
}

//CREAZIONE ISTANZE CITTA
const cittaRoma: ICitta = new Citta('Roma',[scooter1,bici1,monopattino1]);
const cittaMilano : ICitta = new Citta('Milano',[scooter2,bici2,monopattino2]); 
const cittaNapoli: ICitta = new Citta('Napoli', [scooter3,bici3,monopattino3]);
 
//CREAZIONE ISTANZE UTENTI
const utente1: IUtente = new Utente('Mario', 'Rossi', 'mario@rossi.com', 'carta di credito');
const utente2: IUtente = new Utente('Luca', 'Verdi', 'luca@verdi.com', 'carta di credito');
const utente3: IUtente = new Utente('Marco', 'Bianchi', 'marco@bianchi.com', 'paypal');

//TEST PRENOTAZIONE MEZZI
utente1.prenotaMezzo(scooter1, cittaRoma);
utente2.prenotaMezzo(bici2, cittaMilano);
utente3.prenotaMezzo(monopattino3, cittaNapoli);

utente1.prenotaMezzo(scooter3, cittaRoma); //MEZZO NON DISPONIBILE
cittaRoma.aggiungiMezzo(scooter3); //AGGIUNTA MEZZO ALLA CITTA
utente1.prenotaMezzo(scooter3, cittaRoma); //MEZZO DISPONIBILE

//TEST TERMINAZIONE PRENOTAZIONE
utente3.terminaPrenotazione(scooter3);
utente3.terminaPrenotazione(scooter5); //MEZZO NON PRENOTATO
