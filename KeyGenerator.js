var KeyGenerator = /** @class */ (function () {
    function KeyGenerator(podstawa, liczba_pierwsza) {
        this.podstawa = podstawa;
        this.liczba_pierwsza = liczba_pierwsza;
        this.sekret = Math.round(Math.random() * 10);
    }
    Object.defineProperty(KeyGenerator.prototype, "transport", {
        get: function () {
            var pierwsze_obliczenie = Math.pow(this.podstawa, this.sekret) % this.liczba_pierwsza;
            return pierwsze_obliczenie;
        },
        set: function (externalTransport) {
            this._transport = externalTransport;
        },
        enumerable: true,
        configurable: true
    });
    KeyGenerator.prototype.wynik = function () {
        var obliczenie_alicji = Math.pow(this._transport, this.sekret) % this.liczba_pierwsza;
        return obliczenie_alicji;
    };
    return KeyGenerator;
}());
var podstawa = 5;
var liczbaPierwsza = 23;
var Alicja = new KeyGenerator(podstawa, liczbaPierwsza);
var Bob = new KeyGenerator(podstawa, liczbaPierwsza);
Alicja.transport = Bob.transport;
Bob.transport = Alicja.transport;
console.log(Alicja.wynik());
console.log(Bob.wynik());
