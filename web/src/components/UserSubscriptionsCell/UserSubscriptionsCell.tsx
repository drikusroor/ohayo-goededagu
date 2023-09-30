import { useMemo } from 'react'

import type { UserSubscriptionsQuery } from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserSubscriptionsAuthorSelector from '../UserSubscriptionsAuthorSelector/UserSubscriptionsAuthorSelector'
import UserSubscriptionsCheckbox from '../UserSubscriptionsCheckbox/UserSubscriptionsCheckbox'

export const QUERY = gql`
  query FindUsersWithPostsForSubscriptionsCellQuery($id: Int!) {
    users: usersWithPosts {
      id
      profile {
        name
        avatar
      }
    }
    user(id: $id) {
      id
      email
      name
      profile {
        id
        bio
        createdAt
        updatedAt
        avatar
        name
        japaneseName
      }
      userSubscriptions {
        id
        type
        target
      }
    }
  }
`

const CREATE_USER_SUBSCRIPTIONS_MUTATION = gql`
  mutation CustomCreateUserSubscriptionMutation(
    $input: CreateUserSubscriptionInput!
  ) {
    createUserSubscription(input: $input) {
      id
      type
    }
  }
`

const DELETE_USER_SUBSCRIPTION_MUTATION = gql`
  mutation CustomDeleteUserSubscriptionMutation($id: Int!) {
    deleteUserSubscription(id: $id) {
      id
      type
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  users,
  user,
}: CellSuccessProps<UserSubscriptionsQuery>) => {
  const { userSubscriptions = [] } = user

  const selected = useMemo(() => {
    return userSubscriptions
      .filter((us) => us.type === 'POST_AUTHOR')
      .map((us) => us.target)
  }, [userSubscriptions])

  const newsletterSubscription = useMemo(() => {
    return userSubscriptions.find((us) => us.type === 'POST_NEWSLETTER')
  }, [userSubscriptions])

  const commentSubscription = useMemo(() => {
    return userSubscriptions.find((us) => us.type === 'COMMENT')
  }, [userSubscriptions])

  const [createUserSubscriptions, { loading: createLoading }] = useMutation(
    CREATE_USER_SUBSCRIPTIONS_MUTATION,
    {
      onCompleted: (data) => {
        const subscriptionType =
          data.createUserSubscription.type === 'POST_AUTHOR'
            ? 'auteur'
            : 'reacties'

        toast.success(`Geabonneerd op ${subscriptionType}`)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { id: user.id } }],
      awaitRefetchQueries: true,
    }
  )

  const [onDeleteUserSubscription, { loading: deleteLoading }] = useMutation(
    DELETE_USER_SUBSCRIPTION_MUTATION,
    {
      onCompleted: (data) => {
        const subscriptionType =
          data.deleteUserSubscription.type === 'POST_AUTHOR'
            ? 'auteur'
            : 'reacties'

        toast.success(`Abonnement op ${subscriptionType} opgezegd`)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { id: user.id } }],
      awaitRefetchQueries: true,
    }
  )

  const onToggleUserSubscriptionUser = (id: number) => {
    const userSubscription = user.userSubscriptions.find(
      (us) => us.target === id
    )

    if (userSubscription) {
      return onDeleteUserSubscription({
        variables: { id: userSubscription.id },
      })
    }

    return createUserSubscriptions({
      variables: {
        input: {
          type: 'POST_AUTHOR',
          target: id,
          userId: user.id,
        },
      },
    })
  }

  const onToggleUserSubscriptionNewsletter = (id?: number) => {
    // if id is defined, delete the subscription
    if (id) {
      return onDeleteUserSubscription({
        variables: { id: id },
      })
    }

    // if id is undefined, create the subscription
    return createUserSubscriptions({
      variables: {
        input: {
          type: 'POST_NEWSLETTER',
          userId: user.id,
        },
      },
    })
  }

  const onToggleUserSubscriptionComments = (id?: number) => {
    // if id is defined, delete the subscription
    if (id) {
      return onDeleteUserSubscription({
        variables: { id: id },
      })
    }

    // if id is undefined, create the subscription
    return createUserSubscriptions({
      variables: {
        input: {
          type: 'COMMENT',
          userId: user.id,
        },
      },
    })
  }

  return (
    <>
      <div className="rw-segment mt-5">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Abonneren op posts van auteurs:
          </h2>
        </header>

        <div className="rw-segment-main">
          <p className="text-sm text-gray-500">
            <b>Let op:</b> je ontvangt voor elke nieuwe post een e-mail. Je kunt
            je abonnement opzeggen door de auteur te deselecteren.
          </p>
          <div className="mt-3">
            <UserSubscriptionsAuthorSelector
              users={users}
              selected={selected}
              onSelect={onToggleUserSubscriptionUser}
            />
          </div>
        </div>
      </div>
      <div className="rw-segment mt-5">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Ontvang dagelijks een overzicht van nieuwe posts:
          </h2>
        </header>

        <div className="rw-segment-main">
          <p className="text-sm text-gray-500">
            Als je liever niet voor élke nieuwe post een e-mail ontvangt, kun je
            je abonneren op een periodiek overzicht van nieuwe posts. Wij zijn
            voornemens om dit overzicht elke 1-2 dagen te versturen.
          </p>
          <div className="mt-3">
            <UserSubscriptionsCheckbox
              label="Abonneren op nieuwsbrief"
              userSubscriptionId={newsletterSubscription?.id}
              onToggleUserSubscription={onToggleUserSubscriptionNewsletter}
              loading={createLoading || deleteLoading}
            />
          </div>
        </div>
      </div>
      <div className="rw-segment mt-5">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Abonneren op reacties op mijn reacties:
          </h2>
        </header>

        <div className="rw-segment-main">
          <p className="text-sm text-gray-500">
            Soms is het leuk om te weten of er op jouw reactie is gereageerd. Je
            moet natuurlijk wel af en toe een snedige reactie plaatsen om dit te
            ervaren.
          </p>
          <div className="mt-3">
            <UserSubscriptionsCheckbox
              label="Abonneren op reacties op mijn reacties"
              userSubscriptionId={commentSubscription?.id}
              onToggleUserSubscription={onToggleUserSubscriptionComments}
              loading={createLoading || deleteLoading}
            />
          </div>
        </div>
      </div>
    </>
  )
}
