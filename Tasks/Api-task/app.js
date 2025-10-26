const express = require("express");
const app = express();
app.use(express.json());

// -----------------------------------------------------------------------------
// Instructions:
// 1) Complete each route marked with a number and a // TODO comment.
// 2) Return text or JSON exactly as described.
// 3) On invalid/missing inputs, respond 400 with {error:"message"}.
// 4) Keep all code in this single file.
// 5) Each handler shows one-line "link example" you can paste in browser/Postman.
// -----------------------------------------------------------------------------

// --- Text / Echo (1–20) ---
app.get("/ping", (req, res) => {
  // #1 TODO: return text "pong"
  // ex: GET /ping
  res.json("pong");
});

app.get("/hello", (req, res) => {
  // #2 TODO: return "Hello 🌍"
  // ex: GET /hello
  res.json("Hello World");
});

app.get("/echo/:word", (req, res) => {
  // #3 TODO: return :word as plain text
  // ex: GET /echo/banana
  const text = req.params.word;
  res.json(text);
});

app.get("/greet/:name", (req, res) => {
  // #4 TODO: return JSON {message:"Hello, <name>"}
  // ex: GET /greet/Ali
  const name = req.params.name;
  if (!name) {
    res.status(400).json({ message: "There is no name as params" });
  }
  res.json({ message: `Hello, ${name}` });
});

app.get("/upper", (req, res) => {
  // #5 TODO: uppercase query.text
  // ex: GET /upper?text=hello
  const text = req.query.text;
  res.json(text.toUpperCase());
});

app.get("/lower", (req, res) => {
  // #6 TODO: lowercase query.text
  // ex: GET /lower?text=HELLO
  const text = req.query.text;
  res.json(text.toLowerCase());
});

app.get("/title", (req, res) => {
  // #7 TODO: capitalize each word in query.text
  // ex: GET /title?text=hello%20world
  const text = req.query.text;
  const capitalized = text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  res.json({ result: capitalized });
});

app.get("/reverse", (req, res) => {
  // #8 TODO: reverse query.text
  // ex: GET /reverse?text=abc
  const text = req.query.text;
  const reversed = text.split("").reverse().join("");

  res.json({ result: reversed });
});

app.get("/count", (req, res) => {
  // #9 TODO: count characters in query.text
  // ex: GET /count?text=hello
  const text = req.query.text;
  const textLength = text.length;
  res.json(textLength);
});

app.get("/trim", (req, res) => {
  // #10 TODO: trim whitespace around query.text
  // ex: GET /trim?text=%20%20hi%20%20
  const text = req.query.text;
  const trimText = text.trim();
  res.json(trimText);
});

app.get("/padleft", (req, res) => {
  // #11 TODO: pad text on the left to len using ch
  // ex: GET /padleft?text=7&len=3&ch=0   -> "007"
  const { text, len, ch } = req.query;
  const length = parseInt(len);
  const padded = text.padStart(length, ch);

  res.json({ result: padded });
});

app.get("/padright", (req, res) => {
  // #12 TODO: pad text on the right to len using ch
  // ex: GET /padright?text=7&len=3&ch=_
  const { text, len, ch } = req.query;
  const length = parseInt(len);
  const padded = text.padEnd(length, ch);

  res.json({ result: padded });
});

app.get("/repeat/:word/:n", (req, res) => {
  // #13 TODO: repeat word n times joined by "-"
  // ex: GET /repeat/hi/3  -> "hi-hi-hi"
  const { word, n } = req.params;
  const count = parseInt(n);
  const result = Array(count).fill(word).join("-");

  res.json({ result });
});

app.get("/includes", (req, res) => {
  // #14 TODO: check if text includes find
  // ex: GET /includes?text=hello&find=ell
  const { text, find } = req.query;
  const includes = text.includes(find);

  res.json({ result: includes });
});

app.get("/starts", (req, res) => {
  // #15 TODO: check if text starts with value
  // ex: GET /starts?text=hello&with=he
  const { text, value } = req.query;
  const starts = text.startsWith(value);

  res.json({ result: starts });
});

