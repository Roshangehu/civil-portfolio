<script setup lang="ts">
interface Props {
  activeFilter: string;
  filters: string[];
}

const emit = defineEmits<{
  "filter:change": [filter: string];
}>();

const props = defineProps<Props>();

const handleFilterClick = (filter: string) => {
  emit("filter:change", filter);
};
</script>

<template>
  <div class="project-filter">
    <button
      v-for="filter in props.filters"
      :key="filter"
      class="project-filter-btn"
      :class="{ 'project-filter-btn-active': props.activeFilter === filter }"
      @click="handleFilterClick(filter)"
      data-cursor="pointer"
    >
      {{ filter }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.project-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
  align-items: center;
  grid-column: 1 / 13;
  margin-bottom: var(--space-lg);
  margin-top: var(--space-lg);

  @include mixins.mq("md") {
    grid-column: 1 / 13;
    gap: var(--space-md);
    justify-content: flex-start;
  }

  &-btn {
    padding: 8px 16px;
    border: 2px solid var(--color-text-300);
    background: transparent;
    color: var(--color-text-300);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-family: inherit;

    @include mixins.mq("md") {
      padding: 10px 20px;
      font-size: 15px;
    }

    &:hover {
      border-color: var(--color-text-400);
      color: var(--color-text-400);
      transform: translateY(-2px);
    }

    &-active {
      background: var(--color-text-300);
      color: var(--color-beige-400);
      border-color: var(--color-text-300);

      &:hover {
        border-color: var(--color-text-300);
        color: var(--color-beige-400);
        transform: translateY(-2px);
      }
    }
  }
}
</style>
