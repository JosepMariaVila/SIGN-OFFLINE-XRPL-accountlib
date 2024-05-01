if (process.argv.length < 3) {
  console.log("\n\nUsage: node indexsubmit <account> <tx_blob>\n\n");
  process.exit(1);
}
import { XrplClient } from "xrpl-client";

const client = new XrplClient("wss://s.altnet.rippletest.net:51233");

const main = async () => {
  const data = await client.send({
    id: 1,
    command: "account_info",
    account: process.argv[2],
    strict: true,
  });

  if (data.error) {
    console.log("Error: ", data.error_messsage);
    process.exit(1);
  }
  console.log("Balance: ", Number(data.account_data.Balance) / 1000000);

  await client.send({
    command: "subscribe",
    accounts: [process.argv[2]],
  });

  const result = await client.send({
    command: "submit",
    tx_blob: process.argv[3],
  });
  console.log("result ", result);

  client.on(
    "transaction",
    ({
      transaction,
      meta,
      ledger_index,
      engine_result,
      engine_result_message,
    }) => {
      if (transaction.hash) {
        console.log(`Transaction in Ledger: ${ledger_index}`);
        console.log(`Transaction status: ${engine_result}`);
        console.log(`Transaction Message: ${engine_result_message} `);
      }
      if (typeof meta.delivered_amount === "string") {
        const amount = Number(meta.delivered_amount) / 1_000_000;
        console.log(`Delivered amount is: ${amount} XRP.`);
      } else {
        console.log(
          `Delivered amount is: ${meta.delivered_amount.value} ${meta.delivered_amount.currency}.`
        );
      }
      client.close();
    }
  );

  client.on("ledger", ({ ledger_index }) => {
    if (ledger_index > data.ledger_current_index + 2) {
      console.log(`Past last ledger & the transaction is not seen.`);
      console.log("Transaction failed!");
      client.close();
    }
  });
};
main();
