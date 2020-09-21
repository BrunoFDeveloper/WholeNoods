import { createConnection } from "typeorm";
import { User, UserType } from "../entities/User";

async function main() {
  await createConnection(require("../../ormconfig.js"));

  if (
    !(await User.findOne({ where: { email: "admin@vapejuicejordan.rip" } }))
  ) {
    const user = User.create({
      email: "admin@vapejuicejordan.rip",
      displayName: "Jordan",
      legalName: "Jordan Gensler",
      bio: "I created this site, what else do you want to know?",
      type: UserType.CREATOR,
    });

    await user.setPassword("admin");

    await user.save();
  }
}

main();
