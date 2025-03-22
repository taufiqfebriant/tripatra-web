import { graphql } from "@/graphql";

export const LoginDocument = graphql(`
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
`);

export const CreateUserDocument = graphql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`);

export const UpdateUserDocument = graphql(`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
    }
  }
`);

export const DeleteUserDocument = graphql(`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`);

export const CreateProductDocument = graphql(`
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
`);

export const UpdateProductDocument = graphql(`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      stock
      updatedAt
    }
  }
`);

export const DeleteProductDocument = graphql(`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`);

export const MeDocument = graphql(`
  query Me {
    me {
      id
      name
      email
    }
  }
`);

export const GetUserDocument = graphql(`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`);

export const GetUsersDocument = graphql(`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`);

export const GetProductDocument = graphql(`
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
`);

export const GetProductsDocument = graphql(`
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
`);
