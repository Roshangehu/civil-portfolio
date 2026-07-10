<script setup lang="ts">
import { computed } from "vue";
import NotchSection from "../../../components/NotchSection.vue";
import Banner from "../../../components/Banner.vue";
import { t } from "../../../i18n/utils/translate";

interface Experience {
  title: string;
  company: string;
  duration: string;
  tasks: string[];
}

const experiences = computed((): Experience[] => {
  return [
    {
      title: t("work-exp-title-1"),
      company: t("work-exp-company-1"),
      duration: t("work-exp-duration-1"),
      tasks: [
        t("work-exp-task-1"),
        t("work-exp-task-2"),
        t("work-exp-task-3"),
        t("work-exp-task-4"),
      ],
    },
    {
      title: t("work-exp-title-2"),
      company: t("work-exp-company-2"),
      duration: t("work-exp-duration-2"),
      tasks: [
        t("work-exp-task-5"),
        t("work-exp-task-6"),
        t("work-exp-task-7"),
      ],
    },
  ];
});
</script>

<template>
  <div class="work-experience">
    <NotchSection class="work-experience-notch-start" />
    <NotchSection class="work-experience-notch-end" />
    <div class="grid">
      <div class="work-experience-header">
        <Banner class="work-experience-banner" :copy="t('selected')" size="sm" animated />
        <h2 class="work-experience-title">{{ t("work-experience") }}</h2>
      </div>
    </div>

    <div class="grid">
      <div class="work-experience-container">
        <div v-for="(exp, index) in experiences" :key="index" class="work-experience-item">
          <div class="work-experience-item-header">
            <h3 class="work-experience-item-title">{{ exp.title }}</h3>
            <span class="work-experience-item-duration">{{ exp.duration }}</span>
          </div>
          <p class="work-experience-item-company">{{ exp.company }}</p>
          <ul class="work-experience-item-tasks">
            <li v-for="(task, idx) in exp.tasks" :key="idx">{{ task }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.work-experience {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: var(--space-xl);
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background-color: var(--color-beige-500);
  min-height: calc(var(--lvh) * 100 + var(--radius-xxl));
  padding-top: 96px;
  padding-bottom: 96px;

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 144px;
    gap: var(--space-xxl);
  }

  @include mixins.mq("lg") {
    gap: var(--space-xxxl);
  }

  &-header {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 8;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-md);
    margin: 0;

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-banner {
    @include mixins.mq("md") {
      margin-bottom: var(--space-sm);
    }
  }

  &-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-lg);
    grid-column: 1 / 13;
    width: 100%;

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
    }
  }

  &-item {
    padding: var(--space-lg);
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid var(--color-text-300);
    border-radius: var(--radius-md);
    backdrop-filter: blur(10px);

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--space-md);
      margin-bottom: var(--space-md);
    }

    &-title {
      margin: 0;
      font-size: var(--font-size-label-md);
      font-weight: 700;
      color: var(--color-text-400);
    }

    &-duration {
      font-size: var(--font-size-text-sm);
      font-weight: 600;
      color: var(--color-text-300);
      white-space: nowrap;
    }

    &-company {
      margin: 0 0 var(--space-md) 0;
      font-size: var(--font-size-text-base);
      font-weight: 600;
      color: var(--color-text-400);
    }

    &-tasks {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);

      li {
        font-size: var(--font-size-text-sm);
        color: var(--color-text-300);
        padding-left: var(--space-md);
        position: relative;

        &::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: var(--color-text-400);
        }
      }
    }
  }

  &-notch {
    &-start {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      color: var(--color-beige-500);
      --icon-color: var(--color-beige-500);
    }

    &-end {
      position: absolute;
      bottom: 0;
      left: 0;
      color: var(--color-beige-600);
      --icon-color: var(--color-beige-600);
    }
  }
}
</style>
