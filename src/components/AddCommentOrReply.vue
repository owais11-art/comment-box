<script setup lang="ts">
    import { inject, ref, Ref } from 'vue'
    import { IComment, IReply, IUser } from '../interfaces'

    const {isReply = false, replyTo} = defineProps<{
        isReply?: boolean
        replyTo?: string
    }>()
    const emit = defineEmits(["addComment", "addReply", "hideReply"])
    const currentUser: Ref<IUser> = inject('current-user')!
    const commentOrReply = ref(isReply ? `@${replyTo}, ` : null)

    function addCommentOrReply() {
        isReply ? addReply() : addComment()
        emit("hideReply")
    }
    function addReply() {
        if(!commentOrReply.value?.trim()) return
        const reply: IReply = {
            id: crypto.randomUUID(),
            content: commentOrReply.value.split(",")[1].trim(),
            createdAt: "Just Now",
            score: 0,
            user: currentUser.value,
            replyingTo: replyTo!
        }
        commentOrReply.value = ""
        emit("addReply", reply)
    }
    function addComment() {
        if(!commentOrReply.value?.trim()) return 
        const comment: IComment = {
            id: crypto.randomUUID(),
            content: commentOrReply.value,
            createdAt: "Just Now",
            score: 0,
            user: currentUser.value,
            replies: []
        }
        commentOrReply.value = ""
        emit("addComment", comment)
    }
</script>

<template>
    <div class="wrapper">
        <div class="image">
            <img :src="currentUser.image.webp" alt="user-image">
        </div>
        <textarea placeholder="Add a comment..." class="comment-area" v-model="commentOrReply"></textarea>
        <button @click="addCommentOrReply">{{ isReply ? "REPLY" : "SEND" }}</button>
    </div>
</template>

<style scoped>
    .wrapper {
        background-color: var(--white);
        border-radius: 5px;
        padding: 20px;
        display: flex;
        align-items: start;
        gap: 10px;

        & .image {
            width: 35px;
            height: 35px;
        }

        & .comment-area {
            flex-grow: 1;
            height: 80px;
            padding: 10px 20px;
            border: 1px solid var(--light-gray);
            border-radius: 5px;
            resize: vertical;

            &:focus {
                outline: none;
            }
        }

        & button {
            padding: 10px 20px;
            border-radius: 5px;
            border: none;
            background-color: var(--moderate-blue);
            color: var(--white);
            font-weight: 600;
            cursor: pointer;
        }
    }
</style>