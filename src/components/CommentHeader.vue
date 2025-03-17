<script setup lang="ts">
    import { inject, Ref } from 'vue'
    import { IUser } from '../interfaces'

    const { user, createdAt } = defineProps<{
        user: IUser,
        createdAt: string
    }>()
    const emit = defineEmits(["showReply", "toggleCanEdit", "deleteComment"])

    const currentUser: Ref<IUser> = inject('current-user')!

    function showReply() {
        emit("showReply")
    }

    function toggleCanEdit() {
        emit("toggleCanEdit")
    }

    function deleteComment() {
        emit("deleteComment")
    }
</script>

<template>
    <div class="header">
        <div class="commenter-info">
            <div class="image">
                <img :src="user.image.webp" :alt="user.username">
            </div>
            <p class="username">{{ user.username }} <p v-if="user.username === currentUser.username" class="you">you</p></p>
            <p class="created-at">{{ createdAt }}</p>
        </div>
        <div class="update-comment" v-if="user.username === currentUser.username">
            <div class="delete-btn btn" @click="deleteComment">
                <div class="delete-icon">
                    <img src="@/assets/icon-delete.svg" alt="delete-icon">
                </div>
                <p class="text">Delete</p>
            </div>
            <div class="edit-btn btn" @click="toggleCanEdit">
                <div class="edit-icon">
                    <img src="@/assets/icon-edit.svg" alt="edit-icon">
                </div>
                <p class="text">Edit</p>
            </div>
        </div>
        <div class="reply-btn btn" v-else @click.stop="showReply">
            <div class="reply-icon">
                <img src="@/assets/icon-reply.svg" alt="reply-icon">
            </div>
            <p class="text">Reply</p>
        </div>
    </div>
</template>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        & .commenter-info {
            display: flex;
            align-items: center;
            gap: 15px;
            & .image {
                width: 35px;
                height: 35px;
            }
            & .username {
                color: var(--dark-blue);
                font-weight: 500;
                display: flex;
                gap: 5px;
                & .you {
                    display: block;
                    border-radius: 2px;
                    color: var(--white);
                    background-color: var(--moderate-blue);
                    font-weight: 500;
                    font-size: 0.875rem;
                    padding-left: 5px;
                    padding-right: 5px;
                }
            }
        }
        & .update-comment {
            display: flex;
            align-items: center;
            gap: 15px
        }
        & .btn {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            & .text {
                color: var(--moderate-blue);
                font-weight: 500;
            }
        }

        & .delete-btn {
            & .text {
                color: var(--soft-red);
            }
        }
    }
</style>