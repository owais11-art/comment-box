<script setup lang="ts">
    import { ref } from 'vue'

    const {content} = defineProps<{
        content: string
    }>()
    const emit = defineEmits(["updateComment"])

    const edittedContent = ref(content)

    function updateComment() {
        emit("updateComment", edittedContent.value)
    }
</script>

<template>
    <div class="edit">
        <textarea v-model="edittedContent"></textarea>
        <button @click="updateComment">UPDATE</button>
    </div>
</template>

<style scoped>
    .edit {
        display: flex;
        flex-direction: column;
        gap: 15px;
        & textarea {
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
            align-self: flex-end;
        }
    }
</style>