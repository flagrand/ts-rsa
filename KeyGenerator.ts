class KeyGenerator{
    private sekret: number;
    private _transport: number;

    constructor(private podstawa: number, private liczba_pierwsza: number){
        this.sekret = Math.round(Math.random() * 10);
    }

    get transport() {
        let pierwsze_obliczenie = Math.pow(this.podstawa, this.sekret) % this.liczba_pierwsza;
        return pierwsze_obliczenie;
    }
    set transport(externalTransport: number) {
        this._transport = externalTransport;
    }

    public wynik(){
        let obliczenie_alicji = Math.pow(this._transport, this.sekret) % this.liczba_pierwsza;
        return obliczenie_alicji;
    }
 }

const podstawa = 5;
const liczbaPierwsza = 23;
let Alicja = new KeyGenerator(podstawa, liczbaPierwsza);
let Bob = new KeyGenerator(podstawa, liczbaPierwsza);
Alicja.transport = Bob.transport;
Bob.transport = Alicja.transport;
console.log(Alicja.wynik());
console.log(Bob.wynik());
