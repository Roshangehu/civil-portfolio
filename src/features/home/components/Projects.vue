<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { previews } from "../../../content/projects/previews";
import { locale } from "../../../i18n/store";
import ProjectCardWithCategory from "../../projects/components/ProjectCardWithCategory.vue";
import ProjectFilter from "../../projects/components/ProjectFilter.vue";
import ProjectLightbox from "../../projects/components/ProjectLightbox.vue";
import NotchSection from "../../../components/NotchSection.vue";
import Banner from "../../../components/Banner.vue";
import { t } from "../../../i18n/utils/translate";

import type { ProjectPreview } from "../../../content/types";

const loadedPreviews = ref<ProjectPreview[] | null>(null);
const activeFilter = ref("All");
const lightboxOpen = ref(false);
const lightboxImageIndex = ref(0);
const selectedProject = ref<ProjectPreview | null>(null);

const emit = defineEmits<{
  (e: "loaded", previews: ProjectPreview[]): void;
}>();

const loadPreviews = async () => {
  if (!locale.value) return;
  const func = previews[locale.value as keyof typeof previews];
  if (!func) return;
  const module = await func();
  loadedPreviews.value = module.default;
  emit("loaded", module.default);
};

watch(locale, loadPreviews);

onMounted(loadPreviews);

// Get unique categories from loaded previews
const availableCategories = computed(() => {
  if (!loadedPreviews.value) return ["All"];
  
  const categories = new Set(loadedPreviews.value.map(p => p.category));
  return ["All", ...Array.from(categories).sort()];
});

// Filter previews based on active filter
const filteredPreviews = computed(() => {
  if (!loadedPreviews.value) return [];
  
  if (activeFilter.value === "All") {
    return loadedPreviews.value;
  }
  
  return loadedPreviews.value.filter(p => p.category === activeFilter.value);
});

const handleFilterChange = (filter: string) => {
  activeFilter.value = filter;
};

const handleImageClick = (project: ProjectPreview, imageIndex: number) => {
  selectedProject.value = project;
  lightboxImageIndex.value = imageIndex;
  lightboxOpen.value = true;
};

const handleLightboxClose = () => {
  lightboxOpen.value = false;
  selectedProject.value = null;
  lightboxImageIndex.value = 0;
};

const handleLightboxNext = () => {
  if (selectedProject.value?.images && lightboxImageIndex.value < selectedProject.value.images.length - 1) {
    lightboxImageIndex.value++;
  }
};

const handleLightboxPrev = () => {
  if (lightboxImageIndex.value > 0) {
    lightboxImageIndex.value--;
  }
};

const handleLightboxSelect = (index: number) => {
  lightboxImageIndex.value = index;
};
</script>

<template>
  <div class="projects">
    <NotchSection class="projects-notch-start" />
    <NotchSection class="projects-notch-end" />
    <div class="grid">
      <div class="projects-title">
        <Banner class="projects-title-banner" :copy="t('selected')" size="sm" animated />
        <h2 class="projects-title-copy">{{ t("projects") }}</h2>
      </div>
    </div>

    <div class="grid">
      <ProjectFilter
        :active-filter="activeFilter"
        :filters="availableCategories"
        @filter:change="handleFilterChange"
      />
    </div>

    <div class="grid">
      <div class="projects-cards">
        <ProjectCardWithCategory
          v-for="preview in filteredPreviews"
          :key="preview.slug"
          :preview="preview"
          @image:click="(index) => handleImageClick(preview, index)"
        />
        <div v-if="filteredPreviews.length === 0" class="projects-empty">
          <p>{{ t("projects") }} not found</p>
        </div>
      </div>
    </div>

    <ProjectLightbox
      v-if="selectedProject"
      :is-open="lightboxOpen"
      :images="selectedProject.images || [selectedProject.thumbnail]"
      :current-index="lightboxImageIndex"
      :title="selectedProject.title"
      @close="handleLightboxClose"
      @next="handleLightboxNext"
      @prev="handleLightboxPrev"
      @select="handleLightboxSelect"
    />
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: var(--space-xl);
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background-color: var(--color-beige-400);
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

  &-title {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 8;
    }

    &-copy {
      font-weight: 900;
      letter-spacing: 0.02em;
      font-size: var(--font-size-title-md);

      @include mixins.mq("sm") {
        font-size: var(--font-size-title-lg);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xl);
      }

      margin: 0;
    }

    &-banner {
      @include mixins.mq("md") {
        margin-bottom: var(--space-sm);
      }
    }
  }

  &-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-md);
    grid-column: 1 / 13;
    width: 100%;
    animation: fadeIn 0.4s ease-out;

    @include mixins.mq("md") {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-lg);
    }

    @include mixins.mq("lg") {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-xl);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  &-empty {
    grid-column: 1 / 13;
    text-align: center;
    padding: var(--space-xl);
    color: var(--color-text-300);
    font-size: 18px;

    p {
      margin: 0;
    }
  }

  &-notch {
    &-start {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      color: var(--color-beige-400);
      --icon-color: var(--color-beige-400);
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
