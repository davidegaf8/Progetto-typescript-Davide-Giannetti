// CREAZIONE INTERFACCE
//CREAZIONE CLASSI
var Mezzo = /** @class */ (function () {
    function Mezzo(tipo, ID, stato) {
        this.tipo = tipo;
        this.ID = ID;
        this.stato = stato;
    }
    Mezzo.prototype.assegnaUtente = function (utente) {
        this.stato = true;
    };
    return Mezzo;
}());
var Citta = /** @class */ (function () {
    function Citta(nome, elencoMezzi) {
        this.nome = nome;
        this.elencoMezzi = elencoMezzi;
    }
    Citta.prototype.aggiungiMezzo = function (mezzo) {
        if (this.elencoMezzi.indexOf(mezzo) === -1) {
            this.elencoMezzi.push(mezzo);
        }
        else {
            console.log('il mezzo è già stato aggiunto');
        }
    };
    return Citta;
}());
var Utente = /** @class */ (function () {
    function Utente(nome, cognome, email, metodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }
    Utente.prototype.prenotaMezzo = function (mezzo, citta) {
        if (mezzo.stato === true || citta.elencoMezzi.indexOf(mezzo) === -1) {
            console.log('il mezzo non è disponibile');
        }
        else {
            mezzo.stato = true;
            mezzo.assegnaUtente(this);
            citta.elencoMezzi.splice(citta.elencoMezzi.indexOf(mezzo), 1);
            console.log("l'utente ".concat(this.nome, " ").concat(this.cognome, " ha prenotato il mezzo ").concat(mezzo.tipo, " ").concat(mezzo.ID));
        }
    };
    //AGGIUNTA DI UN METODO PER TERMINARE LA PRENOTAZIONE
    Utente.prototype.terminaPrenotazione = function (mezzo) {
        if (mezzo.stato === true) {
            mezzo.stato = false;
            cittaMilano.elencoMezzi.push(mezzo);
            console.log("l'utente ".concat(this.nome, " ").concat(this.cognome, " ha terminato la prenotazione del mezzo ").concat(mezzo.tipo, " ").concat(mezzo.ID));
        }
        else {
            console.log('il mezzo non è ancora prenotato');
        }
    };
    return Utente;
}());
//CREAZIONE ISTANZE DEI MEZZI
var scooter1 = new Mezzo('scooter', 'S1', false);
var scooter2 = new Mezzo('scooter', 'S2', false);
var scooter3 = new Mezzo('scooter', 'S3', false);
var scooter4 = new Mezzo('scooter', 'S4', false);
var scooter5 = new Mezzo('scooter', 'S5', false);
var bici1 = new Mezzo('bici', 'B1', false);
var bici2 = new Mezzo('bici', 'B2', false);
var bici3 = new Mezzo('bici', 'B3', false);
var bici4 = new Mezzo('bici', 'B4', false);
var monopattino1 = new Mezzo('monopattino', 'M1', false);
var monopattino2 = new Mezzo('monopattino', 'M2', false);
var monopattino3 = new Mezzo('monopattino', 'M3', false);
//OGGETTO CON I VARI ARRAY DEI MEZZI DIVISI PER CATEGORIA
var listaMezzi = {
    'scooter': [scooter1, scooter2, scooter3, scooter4, scooter5],
    'bici': [bici1, bici2, bici3, bici4],
    'monopattino': [monopattino1, monopattino2, monopattino3]
};
//CREAZIONE ISTANZE CITTA
var cittaRoma = new Citta('Roma', [scooter1, bici1, monopattino1]);
var cittaMilano = new Citta('Milano', [scooter2, bici2, monopattino2]);
var cittaNapoli = new Citta('Napoli', [scooter3, bici3, monopattino3]);
//CREAZIONE ISTANZE UTENTI
var utente1 = new Utente('Mario', 'Rossi', 'mario@rossi.com', 'carta di credito');
var utente2 = new Utente('Luca', 'Verdi', 'luca@verdi.com', 'carta di credito');
var utente3 = new Utente('Marco', 'Bianchi', 'marco@bianchi.com', 'paypal');
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
