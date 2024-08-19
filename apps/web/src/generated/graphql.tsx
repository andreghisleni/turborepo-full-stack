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
  /** The invite id of the user */
  inviteId?: InputMaybe<Scalars['String']['input']>;
  /** The name of the user */
  name: Scalars['String']['input'];
  /** The password of the user */
  password: Scalars['String']['input'];
};

export type FilterInput = {
  /** Filter */
  filter?: Scalars['String']['input'];
  /** Limit */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Page */
  page?: InputMaybe<Scalars['Float']['input']>;
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
  createdAt: Scalars['DateTime']['output'];
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
  updateMemberRole: Member;
  updateProfile: Organization;
  updateRole: User;
  updateSession: Session;
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


export type MutationUpdateMemberRoleArgs = {
  input: UpdateMemberRoleInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUpdateSessionArgs = {
  slug: Scalars['String']['input'];
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
  getTotalInvites: Scalars['Float']['output'];
  getTotalMembers: Scalars['Float']['output'];
  getTotalOrganizations: Scalars['Float']['output'];
  getTotalUsers: Scalars['Float']['output'];
  invite: Invite;
  invites: Array<Invite>;
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


export type QueryGetTotalInvitesArgs = {
  filter?: InputMaybe<FilterInput>;
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


export type QueryInvitesArgs = {
  filter?: InputMaybe<FilterInput>;
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
  member: Member;
  organization: Organization;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type UpdateMemberRoleInput = {
  memberId: Scalars['String']['input'];
  role: UpdateMemberRoleInput_RoleEnum_0;
};

/** Enum values for UpdateMemberRoleInput.role */
export enum UpdateMemberRoleInput_RoleEnum_0 {
  Admin = 'ADMIN',
  Billing = 'BILLING',
  Member = 'MEMBER'
}

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


export type GetAllOrganizationsQuery = { __typename?: 'Query', getTotalOrganizations: number, organizations: Array<{ __typename?: 'Organization', id: string, name: string, slug: string, domain?: string | null, shouldAttachUsersByDomain: boolean, avatarUrl?: string | null, createdAt: any, owner: { __typename?: 'User', id: string, name: string, email: string }, members: Array<{ __typename?: 'Member', id: string, role: string, user: { __typename?: 'User', id: string, name: string, email: string } }> }> };

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

export type GetAllInvitesQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
}>;


export type GetAllInvitesQuery = { __typename?: 'Query', getTotalInvites: number, invites: Array<{ __typename?: 'Invite', id: string, email: string, role: string, createdAt: any, acceptedAt?: any | null, rejectedAt?: any | null, author?: { __typename?: 'User', name: string, email: string } | null }> };

export type CreateInviteMutationVariables = Exact<{
  input: CreateInviteInput;
}>;


export type CreateInviteMutation = { __typename?: 'Mutation', createInvite: { __typename?: 'Invite', id: string, role: string, createdAt: any } };

export type GetAllMembersQueryVariables = Exact<{
  filter?: InputMaybe<FilterMemberInput>;
}>;


export type GetAllMembersQuery = { __typename?: 'Query', getTotalMembers: number, members: Array<{ __typename?: 'Member', id: string, role: string, createdAt: any, user: { __typename?: 'User', id: string, email: string, name: string } }> };

export type UpdateMemberRoleMutationVariables = Exact<{
  input: UpdateMemberRoleInput;
}>;


export type UpdateMemberRoleMutation = { __typename?: 'Mutation', updateMemberRole: { __typename?: 'Member', id: string, role: string } };

export type GetMyInviteQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMyInviteQuery = { __typename?: 'Query', invite: { __typename?: 'Invite', id: string, acceptedAt?: any | null, rejectedAt?: any | null, author?: { __typename?: 'User', name: string } | null, organization: { __typename?: 'Organization', name: string, slug: string } } };

export type AcceptInviteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: { __typename?: 'Invite', id: string } };

export type RejectInviteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RejectInviteMutation = { __typename?: 'Mutation', rejectInvite: { __typename?: 'Invite', id: string } };

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
    avatarUrl
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
export const GetAllInvitesDocument = gql`
    query getAllInvites($filter: FilterInput) {
  invites(filter: $filter) {
    id
    email
    role
    createdAt
    author {
      name
      email
    }
    acceptedAt
    rejectedAt
  }
  getTotalInvites(filter: $filter)
}
    `;

/**
 * __useGetAllInvitesQuery__
 *
 * To run a query within a React component, call `useGetAllInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllInvitesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllInvitesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllInvitesQuery, GetAllInvitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllInvitesQuery, GetAllInvitesQueryVariables>(GetAllInvitesDocument, options);
      }
export function useGetAllInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllInvitesQuery, GetAllInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllInvitesQuery, GetAllInvitesQueryVariables>(GetAllInvitesDocument, options);
        }
export function useGetAllInvitesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllInvitesQuery, GetAllInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllInvitesQuery, GetAllInvitesQueryVariables>(GetAllInvitesDocument, options);
        }
export type GetAllInvitesQueryHookResult = ReturnType<typeof useGetAllInvitesQuery>;
export type GetAllInvitesLazyQueryHookResult = ReturnType<typeof useGetAllInvitesLazyQuery>;
export type GetAllInvitesSuspenseQueryHookResult = ReturnType<typeof useGetAllInvitesSuspenseQuery>;
export type GetAllInvitesQueryResult = Apollo.QueryResult<GetAllInvitesQuery, GetAllInvitesQueryVariables>;
export const CreateInviteDocument = gql`
    mutation createInvite($input: CreateInviteInput!) {
  createInvite(input: $input) {
    id
    role
    createdAt
  }
}
    `;
export type CreateInviteMutationFn = Apollo.MutationFunction<CreateInviteMutation, CreateInviteMutationVariables>;

/**
 * __useCreateInviteMutation__
 *
 * To run a mutation, you first call `useCreateInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInviteMutation, { data, loading, error }] = useCreateInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateInviteMutation, CreateInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInviteMutation, CreateInviteMutationVariables>(CreateInviteDocument, options);
      }
export type CreateInviteMutationHookResult = ReturnType<typeof useCreateInviteMutation>;
export type CreateInviteMutationResult = Apollo.MutationResult<CreateInviteMutation>;
export type CreateInviteMutationOptions = Apollo.BaseMutationOptions<CreateInviteMutation, CreateInviteMutationVariables>;
export const GetAllMembersDocument = gql`
    query getAllMembers($filter: FilterMemberInput) {
  members(filter: $filter) {
    id
    role
    user {
      id
      email
      name
    }
    createdAt
  }
  getTotalMembers(filter: $filter)
}
    `;

/**
 * __useGetAllMembersQuery__
 *
 * To run a query within a React component, call `useGetAllMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMembersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMembersQuery, GetAllMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMembersQuery, GetAllMembersQueryVariables>(GetAllMembersDocument, options);
      }
export function useGetAllMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMembersQuery, GetAllMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMembersQuery, GetAllMembersQueryVariables>(GetAllMembersDocument, options);
        }
export function useGetAllMembersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllMembersQuery, GetAllMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllMembersQuery, GetAllMembersQueryVariables>(GetAllMembersDocument, options);
        }
export type GetAllMembersQueryHookResult = ReturnType<typeof useGetAllMembersQuery>;
export type GetAllMembersLazyQueryHookResult = ReturnType<typeof useGetAllMembersLazyQuery>;
export type GetAllMembersSuspenseQueryHookResult = ReturnType<typeof useGetAllMembersSuspenseQuery>;
export type GetAllMembersQueryResult = Apollo.QueryResult<GetAllMembersQuery, GetAllMembersQueryVariables>;
export const UpdateMemberRoleDocument = gql`
    mutation updateMemberRole($input: UpdateMemberRoleInput!) {
  updateMemberRole(input: $input) {
    id
    role
  }
}
    `;
export type UpdateMemberRoleMutationFn = Apollo.MutationFunction<UpdateMemberRoleMutation, UpdateMemberRoleMutationVariables>;

/**
 * __useUpdateMemberRoleMutation__
 *
 * To run a mutation, you first call `useUpdateMemberRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemberRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemberRoleMutation, { data, loading, error }] = useUpdateMemberRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMemberRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMemberRoleMutation, UpdateMemberRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMemberRoleMutation, UpdateMemberRoleMutationVariables>(UpdateMemberRoleDocument, options);
      }
export type UpdateMemberRoleMutationHookResult = ReturnType<typeof useUpdateMemberRoleMutation>;
export type UpdateMemberRoleMutationResult = Apollo.MutationResult<UpdateMemberRoleMutation>;
export type UpdateMemberRoleMutationOptions = Apollo.BaseMutationOptions<UpdateMemberRoleMutation, UpdateMemberRoleMutationVariables>;
export const GetMyInviteDocument = gql`
    query getMyInvite($id: String!) {
  invite(id: $id) {
    id
    author {
      name
    }
    organization {
      name
      slug
    }
    acceptedAt
    rejectedAt
  }
}
    `;

/**
 * __useGetMyInviteQuery__
 *
 * To run a query within a React component, call `useGetMyInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyInviteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMyInviteQuery(baseOptions: Apollo.QueryHookOptions<GetMyInviteQuery, GetMyInviteQueryVariables> & ({ variables: GetMyInviteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyInviteQuery, GetMyInviteQueryVariables>(GetMyInviteDocument, options);
      }
export function useGetMyInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyInviteQuery, GetMyInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyInviteQuery, GetMyInviteQueryVariables>(GetMyInviteDocument, options);
        }
export function useGetMyInviteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMyInviteQuery, GetMyInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMyInviteQuery, GetMyInviteQueryVariables>(GetMyInviteDocument, options);
        }
export type GetMyInviteQueryHookResult = ReturnType<typeof useGetMyInviteQuery>;
export type GetMyInviteLazyQueryHookResult = ReturnType<typeof useGetMyInviteLazyQuery>;
export type GetMyInviteSuspenseQueryHookResult = ReturnType<typeof useGetMyInviteSuspenseQuery>;
export type GetMyInviteQueryResult = Apollo.QueryResult<GetMyInviteQuery, GetMyInviteQueryVariables>;
export const AcceptInviteDocument = gql`
    mutation acceptInvite($id: String!) {
  acceptInvite(id: $id) {
    id
  }
}
    `;
export type AcceptInviteMutationFn = Apollo.MutationFunction<AcceptInviteMutation, AcceptInviteMutationVariables>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptInviteMutation, AcceptInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptInviteMutation, AcceptInviteMutationVariables>(AcceptInviteDocument, options);
      }
export type AcceptInviteMutationHookResult = ReturnType<typeof useAcceptInviteMutation>;
export type AcceptInviteMutationResult = Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const RejectInviteDocument = gql`
    mutation rejectInvite($id: String!) {
  rejectInvite(id: $id) {
    id
  }
}
    `;
export type RejectInviteMutationFn = Apollo.MutationFunction<RejectInviteMutation, RejectInviteMutationVariables>;

/**
 * __useRejectInviteMutation__
 *
 * To run a mutation, you first call `useRejectInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectInviteMutation, { data, loading, error }] = useRejectInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRejectInviteMutation(baseOptions?: Apollo.MutationHookOptions<RejectInviteMutation, RejectInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectInviteMutation, RejectInviteMutationVariables>(RejectInviteDocument, options);
      }
export type RejectInviteMutationHookResult = ReturnType<typeof useRejectInviteMutation>;
export type RejectInviteMutationResult = Apollo.MutationResult<RejectInviteMutation>;
export type RejectInviteMutationOptions = Apollo.BaseMutationOptions<RejectInviteMutation, RejectInviteMutationVariables>;
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