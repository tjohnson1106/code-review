export interface LoginInput {
  usernameOrEmail: string;

  password: string;
}

export interface RegisterInput {
  username: string;

  email: string;

  password: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: User | null;
}

export interface User {
  id: string;

  username: string;

  email: string;
}

export interface Mutation {
  login: LoginResponse;

  register: RegisterResponse;
}

export interface LoginResponse {
  errors?: Error[] | null;

  user: User;
}

export interface Error {
  path: string;

  message: string;
}

export interface RegisterResponse {
  errors?: Error[] | null;
}

// ====================================================
// Arguments
// ====================================================

export interface LoginMutationArgs {
  input: LoginInput;
}
export interface RegisterMutationArgs {
  input: RegisterInput;
}

import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    me?: MeResolver<User | null, TypeParent, Context>;
  }

  export type MeResolver<R = User | null, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    username?: UsernameResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UsernameResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    login?: LoginResolver<LoginResponse, TypeParent, Context>;

    register?: RegisterResolver<RegisterResponse, TypeParent, Context>;
  }

  export type LoginResolver<
    R = LoginResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    input: LoginInput;
  }

  export type RegisterResolver<
    R = RegisterResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, RegisterArgs>;
  export interface RegisterArgs {
    input: RegisterInput;
  }
}

export namespace LoginResponseResolvers {
  export interface Resolvers<Context = {}, TypeParent = LoginResponse> {
    errors?: ErrorsResolver<Error[] | null, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;
  }

  export type ErrorsResolver<
    R = Error[] | null,
    Parent = LoginResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User,
    Parent = LoginResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ErrorResolvers {
  export interface Resolvers<Context = {}, TypeParent = Error> {
    path?: PathResolver<string, TypeParent, Context>;

    message?: MessageResolver<string, TypeParent, Context>;
  }

  export type PathResolver<R = string, Parent = Error, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type MessageResolver<
    R = string,
    Parent = Error,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace RegisterResponseResolvers {
  export interface Resolvers<Context = {}, TypeParent = RegisterResponse> {
    errors?: ErrorsResolver<Error[] | null, TypeParent, Context>;
  }

  export type ErrorsResolver<
    R = Error[] | null,
    Parent = RegisterResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}
