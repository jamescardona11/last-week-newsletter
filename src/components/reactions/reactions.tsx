import { useEffect, useState } from 'react'
import { ReactionCard } from './reactions-card'
import { type ReactionType, type ReactionsModel } from '@lib/models/reactions'

function Reactions({ slug, vertical }: { slug: string; vertical?: boolean }) {
  const style = vertical != null ? 'flex flex-col gap-2' : 'flex gap-2'

  const [contentReactions, setContentReactions] =
    useState<ReactionsModel | null>(null)
  const [userReactions, setUserReactions] = useState<ReactionsModel>(
    defaultReactions()
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reactions = await fetch(`/api/reactions/${slug}`).then(res =>
          res.json()
        )

        setContentReactions(reactions.content)
        setUserReactions(reactions.user)
      } catch (error) {
        setContentReactions(defaultReactions())
        setUserReactions(defaultReactions())
        console.error('Fetch error:', error)
      }
    }

    fetchData()
  }, [])

  const incrementCB = async (type: ReactionType) => {
    const url = `/api/reactions/${slug}`
    try {
      await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          type: type,
          action: 'increment'
        })
      }).then(res => res.json())

      let cr = updateReactions(contentReactions!, type, 1)
      let ur = updateReactions(userReactions!, type, 1)

      setContentReactions(cr)
      setUserReactions(ur)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const decrementCB = async (type: ReactionType) => {
    const url = `/api/reactions/${slug}`
    try {
      await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          type: type,
          action: 'decrement'
        })
      }).then(res => res.json())
      let cr = updateReactions(contentReactions!, type, -1)
      let ur = updateReactions(userReactions!, type, -1)

      setContentReactions(cr)
      setUserReactions(ur)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  return (
    <div className={style}>
      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'likes'}
        color='#4078c0'
        count={contentReactions?.likes}
        isActive={userReactions.likes > 0}
      />

      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'loves'}
        color='#c94091'
        count={contentReactions?.loves}
        isActive={userReactions.loves > 0}
      />

      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'claps'}
        color='#26de81'
        count={contentReactions?.claps}
        isActive={userReactions.claps > 0}
      />

      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'party'}
        color='#f7b731'
        count={contentReactions?.party}
        isActive={userReactions.party > 0}
      />
    </div>
  )
}

function defaultReactions(): ReactionsModel {
  return {
    likes: 0,
    loves: 0,
    claps: 0,
    party: 0
  }
}

function updateReactions(
  reactions: ReactionsModel,
  type: string,
  count: number
): ReactionsModel {
  return {
    likes: type === 'likes' ? reactions.likes + count : reactions.likes,
    loves: type === 'loves' ? reactions.loves + count : reactions.loves,
    claps: type === 'claps' ? reactions.claps + count : reactions.claps,
    party: type === 'party' ? reactions.party + count : reactions.party
  }
}

export default Reactions