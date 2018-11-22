import * as argon from "argon2";

// import { MutationResolvers } from "../../../types";
import { User } from "../../../entity/User";
import { getConnection } from "typeorm";
// import { registerSchema } from "@code-review/common";
// import { formatYupErrors } from "../../../utils/formatYupErrors";

// TODO: Context Types 112120181922

const invalidLoginResponse = {
  errors: [
    {
      path: "password",
      message: "invalid login"
    }
  ],
  user: null
};

export const resolvers = {
  login: async (_, { input }, { req }) => {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", {
        email: input.usernameOrEmail
      })
      .orWhere("user.username = :username", {
        username: input.usernameOrEmail
      })
      .getOne();

    if (!user) {
      return invalidLoginResponse;
    }

    const valid = await argon.verify(user.password, input.password);

    if (!valid) {
      return invalidLoginResponse;
    }

    if (!valid) {
    }

    req.session!.userId = user.id;

    console.log("===", "valid!", "===");

    return {
      errors: [],
      user
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
