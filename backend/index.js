const Decimal = require("decimal.js");
const crypto = require("crypto");
const axios = require("axios");
Decimal.set({ precision: 1e4 });
Decimal.set({ rounding: 5 });
Decimal.set({ toExpPos: 1000 });
Decimal.set({ modulo: Decimal.ROUND_FLOOR });

const API_SERVER = "http://52.59.5.86:5000/share";
const bits = 2913; //3217;
let prime = Decimal(2).pow(bits).sub(1);

function sha256(s) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

function sendToServer(shares, api_key, form_id) {
  shares.forEach((share) => {
    share["api_key"] = api_key;
    share["form_id"] = form_id;
    axios.post(API_SERVER, share);
  });
}

function getShareFromServer(api_key, form_id, hash) {
  return axios.post(API_SERVER + "/" + form_id, {
    api_key: api_key,
    hash: hash,
  });
}

function generateKeys() {
  var prime_length = 1024;
  var diffHell = crypto.createDiffieHellman(prime_length);
  diffHell.generateKeys();
  return {
    public: "0x" + diffHell.getPublicKey("hex"),
    private: "0x" + diffHell.getPrivateKey("hex"),
  };
}

function splite(secret, n, k) {
  if (Number.isInteger(secret))
    throw new TypeError("The Secret is not a number");
  if (secret.substring(0, 2) !== "0x")
    throw new TypeError(
      "The secret must be a hexadecimal string starting with 0x"
    );

  const p = Decimal(prime);

  let coefs = [Decimal(secret)];
  let shares = [];
  // Use mersenne prime number for random coeeficients
  for (var i = 1; i < k; i++) {
    coefs.push(random(Decimal(0), p));
  }

  if (Decimal(secret).greaterThan(prime)) {
    throw new RangeError("The Secret must be less than the prime");
  }

  for (let i = 0; i < n; i++) {
    let x = Decimal(i + 1);
    shares.push({
      x,
      y: f(x, coefs).mod(p),
    });
  }

  sharesEncoded = [];
  shares.map((share) => {
    sharesEncoded.push({
      x: share.x.toString(),
      y: Buffer.from(share.y).toString("base64"),
      hash: sha256(Buffer.from(share.y).toString("base64")),
    });
  });

  return sharesEncoded;
}

function lagrange(shares, j) {
  let denominator = Decimal(1);
  let numerator = Decimal(1);

  for (let i = 0; i < shares.length; i++) {
    if (!shares[j].x.equals(shares[i].x)) {
      denominator = denominator.times(shares[i].x.minus(shares[j].x));
    }
  }

  for (let i = 0; i < shares.length; i++) {
    if (!shares[j].x.equals(shares[i].x)) {
      numerator = numerator.times(shares[i].x);
    }
  }

  return numerator.dividedBy(denominator).mod(prime);
}

function reconstruct(sharesEncoded) {
  shares = [];
  sharesEncoded.map((share) => {
    shares.push({
      x: Decimal(share.x),
      y: Buffer.from(share.y, "base64").toString("ascii"),
    });
  });

  let sum_lg = Decimal(0);
  // for each share calculate the lagrange polynome of(0)
  for (var i = 0; i < shares.length; i++) {
    let lg = Decimal(1);
    lg = lagrange(shares, i);
    sum_lg = sum_lg.add(lg.times(shares[i].y));
  }

  return sum_lg.mod(prime);
}

function random(min, max) {
  let r = Decimal.random().times(max.sub(min + 1));
  return min.add(r).floor();
}

function f(x, coefs) {
  let val = coefs[0];
  for (let i = 1; i < coefs.length; i++) {
    val = val.add(x.pow(i).times(coefs[i]));
  }
  return val;
}

exports.splite = splite;
exports.reconstruct = reconstruct;
//exports.generateSecretKey = generateSecretKey;
// exports.encrypt = encrypt;
// exports.decrypt = decrypt;
exports.sendToServer = sendToServer;
exports.getShareFromServer = getShareFromServer;
exports.generateKeys = generateKeys;
