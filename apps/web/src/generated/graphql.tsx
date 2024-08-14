import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthType = {
  __typename?: 'AuthType';
  refreshToken: Scalars['String']['output'];
  session: Session;
  token: Scalars['String']['output'];
};

export type CreateAuthInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type CreateInviteInput = {
  /** The email of the invite */
  email: Scalars['String']['input'];
  /** The role of the invite */
  role: CreateInviteInput_RoleEnum_0;
};

/** The role of the invite */
export enum CreateInviteInput_RoleEnum_0 {
  Admin = 'ADMIN',
  Billing = 'BILLING',
  Member = 'MEMBER'
}

export type CreateOrganizationInput = {
  /** The domain of the organization */
  domain?: InputMaybe<Scalars['String']['input']>;
  /** The name of the organization */
  name: Scalars['String']['input'];
  /** The owner of the organization */
  ownerId: Scalars['String']['input'];
  /** Whether to attach users by domain */
  shouldAttachUsersByDomain: Scalars['Boolean']['input'];
  /** The slug of the organization */
  slug: Scalars['String']['input'];
};

export type CreateUserInput = {
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The name of the user */
  name: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type FilterMemberInput = {
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Filter */
  name?: Scalars['String']['input'];
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterOrganizationInput = {
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Filter */
  name?: Scalars['String']['input'];
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type FilterUserInput = {
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Filter */
  name?: Scalars['String']['input'];
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type Invite = {
  __typename?: 'Invite';
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  author?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  organization: Organization;
  rejectedAt?: Maybe<Scalars['DateTime']['output']>;
  role: Scalars['String']['output'];
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['String']['output'];
  organization: Organization;
  role: Scalars['String']['output'];
  sessions: Array<Session>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite: Invite;
  activateUser: User;
  blockUser: User;
  createInvite: Invite;
  createOrganization: Organization;
  createSession: AuthType;
  createUser: User;
  refreshSession: AuthType;
  rejectInvite: Invite;
  resetPassword: Scalars['Boolean']['output'];
  sendForgotPasswordEmail: Scalars['Boolean']['output'];
  updateAvatar: User;
  updateProfile: Organization;
  updateRole: User;
};


export type MutationAcceptInviteArgs = {
  id: Scalars['String']['input'];
};


export type MutationActivateUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationBlockUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateInviteArgs = {
  input: CreateInviteInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreateSessionArgs = {
  data: CreateAuthInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationRefreshSessionArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRejectInviteArgs = {
  id: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateAvatarArgs = {
  avatar: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};

export type Organization = {
  __typename?: 'Organization';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  domain?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  invites: Array<Invite>;
  members: Array<Member>;
  name: Scalars['String']['output'];
  owner: User;
  shouldAttachUsersByDomain: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  getTotalMembers: Scalars['Float']['output'];
  getTotalOrganizations: Scalars['Float']['output'];
  getTotalUsers: Scalars['Float']['output'];
  invite: Invite;
  member: Member;
  members: Array<Member>;
  organization: Organization;
  organizationBySlug: Organization;
  organizations: Array<Organization>;
  profile: User;
  session: Session;
  user: User;
  users: Array<User>;
};


export type QueryGetTotalMembersArgs = {
  filter?: InputMaybe<FilterMemberInput>;
};


export type QueryGetTotalOrganizationsArgs = {
  filter?: InputMaybe<FilterOrganizationInput>;
};


export type QueryGetTotalUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};


export type QueryInviteArgs = {
  id: Scalars['String']['input'];
};


export type QueryMemberArgs = {
  id: Scalars['String']['input'];
};


export type QueryMembersArgs = {
  filter?: InputMaybe<FilterMemberInput>;
};


export type QueryOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryOrganizationsArgs = {
  filter?: InputMaybe<FilterOrganizationInput>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<FilterUserInput>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  tokenId: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  member: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type UpdateOrganizationInput = {
  /** The id of the organization */
  id: Scalars['String']['input'];
  /** The name of the organization */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  role: UpdateRoleInput_RoleEnum_0;
  userId: Scalars['String']['input'];
};

/** Enum values for UpdateRoleInput.role */
export enum UpdateRoleInput_RoleEnum_0 {
  Admin = 'ADMIN',
  Default = 'DEFAULT'
}

export type User = {
  __typename?: 'User';
  activatedAt?: Maybe<Scalars['DateTime']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  blockedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  invites: Array<Invite>;
  ips: Scalars['String']['output'];
  member_on: Array<Member>;
  name: Scalars['String']['output'];
  owns_organizations: Array<Organization>;
  passwordUpdatedAt: Scalars['DateTime']['output'];
  role: Scalars['String']['output'];
  sessions: Array<Session>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string } };

export type SendForgotPasswordEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendForgotPasswordEmailMutation = { __typename?: 'Mutation', sendForgotPasswordEmail: boolean };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type GetAllUsersToOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersToOrganizationsQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string }> };

export type GetAllOrganizationsQueryVariables = Exact<{
  filter?: InputMaybe<FilterOrganizationInput>;
}>;


export type GetAllOrganizationsQuery = { __typename?: 'Query', getTotalOrganizations: number, organizations: Array<{ __typename?: 'Organization', id: string, name: string, slug: string, domain?: string | null, shouldAttachUsersByDomain: boolean, createdAt: any, owner: { __typename?: 'User', id: string, name: string, email: string }, members: Array<{ __typename?: 'Member', id: string, role: string, user: { __typename?: 'User', id: string, name: string, email: string } }> }> };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', id: string, name: string } };

export type GetAllUsersQueryVariables = Exact<{
  filter?: InputMaybe<FilterUserInput>;
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getTotalUsers: number, users: Array<{ __typename?: 'User', id: string, name: string, email: string, role: string, activatedAt?: any | null, blockedAt?: any | null, createdAt: any, sessions: Array<{ __typename?: 'Session', updatedAt: any }> }> };

export type BlockUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: { __typename?: 'User', id: string, blockedAt?: any | null } };

export type ActivateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'User', id: string, activatedAt?: any | null } };

export type UpdateRoleMutationVariables = Exact<{
  input: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'User', id: string, role: string } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', activatedAt?: any | null, avatarUrl?: string | null, blockedAt?: any | null, createdAt: any, email: string, id: string, name: string, passwordUpdatedAt: any, updatedAt: any, role: string } };


export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SendForgotPasswordEmailDocument = gql`
    mutation sendForgotPasswordEmail($email: String!) {
  sendForgotPasswordEmail(email: $email)
}
    `;
export type SendForgotPasswordEmailMutationFn = Apollo.MutationFunction<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;

/**
 * __useSendForgotPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendForgotPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendForgotPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendForgotPasswordEmailMutation, { data, loading, error }] = useSendForgotPasswordEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendForgotPasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>(SendForgotPasswordEmailDocument, options);
      }
export type SendForgotPasswordEmailMutationHookResult = ReturnType<typeof useSendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationResult = Apollo.MutationResult<SendForgotPasswordEmailMutation>;
export type SendForgotPasswordEmailMutationOptions = Apollo.BaseMutationOptions<SendForgotPasswordEmailMutation, SendForgotPasswordEmailMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const GetAllUsersToOrganizationsDocument = gql`
    query getAllUsersToOrganizations {
  users(filter: {limit: 10000}) {
    id
    name
    email
  }
}
    `;

/**
 * __useGetAllUsersToOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetAllUsersToOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersToOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersToOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersToOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersToOrganizationsQuery, GetAllUsersToOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersToOrganizationsQuery, GetAllUsersToOrganizationsQueryVariables>(GetAllUsersToOrganizationsDocument, options);
      }
export function useGetAllUsersToOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersToOrganizationsQuery, GetAllUsersToOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersToOrganizationsQuery, GetAllUsersToOrganizationsQueryVariables>(GetAllUsersToOrganizationsDocument, options);
        }
export function useGetAllUsersToOrganizationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersToOrganizationsQuery, GetAllUsersToOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersToOrganizationsQuery, GetAllUsersToOrganizationsQueryVariables>(GetAllUsersToOrganizationsDocument, options);
        }
export type GetAllUsersToOrganizationsQueryHookResult = ReturnType<typeof useGetAllUsersToOrganizationsQuery>;
export type GetAllUsersToOrganizationsLazyQueryHookResult = ReturnType<typeof useGetAllUsersToOrganizationsLazyQuery>;
export type GetAllUsersToOrganizationsSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersToOrganizationsSuspenseQuery>;
export type GetAllUsersToOrganizationsQueryResult = Apollo.QueryResult<GetAllUsersToOrganizationsQuery, GetAllUsersToOrganizationsQueryVariables>;
export const GetAllOrganizationsDocument = gql`
    query getAllOrganizations($filter: FilterOrganizationInput) {
  organizations(filter: $filter) {
    id
    name
    owner {
      id
      name
      email
    }
    slug
    domain
    shouldAttachUsersByDomain
    createdAt
    members {
      id
      role
      user {
        id
        name
        email
      }
    }
  }
  getTotalOrganizations(filter: $filter)
}
    `;

/**
 * __useGetAllOrganizationsQuery__
 *
 * To run a query within a React component, call `useGetAllOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrganizationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrganizationsQuery, GetAllOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrganizationsQuery, GetAllOrganizationsQueryVariables>(GetAllOrganizationsDocument, options);
      }
export function useGetAllOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrganizationsQuery, GetAllOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrganizationsQuery, GetAllOrganizationsQueryVariables>(GetAllOrganizationsDocument, options);
        }
export function useGetAllOrganizationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllOrganizationsQuery, GetAllOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllOrganizationsQuery, GetAllOrganizationsQueryVariables>(GetAllOrganizationsDocument, options);
        }
export type GetAllOrganizationsQueryHookResult = ReturnType<typeof useGetAllOrganizationsQuery>;
export type GetAllOrganizationsLazyQueryHookResult = ReturnType<typeof useGetAllOrganizationsLazyQuery>;
export type GetAllOrganizationsSuspenseQueryHookResult = ReturnType<typeof useGetAllOrganizationsSuspenseQuery>;
export type GetAllOrganizationsQueryResult = Apollo.QueryResult<GetAllOrganizationsQuery, GetAllOrganizationsQueryVariables>;
export const CreateOrganizationDocument = gql`
    mutation createOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    id
    name
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers($filter: FilterUserInput) {
  users(filter: $filter) {
    id
    name
    email
    role
    activatedAt
    blockedAt
    createdAt
    sessions {
      updatedAt
    }
  }
  getTotalUsers(filter: $filter)
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const BlockUserDocument = gql`
    mutation blockUser($id: String!) {
  blockUser(id: $id) {
    id
    blockedAt
  }
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const ActivateUserDocument = gql`
    mutation activateUser($id: String!) {
  activateUser(id: $id) {
    id
    activatedAt
  }
}
    `;
export type ActivateUserMutationFn = Apollo.MutationFunction<ActivateUserMutation, ActivateUserMutationVariables>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, options);
      }
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<ActivateUserMutation, ActivateUserMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation updateRole($input: UpdateRoleInput!) {
  updateRole(input: $input) {
    id
    role
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  profile {
    activatedAt
    avatarUrl
    blockedAt
    createdAt
    email
    id
    name
    passwordUpdatedAt
    updatedAt
    role
  }
}
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
      }
export function useGetMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export function useGetMyProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileSuspenseQueryHookResult = ReturnType<typeof useGetMyProfileSuspenseQuery>;
export type GetMyProfileQueryResult = Apollo.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;