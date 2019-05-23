var BigNumber = require('bignumber.js');
var RSA = /** @class */ (function () {
    function RSA() {
        this.primeFirst = this.generatePrimeNumber();
        this.primeSecond = this.generatePrimeNumber();
        this.multi = this.multiplication();
        this.euler = this.eulerFunction();
    }
    RSA.prototype.generatePrimeNumber = function () {
        var primeNumber, isPrime = false;
        while (!isPrime) {
            primeNumber = Math.round(Math.random() * 100);
            if (primeNumber < 2) {
                continue;
            }
            isPrime = true;
            for (var i = 2; i * i <= primeNumber; i++) {
                if (primeNumber % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
        return primeNumber;
    };
    RSA.prototype.multiplication = function () {
        this.multiplicatedNumbers = this.primeFirst * this.primeSecond;
        return this.multiplicatedNumbers;
    };
    RSA.prototype.eulerFunction = function () {
        this.phi = (this.primeFirst - 1) * (this.primeSecond - 1);
        return this.phi;
    };
    RSA.prototype.numbersRelativelyprime = function () {
        var relativelyPrime, //relativelyPrime
        isRePrime = false, numberA, numberB, numberC;
        var jakisrandom = Math.random(); //!!!!
        BigInt(jakisrandom); //!!!!
        while (!isRePrime) {
            relativelyPrime = Math.floor((jakisrandom * (this.phi - 1)) + 1);
            if (relativelyPrime < 1 || relativelyPrime > this.phi) {
                continue;
            }
            this.relativelyPrimelook = relativelyPrime;
            numberA = this.phi;
            numberB = relativelyPrime;
            while (numberB != 0) {
                numberC = numberA % numberB;
                numberA = numberB;
                numberB = numberC;
            }
            isRePrime = numberA === 1;
        }
        return this.Serching_D(relativelyPrime) /* + ' ' + numberA + /*' ' + numberB + ' ' + numberC*/;
    };
    RSA.prototype.Serching_D = function (relativePrime) {
        var a0, n0, p0, p1, q, r, t;
        p0 = 0;
        p1 = 1;
        a0 = relativePrime;
        n0 = this.phi;
        // @ts-ignore
        q = Math.trunc(n0 / a0);
        r = n0 % a0;
        while (r > 0) {
            t = p0 - q * p1;
            if (t >= 0) {
                t = t % this.phi;
            }
            else {
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
    };
    RSA.prototype.Summary = function (p1) {
        return "Public Key: " + this.multiplicatedNumbers + "  " + this.relativelyPrimelook + '\n' + "Private Key: " + this.multiplicatedNumbers + "  " + this.privateKey;
    };
    //----------------------------------------------------------------------------------------------------------------------------------------------
    RSA.prototype.encryption = function (message) {
        this.encryptedMessage = Math.pow(message, this.relativelyPrimelook) % this.multiplicatedNumbers;
        //console.log(message, this.relativelyPrimelook, this.multiplicatedNumbers);
        console.log(this.encryptedMessage);
        return this.decryption(this.encryptedMessage);
    };
    RSA.prototype.decryption = function (encryptedMessage) {
        this.decryptedMessage = Math.pow(encryptedMessage, this.privateKey) % this.multiplicatedNumbers;
        return '\n' + this.decryptedMessage;
    };
    RSA.prototype.printNumbers = function () {
        console.log(this.numbersRelativelyprime(), this.encryption(8));
    };
    return RSA;
}());
var tryy = new RSA;
tryy.printNumbers();
