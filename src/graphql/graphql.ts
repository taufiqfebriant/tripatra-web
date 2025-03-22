/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  user: User;
};

export type CreateProductInput = {
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  createUser: User;
  deleteProduct: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: AuthResponse;
  updateProduct: Product;
  updateUser: User;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stock: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  product?: Maybe<Product>;
  products: Array<Product>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type UpdateProductInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', id: string, name: string, email: string } } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, name: string, price: number, stock: number, createdAt: string, updatedAt: string } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string, name: string, price: number, stock: number, updatedAt: string } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, email: string } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, email: string } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, price: number, stock: number, createdAt: string, updatedAt: string } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, price: number, stock: number, createdAt: string, updatedAt: string }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const LoginDocument = new TypedDocumentString(`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    user {
      id
      name
      email
    }
  }
}
    `) as unknown as TypedDocumentString<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = new TypedDocumentString(`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
    `) as unknown as TypedDocumentString<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = new TypedDocumentString(`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}
    `) as unknown as TypedDocumentString<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = new TypedDocumentString(`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `) as unknown as TypedDocumentString<DeleteUserMutation, DeleteUserMutationVariables>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    price
    stock
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = new TypedDocumentString(`
    mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    price
    stock
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = new TypedDocumentString(`
    mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}
    `) as unknown as TypedDocumentString<DeleteProductMutation, DeleteProductMutationVariables>;
export const MeDocument = new TypedDocumentString(`
    query Me {
  me {
    id
    name
    email
  }
}
    `) as unknown as TypedDocumentString<MeQuery, MeQueryVariables>;
export const GetUserDocument = new TypedDocumentString(`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
  }
}
    `) as unknown as TypedDocumentString<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = new TypedDocumentString(`
    query GetUsers {
  users {
    id
    name
    email
  }
}
    `) as unknown as TypedDocumentString<GetUsersQuery, GetUsersQueryVariables>;
export const GetProductDocument = new TypedDocumentString(`
    query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price
    stock
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<GetProductQuery, GetProductQueryVariables>;
export const GetProductsDocument = new TypedDocumentString(`
    query GetProducts {
  products {
    id
    name
    price
    stock
    createdAt
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<GetProductsQuery, GetProductsQueryVariables>;