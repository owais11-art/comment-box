<script setup lang="ts">
    const { score } = defineProps<{
        score: number
    }>()
    const emit = defineEmits(["upScoreComment", "downScoreComment"])

    function upScoreComment() {
        emit("upScoreComment")
    }

    function downScoreComment() {
        emit("downScoreComment")
    }
</script>

<template>
    <div class="score-wrapper">
        <div class="up-score" @click="upScoreComment">
            <img src="@/assets/icon-plus.svg" alt="up-score-button">
        </div>
        <p class="score">{{ score }}</p>
        <div class="down-score" @click="downScoreComment">
            <img src="@/assets/icon-minus.svg" alt="down-score-button">
        </div>
    </div>
</template>

<style scoped>
    .score-wrapper {
        background-color: var(--light-gray);
        padding: 10px 10px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        & > * {
            flex-grow: 1;
        }
        & .up-score, & .down-score {
            cursor: pointer;
            display: grid;
            place-items: center;
            padding: 10px 0;
        }
        & .score {
            color: var(--moderate-blue);
            font-weight: 500;
            min-width: 17.31px;
            text-align: center;
        }
    }
</style>