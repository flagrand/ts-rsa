var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DaffieHellman = /** @class */ (function () {
    function DaffieHellman(podstawa, liczba_pierwsza, sekret_alcji, sekret_boba) {
        this.podstawa = podstawa; //5
        this.liczba_pierwsza = liczba_pierwsza; //23
        this.sekret_alicji = sekret_alcji; //6
        this.sekret_boba = sekret_boba; //15
    }
    return DaffieHellman;
}());
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Users.prototype.first = function () {
        var a = Math.pow(this.podstawa, this.sekret_alicji) % this.liczba_pierwsza;
        var b = Math.pow(this.podstawa, this.sekret_boba) % this.liczba_pierwsza;
        return this.second(a, b);
    };
    Users.prototype.second = function (secret_one, secret_two) {
        var wynik_pierwszy = Math.pow(secret_one, this.sekret_boba) % this.liczba_pierwsza;
        var wynik_drugi = Math.pow(secret_two, this.sekret_alicji) % this.liczba_pierwsza;
        return this.sprawdzenie(wynik_pierwszy, wynik_drugi);
    };
    Users.prototype.sprawdzenie = function (wynik_pierwszy, wynik_drugi) {
        if (wynik_pierwszy == wynik_drugi) {
            return "klucz jeden: " + wynik_pierwszy + "\n" + " klucz dwa: " + wynik_drugi;
        }
        else {
            return "wrong key";
        }
    };
    return Users;
}(DaffieHellman));
var NewKey = new Users(2, 11, 4, 16);
console.log(NewKey.first());
