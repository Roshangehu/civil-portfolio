<script setup lang="ts">
import { ref, watch, computed } from "vue";
import gsap from "gsap";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";

interface Props {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  title: string;
}

const emit = defineEmits<{
  "close": [];
  "next": [];
  "prev": [];
  "select": [index: number];
}>();

const props = defineProps<Props>();

const overlayRef = ref<HTMLDivElement | null>(null);
const modalRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && overlayRef.value && modalRef.value) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        overlayRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        modalRef.value,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    } else if (!isOpen) {
      document.body.style.overflow = "auto";
    }
  }
);

const handleClose = () => {
  emit("close");
};

const handleNext = () => {
  if (props.currentIndex < props.images.length - 1) {
    emit("next");
  }
};

const handlePrev = () => {
  if (props.currentIndex > 0) {
    emit("prev");
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") handleClose();
  if (e.key === "ArrowRight") handleNext();
  if (e.key === "ArrowLeft") handlePrev();
};

const imageCount = computed(() => `${props.currentIndex + 1} / ${props.images.length}`);

const selectImage = (index: number) => {
  emit("select", index);
};
</script>

<template>
  <Teleport to="body" v-if="isOpen">
    <div class="lightbox" @keydown="handleKeydown" tabindex="0">
      <div
        class="lightbox-overlay"
        ref="overlayRef"
        @click="handleClose"
        @keydown.escape="handleClose"
      ></div>

      <div class="lightbox-modal" ref="modalRef">
        <button
          class="lightbox-close"
          @click="handleClose"
          aria-label="Close lightbox"
          data-cursor="circle-white"
        >
          ✕
        </button>

        <div class="lightbox-content">
          <div class="lightbox-image-container">
            <img
              ref="imageRef"
              :src="images[currentIndex]"
              :alt="`${title} - Image ${currentIndex + 1}`"
              class="lightbox-image"
            />
          </div>

          <div class="lightbox-info">
            <h3 class="lightbox-title">{{ title }}</h3>
            <p class="lightbox-counter">{{ imageCount }}</p>
          </div>

          <div class="lightbox-navigation" v-if="images.length > 1">
            <button
              class="lightbox-nav-btn lightbox-nav-prev"
              @click="handlePrev"
              :disabled="currentIndex === 0"
              aria-label="Previous image"
              data-cursor="circle-white"
            >
              <ArrowRightLong style="transform: rotate(180deg)" />
            </button>

            <div class="lightbox-progress">
              <div
                class="lightbox-progress-bar"
                :style="{ width: `${((currentIndex + 1) / images.length) * 100}%` }"
              ></div>
            </div>

            <button
              class="lightbox-nav-btn lightbox-nav-next"
              @click="handleNext"
              :disabled="currentIndex === images.length - 1"
              aria-label="Next image"
              data-cursor="circle-white"
            >
              <ArrowRightLong />
            </button>
          </div>

          <div class="lightbox-thumbnails" v-if="images.length > 1">
            <button
              v-for="(image, index) in images"
              :key="`${image}-${index}`"
              class="lightbox-thumbnail"
              :class="{ 'lightbox-thumbnail-active': index === currentIndex }"
              @click="selectImage(index)"
              :aria-label="`View image ${index + 1}`"
            >
              <img :src="image" :alt="`${title} thumbnail ${index + 1}`" loading="lazy" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }

  &-modal {
    position: relative;
    z-index: 10000;
    background: var(--color-background-300);
    border-radius: 8px;
    padding: var(--space-md);
    max-width: 90vw;
    max-height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

    @include mixins.mq("md") {
      padding: var(--space-lg);
      max-width: 80vw;
      max-height: 85vh;
    }

    @include mixins.mq("lg") {
      padding: var(--space-xl);
      max-width: 70vw;
      max-height: 80vh;
    }
  }

  &-close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 24px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10001;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    max-height: calc(90vh - var(--space-lg) * 2);
    overflow-y: auto;

    @include mixins.mq("md") {
      gap: var(--space-lg);
      max-height: calc(85vh - var(--space-lg) * 2);
    }
  }

  &-image-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
    max-height: 60vh;

    @include mixins.mq("md") {
      max-height: 70vh;
      border-radius: 8px;
    }
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: 0 var(--space-sm);

    @include mixins.mq("md") {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 var(--space-md);
    }
  }

  &-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-400);
    margin: 0;

    @include mixins.mq("md") {
      font-size: 20px;
    }
  }

  &-counter {
    font-size: 14px;
    color: var(--color-text-300);
    margin: 0;
  }

  &-navigation {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 0 var(--space-sm);

    @include mixins.mq("md") {
      gap: var(--space-md);
      padding: 0 var(--space-md);
    }
  }

  &-nav-btn {
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-text-300);
    background: transparent;
    color: var(--color-text-300);
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;

    @include mixins.mq("md") {
      width: 48px;
      height: 48px;
    }

    &:hover:not(:disabled) {
      background: var(--color-text-300);
      color: var(--color-beige-400);
      transform: scale(1.05);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    svg {
      width: 20px;
      height: 20px;

      @include mixins.mq("md") {
        width: 24px;
        height: 24px;
      }
    }
  }

  &-progress {
    flex: 1;
    height: 3px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    overflow: hidden;

    @include mixins.mq("md") {
      height: 4px;
    }
  }

  &-progress-bar {
    height: 100%;
    background: var(--color-text-300);
    transition: width 0.3s ease;
  }

  &-thumbnails {
    display: flex;
    gap: var(--space-sm);
    padding: 0 var(--space-sm);
    overflow-x: auto;
    scrollbar-width: thin;

    @include mixins.mq("md") {
      padding: 0 var(--space-md);
      gap: var(--space-md);
    }
  }

  &-thumbnail {
    flex: 0 0 72px;
    width: 72px;
    height: 72px;
    border: 2px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    padding: 0;
    background: rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s ease, transform 0.2s ease;

    @include mixins.mq("md") {
      flex: 0 0 88px;
      width: 88px;
      height: 88px;
      border-radius: 6px;
    }

    &:hover {
      transform: scale(1.05);
    }

    &-active {
      border-color: var(--color-text-400);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}
</style>
