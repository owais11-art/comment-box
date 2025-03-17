<script setup lang="ts">
  import { provide, Ref, ref } from "vue";
  import Comments from "./components/Comments.vue"
  import type { IComment, IReply, IReplyEmit, IUpdatePayload, IUser, TDeletePayload } from "./interfaces"
  import data from './data.json'
  
  const currentUser: Ref<IUser> = ref(data.currentUser)
  const comments: Ref<IComment[]> = ref(data.comments)

  provide("current-user", currentUser)

  function addComment(comment: IComment) {
    comments.value.push(comment)
  }

  function addReply({reply, id}: IReplyEmit) {
    comments.value = comments.value.map((comment: IComment) => {
      if(comment.id === id) {
        comment.replies?.push(reply)
      }
      return comment
    })
  }

  function updateComment({content, id}: IUpdatePayload) {
    const [parentId, childId] = id
    let commentToUpdate = comments.value.find((comment: IComment) => comment.id === parentId)
    if(childId) commentToUpdate = commentToUpdate?.replies?.find((reply:IReply) => reply.id === childId)
    commentToUpdate!.content = content
  }

  function deleteComment(id: TDeletePayload) {
    const [parentId, childId] = id
    if(childId) {
      comments.value = comments.value.map((comment: IComment) => {
        if(comment.id === parentId) {
          comment.replies = comment.replies?.filter((reply: IReply) => reply.id !== childId)
        }
        return comment
      })
    }
    else {
      comments.value = comments.value.filter((comment: IComment) => comment.id !== parentId)
    }
  }

  function upScoreComment(id: TDeletePayload) {
    const [parentId, childId] = id
    if(childId) {
      comments.value = comments.value.map((comment: IComment) => {
        if(comment.id === parentId) {
          const reply = comment.replies?.find((reply: IReply) => reply.id === childId)!
          reply.score += 1
        }
        return comment
      })
    }
    else {
      const comment = comments.value.find((comment: IComment) => comment.id === parentId)!
      comment.score += 1
    }
  }

  function downScoreComment(id: TDeletePayload) {
    const [parentId, childId] = id
    if(childId) {
      comments.value = comments.value.map((comment: IComment) => {
        if(comment.id === parentId) {
          const reply = comment.replies?.find((reply: IReply) => reply.id === childId)!
          if(reply.score > 0) reply.score -= 1
        }
        return comment
      })
    }
    else {
      const comment = comments.value.find((comment: IComment) => comment.id === parentId)!
      if(comment.score > 0) comment.score -= 1
    }
  }

</script>

<template>
  <main>
    <Comments
      :comments="comments"
      @add-comment="addComment"
      @add-reply="addReply"
      @update-comment="updateComment"
      @delete-comment="deleteComment"
      @up-score-comment="upScoreComment"
      @down-score-comment="downScoreComment"
    />
  </main>
</template>

<style scoped>
  main {
    padding: 20px 0;
    max-width: 700px;
    margin: auto;
  }
</style>
