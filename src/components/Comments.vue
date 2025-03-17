<script setup lang="ts">
    import type { IComment,IReply,IReplyEmit, IUpdatePayload } from '../interfaces'
    import Comment from './Comment.vue'
    import AddCommentOrReply from './AddCommentOrReply.vue'
    const { comments } = defineProps<{comments: IComment[]}>()
    const emit = defineEmits(["addComment", "addReply", "updateComment", "deleteComment", "upScoreComment", "downScoreComment"])
    function addComment(comment: IComment) {
        emit("addComment", comment)
    }
    function addReply(payload: IReplyEmit) {
        emit("addReply", payload)
    }
    function updateComment(payload: IUpdatePayload, commentId: string) {
        if(payload.id[0] !== commentId) payload.id.unshift(commentId)
        emit("updateComment", payload)
    }
    function deleteComment(id: string, commentId: string) {
        emit("deleteComment", id === commentId ? [id] : [commentId, id])
    }
    function upScoreComment(id: string, commentId: string) {
        emit("upScoreComment", id === commentId ? [id] : [commentId, id])
    }
    function downScoreComment(id: string, commentId: string) {
        emit("downScoreComment", id === commentId ? [id] : [commentId, id])
    }
</script>

<template>
    <div class="comments">
        <Comment
            v-for="comment in comments"
            :key="comment.id"
            :comment-data="comment"
            @add-reply="(reply: IReply) => addReply({reply, id: comment.id})"
            @update-comment="(payload: IUpdatePayload) => updateComment(payload, comment.id)"
            @delete-comment="(id: string) => deleteComment(id, comment.id)"
            @up-score-comment="(id: string) => upScoreComment(id, comment.id)"
            @down-score-comment="(id: string) => downScoreComment(id, comment.id)"
        />
        <AddCommentOrReply @add-comment="addComment" />
    </div>
</template>

<style scoped>
    .comments{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>