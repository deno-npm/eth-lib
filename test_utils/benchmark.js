import {
  dataTree,
} from "./randomData.js";
import * as rlp from "../src/rlp.js";
import {
  rlp as rlp_decoder,
} from "../deps.js";
const ref = { rlp: rlp_decoder };
const cps = (f) => {
  for (var t = Date.now(), i = 0; Date.now() - t < 1000; ++i) {
    f();
  }
  return i;
};

let dataTrees = [];
for (let i = 0; i < 64; ++i) {
  dataTrees.push(dataTree());
}
console.log("Benchmarking Eth-Lib's RLP implementation vs the one on NPM.");
const liteCps = cps(() => dataTrees.map((dt) => rlp.decode(rlp.encode(dt))));
const npmCps = cps(() =>
  dataTrees.map((dt) => ref.rlp.decode(ref.rlp.encode(dt)))
);
console.log("- Eth-Lib: " + liteCps + " calls per second.");
console.log("- Reference: " + npmCps + " calls per second.");
console.log(
  "- Eth-Lib is: " + (liteCps / npmCps).toFixed(2) + " " +
    (liteCps > npmCps ? "faster" : "slower") + " than reference.",
);
