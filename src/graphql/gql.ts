/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      name\n      email\n    }\n  }\n": typeof types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": typeof types.DeleteUserDocument,
    "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n      price\n      stock\n      updatedAt\n    }\n  }\n": typeof types.UpdateProductDocument,
    "\n  mutation DeleteProduct($id: ID!) {\n    deleteProduct(id: $id)\n  }\n": typeof types.DeleteProductDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n": typeof types.MeDocument,
    "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n    }\n  }\n": typeof types.GetUserDocument,
    "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n": typeof types.GetUsersDocument,
    "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GetProductsDocument,
};
const documents: Documents = {
    "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      name\n      email\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n": types.DeleteUserDocument,
    "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n      price\n      stock\n      updatedAt\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation DeleteProduct($id: ID!) {\n    deleteProduct(id: $id)\n  }\n": types.DeleteProductDocument,
    "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n": types.MeDocument,
    "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n": types.GetUsersDocument,
    "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetProductDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      name\n      email\n    }\n  }\n"): typeof import('./graphql').CreateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {\n    updateUser(id: $id, input: $input) {\n      id\n      name\n      email\n    }\n  }\n"): typeof import('./graphql').UpdateUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($id: ID!) {\n    deleteUser(id: $id)\n  }\n"): typeof import('./graphql').DeleteUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($input: CreateProductInput!) {\n    createProduct(input: $input) {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').CreateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $id, input: $input) {\n      id\n      name\n      price\n      stock\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').UpdateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteProduct($id: ID!) {\n    deleteProduct(id: $id)\n  }\n"): typeof import('./graphql').DeleteProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      name\n      email\n    }\n  }\n"): typeof import('./graphql').MeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n    }\n  }\n"): typeof import('./graphql').GetUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers {\n    users {\n      id\n      name\n      email\n    }\n  }\n"): typeof import('./graphql').GetUsersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProduct($id: ID!) {\n    product(id: $id) {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').GetProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts {\n    products {\n      id\n      name\n      price\n      stock\n      createdAt\n      updatedAt\n    }\n  }\n"): typeof import('./graphql').GetProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
