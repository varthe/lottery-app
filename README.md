# Lottery number generator

## Approach
Simple lottery number generator created using HTML, CSS, JavaScript and a Node.js server.

I decided to use a server for the number generation logic to prevent predictability and manipulation. Generating numbers client-side would allow users to replicate the results, which defeats the purpose of randomness. The server uses Node's built-in `crypto` module instead of `Math.random()` as it's better at generating random numbers with less bias.

The frontend fetches numbers from the server, then renders them in the browser with colored backgrounds based on their value. The bonus ball is generated after the main six and displayed separately.

## How to run

### Option 1 - Node 
1. Download the latest version of Node.js from https://nodejs.org/en
2. Download the code or clone the repository
3. Run `node main.js`

### Option 2 - Docker
1. Download the code or clone the repository
2. Run `docker build -t lottery-app .`
3. Run `docker run -p 3000:3000 lottery-app`