app.get("/ends", (req, res) => {
  // #16 TODO: check if text ends with value
  // ex: GET /ends?text=hello&with=lo
  const { text, value } = req.query;
  const ends = text.endsWith(value);

  res.json({ result: ends });
});

app.get("/replace", (req, res) => {
  // #17 TODO: replace substring
  // ex: GET /replace?text=a_b_c&from=_&to=-
  const { text, from, to } = req.query;
  const replaced = text.split(from).join(to);

  res.json({ result: replaced });
});

app.get("/split", (req, res) => {
  // #18 TODO: split text by sep
  // ex: GET /split?text=a,b,c&sep=,
  const { text, sep } = req.query;
  const parts = text.split(sep);
  res.json({ result: parts });
});

app.get("/join", (req, res) => {
  // #19 TODO: join query values except sep into one string using sep
  // ex: GET /join?sep=-&a=hi&b=there&c=you
  const { sep, ...rest } = req.query;
  const values = Object.values(rest);
  const joined = values.join(sep);

  res.json({ result: joined });
});

app.get("/slugify", (req, res) => {
  // #20 TODO: slugify text -> lowercase and hyphens
  // ex: GET /slugify?text=Hello,%20World!
  const text = req.query.text;
  const slugify = text.split(" ").join(", ").toLowerCase();

  res.json(slugify);
});

