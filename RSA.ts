const BigNumber = require('bignumber.js');

class RSA {
    private primeFirst: bigint;
    private primeSecond: bigint;
    private euler: bigint;
    private phi: bigint;
    private relativelyPrimelook: bigint;
    private multiplicatedNumbers: bigint;
    private multi: bigint;
    private privateKey: bigint;
//------------------------------------------
    private someRandom: bigint | number | string;
    private encryptedMessage: bigint;
    private decryptedMessage: bigint;

    constructor() {
        this.primeFirst = this.generatePrimeNumber();
        this.primeSecond = this.generatePrimeNumber();
        this.multi = this.multiplication();
        this.euler = this.eulerFunction();
    }

    public generatePrimeNumber() {
        let primeNumber,
            isPrime = false;

        while (!isPrime) {
            primeNumber = Math.round(Math.random() * 100);
            
            if (primeNumber < 2){
                continue;
            }

            isPrime = true;
            for (let i = 2; i*i <= primeNumber; i++) {
                if (primeNumber % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        return primeNumber;
    }
    public multiplication() {
        this.multiplicatedNumbers = this.primeFirst * this.primeSecond;
        return this.multiplicatedNumbers;
    }
    public eulerFunction() {
        this.phi = (this.primeFirst - 1n) * (this.primeSecond - 1n);
        return this.phi;
    }
    public numbersRelativelyprime() {
        let relativelyPrime: bigint,                                            //relativelyPrime
            isRePrime = false,
            numberA: bigint, numberB: bigint, numberC: bigint;
            this.someRandom = BigInt(Math.random());                              //!!!!

        while (!isRePrime) {
            relativelyPrime = Math.floor((this.someRandom * (this.phi - 1n)) + 1n);
            
            if (relativelyPrime < 1n || relativelyPrime > this.phi){
                continue;
            }
            this.relativelyPrimelook = relativelyPrime;
            numberA = this.phi;
            numberB = relativelyPrime;
            while(numberB != 0n) {
                numberC = numberA % numberB;
                numberA = numberB;
                numberB = numberC;
            }
            isRePrime = numberA === 1n;
        }
        return this.Serching_D(relativelyPrime)/* + ' ' + numberA + /*' ' + numberB + ' ' + numberC*/;
    }
    private Serching_D(relativePrime: bigint) {
        let a0: bigint,
        n0: bigint,
        p0: bigint,
        p1: bigint,
        q: bigint,
        r: bigint,
        t: bigint;

        p0 = 0n;
        p1 = 1n;
        a0 = relativePrime;
        n0 = this.phi;
        // @ts-ignore
        q = Math.trunc(n0 / a0);
        r = n0 % a0;
        while(r > 0) {
            t = p0 - q * p1;
            if(t >= 0) {
                t = t % this.phi;
            }else {
                t = this.phi - ((-t) % this.phi);
            }
            p0 = p1;
            p1 = t;
            n0 = a0;
            a0 = r;  
            // @ts-ignore
            q = Math.trunc(n0 / a0);
            r = n0 % a0;
        }
        this.privateKey = p1;
        return this.Summary(p1);
    }
    private Summary(p1: bigint) {
        return "Public Key: " + this.multiplicatedNumbers +"  "+ this.relativelyPrimelook+ '\n' + "Private Key: " + this.multiplicatedNumbers +"  "+ this.privateKey;
    }
//----------------------------------------------------------------------------------------------------------------------------------------------

    public encryption(message: bigint) {
        this.encryptedMessage = BigInt(message ** this.relativelyPrimelook % this.multiplicatedNumbers);
        //console.log(message, this.relativelyPrimelook, this.multiplicatedNumbers);
        console.log(this.encryptedMessage);
        return this.decryption(this.encryptedMessage)
    }
    private decryption(encryptedMessage: bigint) {
        this.decryptedMessage = BigInt(encryptedMessage ** this.privateKey % this.multiplicatedNumbers);
        return '\n' + this.decryptedMessage;
    }



    public printNumbers() {
        console.log(this.numbersRelativelyprime(),this.encryption(8n));
    }

}
let tryy = new RSA;

tryy.printNumbers();
