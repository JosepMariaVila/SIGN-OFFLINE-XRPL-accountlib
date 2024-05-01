if (process.argv.length < 7) {
  console.log(
    "\n\nUsage: node indexsign <secret_type> <secret> <destination_address> <amount> <sequence>\n\n"
  );
  console.log("secret type\n1. familySeed\n2. Mnemonic\n\n");
  process.exit(1);
}
import { utils, derive, sign } from "xrpl-accountlib";

const main = async () => {
  let account: any;

  if (isNaN(Number(process.argv[5]))) {
    console.log("\nPlease enter a valid amount to transfer\n");
    process.exit(1);
  }
  if (process.argv[2] !== "1" && process.argv[2] !== "2") {
    console.log("\nPlease enter appropriate secret_type from the menu.\n");
    process.exit(1);
  }
  if (!utils.isValidAddress(process.argv[4])) {
    console.log(
      "\nYou have entered invalid r-address as destination address\n"
    );
    process.exit(1);
  }
  if (process.argv[2] === "1") {
    if (!utils.isValidSeed(process.argv[3])) {
      console.log("Invalid familySeed");
      process.exit(1);
    }
    account = derive.familySeed(process.argv[3]);
  }
  if (process.argv[2] === "2") {
    if (!utils.isValidMnemnic(process.argv[3])) {
      console.log("Invalid Mnemonic");
      process.exit(1);
    }
    account = derive.mnemonic(process.argv[3]);
  }

  const { id, signedTransaction } = sign(
    {
      TransactionType: "Payment",
      Account: account.address,
      Destination: process.argv[4],
      Amount: String(Number(process.argv[5]) * 1_000_000),
      Sequence: process.argv[6],
      Fee: String(12),
    },
    account
  );

  console.log("id ", id);
  console.log("signedTransaction ", signedTransaction);
};
main();