// --- Numbers / Math (21–40) ---
app.get("/sum/:a/:b", (req, res) => {
  // #21 TODO: return sum
  // ex: GET /sum/5/7
  const { a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const sum = numA + numB;

  res.json({ result: sum });
});

app.get("/sub/:a/:b", (req, res) => {
  // #22 TODO: subtraction
  // ex: GET /sub/10/3
  const { a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const sub = numA - numB;

  res.json({ result: sub });
});

app.get("/mul/:a/:b", (req, res) => {
  // #23 TODO: multiplication
  // ex: GET /mul/4/6
  const { a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const mul = numA * numB;

  res.json({ result: mul });
});

app.get("/div/:a/:b", (req, res) => {
  // #24 TODO: division (error if b=0)
  // ex: GET /div/10/2
  const { a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const div = numA / numB;

  res.json({ result: div });
});

app.get("/mod/:a/:b", (req, res) => {
  // #25 TODO: modulus
  // ex: GET /mod/10/3
  const { a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  const mod = numA % numB;

  res.json({ result: mod });
});

app.get("/pow/:a/:b", (req, res) => {
  // #26 TODO: power
  // ex: GET /pow/2/8
  const { a, b } = req.params;
  const base = parseFloat(a);
  const exponent = parseFloat(b);

  const pow = Math.pow(base, exponent);
  res.json({ result: pow });
});

app.get("/abs/:x", (req, res) => {
  // #27 TODO: absolute value
  // ex: GET /abs/-9
  const { x } = req.params;
  const num = parseFloat(x);
  const abs = Math.abs(num);

  res.json({ result: abs });
});

app.get("/round/:x", (req, res) => {
  // #28 TODO: round number
  // ex: GET /round/3.6
  const { x } = req.params;
  const num = parseFloat(x);
  const round = Math.round(num);

  res.json({ result: round });
});

app.get("/ceil/:x", (req, res) => {
  // #29 TODO: ceil
  // ex: GET /ceil/3.1
  const { x } = req.params;
  const num = parseFloat(x);
  const ceil = Math.ceil(num);

  res.json({ result: ceil });
});

app.get("/floor/:x", (req, res) => {
  // #30 TODO: floor
  // ex: GET /floor/3.9
  const { x } = req.params;
  const num = parseFloat(x);
  const floor = Math.floor(num);

  res.json({ result: floor });
});

app.get("/min", (req, res) => {
  // #31 TODO: minimum of query numbers
  // ex: GET /min?a=3&b=9&c=-2
  const { a, b, c } = req.query;
  const numbers = [a, b, c].map(Number);
  const min = Math.min(...numbers);

  res.json({ result: min });
});

app.get("/max", (req, res) => {
  // #32 TODO: maximum of query numbers
  // ex: GET /max?a=3&b=9&c=-2
  const { a, b, c } = req.query;
  const numbers = [a, b, c].map(Number);
  const max = Math.max(...numbers);

  res.json({ result: max });
});

app.get("/avg", (req, res) => {
  // #33 TODO: average of query numbers
  // ex: GET /avg?a=3&b=9&c=-2
  const { a, b, c } = req.query;
  const numbers = [a, b, c].map(Number);
  const sum = numbers.reduce((acc, val) => acc + val);
  const avg = sum / numbers.length;

  res.json({ result: avg });
});

app.get("/sumlist", (req, res) => {
  // #34 TODO: sum all query numbers
  // ex: GET /sumlist?a=1&b=2&c=3
  const { a, b, c } = req.query;
  const numbers = [a, b, c].map(Number);
  const sumList = numbers.reduce((sum, n) => sum + n);

  res.json({ result: sumList });
});

app.get("/is-even/:n", (req, res) => {
  // #35 TODO: check even
  // ex: GET /is-even/8
  const { n } = req.params;
  const num = parseInt(n);
  const isEven = num % 2 === 0;

  res.json({ isEven: isEven });
});

app.get("/is-odd/:n", (req, res) => {
  // #36 TODO: check odd
  // ex: GET /is-odd/7
  const { n } = req.params;
  const num = parseInt(n);
  const isOdd = num % 2 !== 0;

  res.json({ isOdd: isOdd });
});

app.get("/factorial/:n", (req, res) => {
  // #37 TODO: factorial up to 12
  // ex: GET /factorial/5
  const { n } = req.params;
  const num = parseInt(n);
  let factorial = 1;
  for (let i = 2; i <= num; i++) {
    factorial *= i;
  }

  res.json({ result: factorial });
});

app.get("/fibonacci/:n", (req, res) => {
  // #38 TODO: array of first n fib numbers
  // ex: GET /fibonacci/6 GPT
  const { n } = req.params;
  const count = parseInt(n);
  const fib = [];
  for (let i = 0; i < count; i++) {
    if (i === 0) fib.push(0);
    else if (i === 1) fib.push(1);
    else fib.push(fib[i - 1] + fib[i - 2]);
  }

  res.json({ result: fib });
});

app.get("/prime/:n", (req, res) => {
  // #39 TODO: check prime (n>=2)
  // ex: GET /prime/13 GPT
  const { n } = req.params;
  const num = parseInt(n);
  let isPrime = true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }

  res.json({ result: isPrime });
});

app.get("/gcd/:a/:b", (req, res) => {
  // #40 TODO: greatest common divisor
  // ex: GET /gcd/48/18 GPT
  const { a, b } = req.params;
  let numA = parseInt(a);
  let numB = parseInt(b);
  numA = Math.abs(numA);
  numB = Math.abs(numB);
  while (numB !== 0) {
    const temp = numB;
    numB = numA % numB;
    numA = temp;
  }

  res.json({ result: numA });
});

// --- Ranges / Sequences (41–55) ---
app.get("/range", (req, res) => {
  // #41 TODO: list start→end inclusive
  // ex: GET /range?start=2&end=10
  const { start, end } = req.query;
  const s = parseInt(start);
  const e = parseInt(end);
  const range = [];

  if (s <= e) {
    for (let i = s; i <= e; i++) {
      range.push(i);
    }
  } else {
    for (let i = s; i >= e; i--) {
      range.push(i);
    }
  }

  res.json({ result: range });
});

app.get("/range/step", (req, res) => {
  // #42 TODO: list start→end by step>0
  // ex: GET /range/step?start=2&end=10&step=2
  const { start, end, step } = req.query;
  const s = parseFloat(start);
  const e = parseFloat(end);
  const st = parseFloat(step);
  const steps = [];

  if (s <= e) {
    for (let i = s; i <= e; i += st) {
      steps.push(Number(i.toFixed(10)));
    }
  } else {
    for (let i = s; i >= e; i -= st) {
      steps.push(Number(i.toFixed(10)));
    }
  }

  res.json({ result: steps });
});

app.get("/countdown/:n", (req, res) => {
  // #43 TODO: [n..0]
  // ex: GET /countdown/5
  const { n } = req.params;
  const num = parseInt(n);
  const countdown = [];
  for (let i = num; i >= 0; i--) {
    countdown.push(i);
  }

  res.json({ result: countdown });
});

app.get("/multiples/:base/:count", (req, res) => {
  // #44 TODO: multiples array
  // ex: GET /multiples/3/5
  const { base, count } = req.params;
  const b = parseFloat(base);
  const c = parseInt(count);
  const multiples = [];
  for (let i = 1; i <= c; i++) {
    multiples.push(b * i);
  }

  res.json({ result: multiples });
});

app.get("/table/:n", (req, res) => {
  // #45 TODO: multiplication table n×1..n×10
  // ex: GET /table/7
  const { n } = req.params;
  const num = parseFloat(n);
  const table = [];
  for (let i = 1; i <= 10; i++) {
    table.push(`${num} × ${i} = ${num * i}`);
  }

  res.json({ result: table });
});

app.get("/powers/:n/:k", (req, res) => {
  // #46 TODO: power list n^1..n^k
  // ex: GET /powers/2/5
  const { n, k } = req.params;
  const base = parseFloat(n);
  const exponentCount = parseInt(k);
  const powers = [];
  for (let i = 1; i <= exponentCount; i++) {
    powers.push(Math.pow(base, i));
  }

  res.json({ result: powers });
});

app.get("/evens", (req, res) => {
  // #47 TODO: even numbers up to end
  // ex: GET /evens?end=10
  const { end } = req.query;
  const e = parseInt(end);
  const evens = [];
  for (let i = 0; i <= e; i++) {
    if (i % 2 === 0) {
      evens.push(i);
    }
  }

  res.json({ result: evens });
});

app.get("/odds", (req, res) => {
  // #48 TODO: odd numbers up to end
  // ex: GET /odds?end=9
  const { end } = req.query;
  const e = parseInt(end);
  const odds = [];
  for (let i = 0; i <= e; i++) {
    if (i % 2 !== 0) {
      odds.push(i);
    }
  }

  res.json({ result: odds });
});

app.get("/sum-to/:n", (req, res) => {
  // #49 TODO: sum 1..n
  // ex: GET /sum-to/10
  const { n } = req.params;
  const num = parseInt(n);
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }

  res.json({ result: sum });
});

app.get("/triangle/:n", (req, res) => {
  // #50 TODO: nth triangular number
  // ex: GET /triangle/7 GPT
  const { n } = req.params;
  const num = parseInt(n);
  const triangle = (num * (num + 1)) / 2;

  res.json({ result: triangle });
});

app.get("/square/:n", (req, res) => {
  // #51 TODO: n squared
  // ex: GET /square/12
  const { n } = req.params;
  const num = parseFloat(n);
  const square = num * num;

  res.json({ result: square });
});

app.get("/cubes/:n", (req, res) => {
  // #52 TODO: cubes list 1^3..n^3
  // ex: GET /cubes/5
  const { n } = req.params;
  const num = parseInt(n);
  const cubes = Math.pow(num, 3);

  res.json({ result: cubes });
});

app.get("/arith-seq", (req, res) => {
  // #53 TODO: arithmetic sequence
  // ex: GET /arith-seq?start=3&diff=2&n=5
  const { start, diff, n } = req.query;
  const s = parseFloat(start);
  const d = parseFloat(diff);
  const count = parseInt(n);

  const seq = [];
  for (let i = 0; i < count; i++) {
    seq.push(s + i * d);
  }

  res.json({ result: seq });
});

app.get("/geo-seq", (req, res) => {
  // #54 TODO: geometric sequence
  // ex: GET /geo-seq?start=3&ratio=2&n=4
  const { start, ratio, n } = req.query;
  const s = parseFloat(start);
  const r = parseFloat(ratio);
  const count = parseInt(n);
  const geo = [];

  for (let i = 0; i < count; i++) {
    geo.push(s * Math.pow(r, i));
  }

  res.json({ result: geo });
});

app.get("/median", (req, res) => {
  // #55 TODO: median of numeric query values
  // ex: GET /median?a=10&b=2&c=7
  const { a, b, c } = req.query;
  const numbers = [a, b, c].map(Number);
  numbers.sort((a, b) => a - b);
  const mid = Math.floor(numbers.length / 2);
  let median;

  if (numbers.length % 2 === 0) {
    median = numbers[mid - 1] + numbers[mid] / 2;
  } else {
    median = numbers[mid];
  }

  res.json({ result: median });
});

// --- Dates / Time (56–65) ---
app.get("/time", (req, res) => {
  // #56 TODO: current time {iso, unix}
  // ex: GET /time
  const now = new Date();

  const data = {
    iso: now.toISOString(),
    unix: Math.floor(now.getTime() / 1000),
  };

  res.json(data);
});

app.get("/iso-to-unix", (req, res) => {
  // #57 TODO: convert ISO→unix
  // ex: GET /iso-to-unix?iso=2025-01-01T00:00:00Z
  const { iso } = req.query;
  const date = new Date(iso);
  const unix = Math.floor(date.getTime() / 1000);

  res.json({ unix: unix });
});

app.get("/unix-to-iso", (req, res) => {
  // #58 TODO: convert unix(ms)→ISO
  // ex: GET /unix-to-iso?unix=1735689600000
  const { unix } = req.query;
  const timeStamp = parseInt(unix);
  const date = new Date(timeStamp);

  res.json({ iso: date.toISOString() });
});

app.get("/today", (req, res) => {
  // #59 TODO: YYYY-MM-DD today
  // ex: GET /today
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;

  res.json({ Today: today });
});

app.get("/weekday", (req, res) => {
  // #60 TODO: weekday number 0=Sun..6=Sat
  // ex: GET /weekday?iso=2025-01-01T00:00:00Z
  const { iso } = req.query;
  const date = new Date(iso);
  const weekday = date.getUTCDay();

  res.json({ result: weekday });
});

app.get("/add-days", (req, res) => {
  // #61 TODO: add days to ISO date
  // ex: GET /add-days?iso=2025-01-01&days=3
  const { iso, days } = req.query;
  const date = new Date(iso);
  const numDays = parseInt(days);
  date.setUTCDate(date.getUTCDate() + numDays);

  res.json({ result: date.toISOString() });
});

app.get("/diff-days", (req, res) => {
  // #62 TODO: difference in days between two ISO dates
  // ex: GET /diff-days?from=2025-01-01&to=2025-01-10
  const { from, to } = req.query;
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffMs = toDate.getTime() - fromDate.getTime();

  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  res.json({ result: diffDays });
});

app.get("/is-leap/:year", (req, res) => {
  // #63 TODO: leap year true/false
  // ex: GET /is-leap/2024
});

app.get("/age", (req, res) => {
  // #64 TODO: age in years from dob
  // ex: GET /age?dob=1990-06-15
});

app.get("/month-days", (req, res) => {
  // #65 TODO: days in given month
  // ex: GET /month-days?year=2024&month=2
});

// --- Encoders / Parsers (66–77) ---
app.get("/base64/encode", (req, res) => {
  // #66 TODO: encode text base64
  // ex: GET /base64/encode?text=hi
});

app.get("/base64/decode", (req, res) => {
  // #67 TODO: decode base64
  // ex: GET /base64/decode?text=aGk=
});

app.get("/hex/encode", (req, res) => {
  // #68 TODO: encode hex
  // ex: GET /hex/encode?text=Hi
});

app.get("/hex/decode", (req, res) => {
  // #69 TODO: decode hex
  // ex: GET /hex/decode?text=4869
});

app.get("/url/encode", (req, res) => {
  // #70 TODO: encode URL
  // ex: GET /url/encode?text=a b
});

app.get("/url/decode", (req, res) => {
  // #71 TODO: decode URL
  // ex: GET /url/decode?text=a%20b
});

app.get("/int/parse", (req, res) => {
  // #72 TODO: parse int
  // ex: GET /int/parse?text=42
});

app.get("/float/parse", (req, res) => {
  // #73 TODO: parse float
  // ex: GET /float/parse?text=3.14
});

app.get("/bool/parse", (req, res) => {
  // #74 TODO: parse boolean
  // ex: GET /bool/parse?text=true
});

app.get("/json/pretty", (req, res) => {
  // #75 TODO: pretty JSON (input in query.text)
  // ex: GET /json/pretty?text={"a":1}
});

app.get("/csv/count", (req, res) => {
  // #76 TODO: count CSV items
  // ex: GET /csv/count?text=a,b,c
});

app.get("/words/count", (req, res) => {
  // #77 TODO: count words
  // ex: GET /words/count?text=hello%20%20world
});

// --- Validation (78–88) ---
app.get("/is-email", (req, res) => {
  // #78 TODO: email regex simple
  // ex: GET /is-email?text=user@example.com
});

app.get("/is-phone", (req, res) => {
  // #79 TODO: phone regex simple (+ optional, 7–15 digits)
  // ex: GET /is-phone?text=%2B9647710553120
});

app.get("/is-hex", (req, res) => {
  // #80 TODO: hex regex
  // ex: GET /is-hex?text=ff00aa
});

app.get("/is-binary", (req, res) => {
  // #81 TODO: binary regex
  // ex: GET /is-binary?text=101001
});

app.get("/is-int", (req, res) => {
  // #82 TODO: integer check
  // ex: GET /is-int?text=42
});

app.get("/is-float", (req, res) => {
  // #83 TODO: float check
  // ex: GET /is-float?text=3.14
});

app.get("/is-uppercase", (req, res) => {
  // #84 TODO: uppercase check
  // ex: GET /is-uppercase?text=HELLO
});

app.get("/is-lowercase", (req, res) => {
  // #85 TODO: lowercase check
  // ex: GET /is-lowercase?text=hello
});

app.get("/is-alpha", (req, res) => {
  // #86 TODO: only letters
  // ex: GET /is-alpha?text=abcXYZ
});

app.get("/is-alnum", (req, res) => {
  // #87 TODO: letters or digits
  // ex: GET /is-alnum?text=abc123
});

app.get("/len-between", (req, res) => {
  // #88 TODO: text length between min/max
  // ex: GET /len-between?text=hello&min=3&max=8
});

// --- Simple Logic / Games (89–96) ---
app.get("/palindrome/:text", (req, res) => {
  // #89 TODO: palindrome check
  // ex: GET /palindrome/level
});

app.get("/anagram", (req, res) => {
  // #90 TODO: anagram check ignore spaces/case
  // ex: GET /anagram?a=listen&b=silent
});

app.get("/vowels", (req, res) => {
  // #91 TODO: count vowels
  // ex: GET /vowels?text=hello
});

app.get("/consonants", (req, res) => {
  // #92 TODO: count consonants
  // ex: GET /consonants?text=world
});

app.get("/emoji/heart", (req, res) => {
  // #93 TODO: return ❤️
  // ex: GET /emoji/heart
});

app.get("/coinflip", (req, res) => {
  // #94 TODO: random heads/tails
  // ex: GET /coinflip
});

app.get("/dice/:sides", (req, res) => {
  // #95 TODO: random 1..sides
  // ex: GET /dice/20
});

app.get("/random/int", (req, res) => {
  // #96 TODO: random int inclusive [min,max]
  // ex: GET /random/int?min=5&max=10
});

// --- Misc (97–100) ---
app.get("/whoami", (req, res) => {
  // #97 TODO: return {ip, userAgent}
  // ex: GET /whoami
});

app.get("/uppercase/words", (req, res) => {
  // #98 TODO: uppercase all words
  // ex: GET /uppercase/words?text=hello%20world
});

app.get("/initials", (req, res) => {
  // #99 TODO: initials from full name -> "J.R.R.T"
  // ex: GET /initials?name=John%20Ronald%20Reuel%20Tolkien
});

app.get("/health", (req, res) => {
  // #100 TODO: return {status:"ok"}
  // ex: GET /health
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
