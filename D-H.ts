abstract class DaffieHellman {
    public podstawa: number;
    public liczba_pierwsza: number;
    protected sekret_alicji: number;
    protected sekret_boba: number;

    constructor(podstawa: number, liczba_pierwsza: number, sekret_alcji: number, sekret_boba: number ){
        this.podstawa = podstawa;  //5
        this.liczba_pierwsza = liczba_pierwsza;  //23
        this.sekret_alicji = sekret_alcji;  //6
        this.sekret_boba = sekret_boba;  //15
    }
}

 class Users extends DaffieHellman{
    protected secret_one: number;
    protected secret_two: number;
    first(){
        let a = Math.pow(this.podstawa, this.sekret_alicji)%this.liczba_pierwsza;
        let b = Math.pow(this.podstawa, this.sekret_boba)%this.liczba_pierwsza;
        return this.second(a, b);
    }
    protected second(secret_one: number, secret_two: number){
        let wynik_pierwszy = Math.pow(secret_one, this.sekret_boba)%this.liczba_pierwsza;
        let wynik_drugi = Math.pow(secret_two, this.sekret_alicji)%this.liczba_pierwsza;
        return this.sprawdzenie(wynik_pierwszy, wynik_drugi);
    }
    protected sprawdzenie(wynik_pierwszy:number, wynik_drugi: number){
        if(wynik_pierwszy==wynik_drugi){
            return "klucz jeden: " + wynik_pierwszy + "\n" +" klucz dwa: " + wynik_drugi;
        }else{
            return"wrong key";
        }
    }
}
 let NewKey = new Users(2,11,4,16);
 console.log(NewKey.first());

 
    
