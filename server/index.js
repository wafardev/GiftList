const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList");
const merkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

// hardcoded merkle root in the server database
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";
app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // verify the proof here
  const isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("No gift for you :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
