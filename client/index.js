const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const verifyProof = require("../utils/verifyProof");

const serverUrl = "http://localhost:1225";

async function main() {
  // fetch the name from the command line
  // no name in the command line args, no verification
  if (process.argv.length < 3)
    console.log("Please provide a name for verification.");
  else {
    // if name in multiple words, they are joined
    const name = process.argv.slice(2).join(" ");

    const merkleTree = new MerkleTree(niceList);
    const proof = merkleTree.getProof(niceList.findIndex((n) => n === name));

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      // send the proof and name to the server
      name,
      proof,
    });

    console.log({ gift });
  }
}

main();
