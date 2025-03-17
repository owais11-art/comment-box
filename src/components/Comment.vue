<script setup lang="ts">
    import { Ref, ref } from 'vue'
    import type { IComment, IReply, IUpdatePayload } from '../interfaces'
    import CommentScore from './CommentScore.vue'
    import CommentHeader from './CommentHeader.vue'
    import AddCommentOrReply from './AddCommentOrReply.vue'
    import EditComment from './EditComment.vue'
    
    const { commentData, replyMargin = true, isReply = false } = defineProps<{
        commentData: IComment | IReply
        replyMargin?: boolean
        isReply?: boolean
    }>()
    const emit = defineEmits(["addReply", "updateComment", "deleteComment", "upScoreComment", "downScoreComment"])

    const comment = commentData as IComment

    const reply = commentData as IReply

    const showReplies: Ref<boolean> = ref(true)

    const showReply: Ref<boolean> = ref(false)
    
    const canEdit: Ref<boolean> = ref(false)
    
    function fnShowReply() {
        showReply.value = true
        if(!showReplies.value)fnShowReplies(false)
    }

    function fnHideReply() {
        showReply.value = false
    }
    
    function fnShowReplies(hideReply: boolean = true) {
        if(hideReply) showReply.value = false
        showReplies.value = !showReplies.value
    }

    function addReply(newReply: IReply) {
        emit("addReply", newReply)
    }

    function fnCanEdit() {
        canEdit.value = !canEdit.value
    }

    function updateComment(payload: IUpdatePayload) {
        if(canEdit.value) canEdit.value = false
        emit("updateComment", payload)
    }

    function deleteComment(id: string) {
        emit("deleteComment", id)
    }

    function upScoreComment(id: string) {
        emit("upScoreComment", id)
    }

    function downScoreComment(id: string) {
        emit("downScoreComment", id)
    }
</script>

<template>
    <div class="comment-wrapper">
        <CommentScore 
            :score="isReply ? reply.score : comment.score"
            @up-score-comment="() => upScoreComment(isReply ? reply.id : comment.id)"
            @down-score-comment="() => downScoreComment(isReply ? reply.id : comment.id)"
        />
        <div class="comment" @click="() => fnShowReplies()">
            <CommentHeader
                :user="isReply ? reply.user : comment.user"
                :created-at="isReply ? reply.createdAt : comment.createdAt"
                @show-reply="fnShowReply"
                @toggle-can-edit="fnCanEdit"
                @delete-comment="() => deleteComment(isReply ? reply.id : comment.id)"
            />
            <EditComment
                :content="isReply ? reply.content : comment.content"
                v-if="canEdit"
                @update-comment="(content: string) => updateComment({content, id: [isReply ? reply.id : comment.id]})"
            />
            <p class="content" v-else><span v-if="isReply" class="replying-to">@{{ reply.replyingTo }}</span> {{ isReply ? reply.content : comment.content }}</p>
        </div>
    </div>
    <div class="replies-wrapper">
        <div :class="['replies', !showReplies && 'hide']" v-if="comment.replies?.length || showReply">
            <AddCommentOrReply
                is-reply
                :reply-to="comment.user.username"
                @add-reply="addReply"
                @hide-reply="fnHideReply"
                v-if="showReply"
            />
            <Comment
                v-for="reply in comment.replies"
                :key="reply.id"
                :commentData="reply"
                :reply-margin="false"
                :is-reply="true"
                @add-reply="addReply"
                @update-comment="updateComment"
                @delete-comment="(id: string) => deleteComment(id)"
                @up-score-comment="(id: string) => upScoreComment(id)"
                @down-score-comment="(id: string) => downScoreComment(id)"
            />
        </div>
    </div>
</template>

<style scoped>
    .comment-wrapper {
        background-color: var(--white);
        border-radius: 5px;
        padding: 20px;
        display: flex;
        align-items: start;
        gap: 15px;

        & .comment {
            flex-grow: 1;
            & .content {
                width: 95%;
                line-height: 1.5;
                & .replying-to {
                    color: var(--moderate-blue);
                    font-weight: 500;
                }
            }
        }
    }
    .replies {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-left: v-bind('replyMargin ? "30px" : "0"');
        padding-left: v-bind('replyMargin ? "30px" : "0"');
        border-left: v-bind('replyMargin ? "2px solid var(--light-grayish-blue)" : "0px"');
        &.hide {
            display: none;
        }
    }
</style>