<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Notch from "../../../components/Notch.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import ButtonRound from "../../../components/ButtonRound.vue";
import { t } from "../../../i18n/utils/translate";

import type { ProjectPreview } from "../../../content/types";

interface Props {
  preview: ProjectPreview;
}

const emit = defineEmits<{
  "image:click": [index: number];
  "gallery:open": [];
}>();

const props = defineProps<Props>();

const imageCount = computed(() => props.preview.images?.length ?? 1);

const wrapperRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);
const tlRef = ref<gsap.core.Timeline | null>(null);

onMounted(async () => {
  if (!wrapperRef.value || ScrollTrigger.isInViewport(wrapperRef.value)) {
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top bottom",
    },
  });
  tl.fromTo(wrapperRef.value, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power1.out" }, 0);
  tl.fromTo(imageRef.value, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);

  tlRef.value = tl;
});

onUnmounted(() => {
  if (tlRef.value) {
    tlRef.value.kill();
    tlRef.value = null;
  }
});

const openGallery = () => {
  emit("gallery:open");
  emit("image:click", 0);
};
</script>

<template>
  <div class="project-card">
    <div
      class="project-card-top"
      ref="wrapperRef"
      role="button"
      tabindex="0"
      :aria-label="t('view-project')"
      @click="openGallery"
      @keydown.enter="openGallery"
      @keydown.space.prevent="openGallery"
    >
      <div class="project-card-image-wrapper">
        <div class="project-card-image-container">
          <img
            :src="preview.thumbnail"
            :alt="preview.title"
            class="project-card-image"
            ref="imageRef"
            loading="lazy"
          />
          <div class="project-card-category-badge">{{ preview.category }}</div>
          <div v-if="imageCount > 1" class="project-card-photo-count">{{ imageCount }} photos</div>
        </div>
      </div>
      <div class="project-card-overlay">
        <div class="project-card-edge">
          <ButtonRound class="project-card-button" variant="accent" renderAs="div">
            <ArrowRightLong class="project-card-button-arrow" />
          </ButtonRound>
        </div>
        <Notch class="project-card-notch project-card-notch-left" />
        <Notch class="project-card-notch project-card-notch-right" />
      </div>
    </div>
    <div class="project-card-content">
      <div class="project-card-copys">
        <h3 class="project-card-title">{{ preview.title }}</h3>
        <p class="project-card-description">{{ preview.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  animation: slideInUp 0.6s ease-out;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &-top {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
    aspect-ratio: 1;
    transition: all 0.3s ease;
    cursor: pointer;

    @include mixins.mq("md") {
      border-radius: 8px;
    }

    &:hover .project-card-image {
      transform: scale(1.1);
    }

    &:hover .project-card-overlay {
      opacity: 1;
    }
  }

  &-image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--color-background-300);
    position: relative;
  }

  &-image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: linear-gradient(135deg, rgba(200, 200, 200, 0.1), rgba(150, 150, 150, 0.1));
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &-photo-count {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.65);
    color: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    z-index: 10;

    @include mixins.mq("md") {
      top: 16px;
      right: 16px;
      padding: 8px 16px;
      font-size: 13px;
    }
  }

  &-category-badge {
    position: absolute;
    bottom: 12px;
    left: 12px;
    background: var(--color-text-300);
    color: var(--color-beige-400);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 10;

    @include mixins.mq("md") {
      bottom: 16px;
      left: 16px;
      padding: 8px 16px;
      font-size: 13px;
    }
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: var(--space-md);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 5;

    @include mixins.mq("md") {
      padding: var(--space-lg);
    }
  }

  &-edge {
    position: relative;
  }

  &-button {
    width: 100%;
  }

  &-button-arrow {
    transform: rotate(0deg);
  }

  &-notch {
    position: absolute;
    pointer-events: none;

    &-left {
      top: 0;
      left: 0;
    }

    &-right {
      bottom: 0;
      right: 0;
      transform: rotate(180deg);
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-md) 0;
    flex: 1;

    @include mixins.mq("md") {
      gap: var(--space-md);
      padding: var(--space-lg) 0;
    }
  }

  &-copys {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.3;
    color: var(--color-text-400);

    @include mixins.mq("md") {
      font-size: 18px;
    }

    @include mixins.mq("lg") {
      font-size: 20px;
    }
  }

  &-description {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--color-text-300);

    @include mixins.mq("md") {
      font-size: 14px;
    }
  }
}
</style>
