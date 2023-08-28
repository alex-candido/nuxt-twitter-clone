// /* eslint-disable prettier/prettier */
// import { CurrentUser } from '../types/user'
// import useLoginModal from './useLoginModal'

// const useLike = ({
//   postId,
//   currentUser,
//   likedIds,
// }: {
//   postId: string
//   currentUser: CurrentUser | null
//   likedIds?: string[]
// }) => {

//   const hasLiked = computed(() => {
//     const list = likedIds || []
//     if (currentUser?.id) {
//       return list.includes(currentUser?.id)
//     }
//   })

//   const toggleLike = async () => {
//       console.log({likedIds, postId, currentUser, hasLiked: hasLiked.value})
//     if (!currentUser) {
//       return useLoginModal.onOpen()
//     }

//     try {
//       if (hasLiked.value) {
//         await useFetch(`/api/like`, {
//           method: 'DELETE',
//           body: { postId, isCurrentUser: currentUser },
//         })
//       } else {
//         await useFetch(`/api/like`, {
//           method: 'POST',
//           body: { postId, isCurrentUser: currentUser },
//         })
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         return error.message
//       }
//     }
//   }

//   return {
//     toggleLike,
//     hasLiked
//   }
// }

// export default useLike
