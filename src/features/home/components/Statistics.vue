<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NotchSection from "../../../components/NotchSection.vue";
import Banner from "../../../components/Banner.vue";
import { t } from "../../../i18n/utils/translate";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats = ref<Stat[]>([
  {
    label: t("stat-surveys"),
    value: 30,
    suffix: "+",
    color: "var(--color-text-400)",
  },
  {
    label: t("stat-house-plans"),
    value: 10,
    suffix: "+",
    color: "var(--color-text-400)",
  },
  {
    label: t("stat-demo-maps"),
    value: 40,
    suffix: "",
    color: "var(--color-text-400)",
  },
  {
    label: t("stat-real-maps"),
    value: 10,
    suffix: "+",
    color: "var(--color-text-400)",
  },
]);

const statsRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!statsRef.value) return;

  const bars = statsRef.value.querySelectorAll(".stats-bar-fill");
  const maxValue = Math.max(...stats.value.map((stat) => stat.value));
  bars.forEach((bar, index) => {
    const stat = stats.value[index];
    if (!stat) return;
    const percentage = (stat.value / maxValue) * 100;
    gsap.fromTo(
      bar,
      { width: 0 },
      {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.value,
          start: "top 75%",
        },
      }
    );
  });
  
  // Fallback: set widths directly if ScrollTrigger doesn't work
  setTimeout(() => {
    bars.forEach((bar, index) => {
      const stat = stats.value[index];
      if (!stat) return;
      const percentage = (stat.value / maxValue) * 100;
      (bar as HTMLElement).style.width = `${percentage}%`;
    });
  }, 2000);
});
</script>

<template>
  <div class="statistics">
    <NotchSection class="statistics-notch-start" />
    <NotchSection class="statistics-notch-end" />
    <div class="grid">
      <div class="statistics-header">
        <Banner class="statistics-banner" :copy="t('selected')" size="sm" animated />
        <h2 class="statistics-title">{{ t("statistics") }}</h2>
      </div>
    </div>

    <div class="grid">
      <div ref="statsRef" class="statistics-container">
        <div v-for="(stat, index) in stats" :key="index" class="stats-item">
          <div class="stats-info">
            <h3 class="stats-label">{{ stat.label }}</h3>
            <p class="stats-value">{{ stat.value }}<span class="stats-suffix">{{ stat.suffix }}</span></p>
          </div>
          <div class="stats-bar">
            <div class="stats-bar-fill"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.statistics {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: var(--space-lg);
  padding-left: var(--space-md);
  padding-right: var(--space-md);
  background-color: var(--color-beige-400);
  min-height: auto;
  padding-top: 64px;
  padding-bottom: 64px;

  @include mixins.mq("sm") {
    padding-left: var(--space-outer);
    padding-right: var(--space-outer);
    gap: var(--space-xl);
    padding-top: 96px;
    padding-bottom: 96px;
  }

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
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    grid-column: 1 / 13;
    width: 100%;

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
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

.stats-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  @include mixins.mq("md") {
    flex-direction: row;
    align-items: center;
    gap: var(--space-lg);
  }
}

.stats-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
  min-width: auto;
  width: 100%;

  @include mixins.mq("md") {
    flex-direction: column;
    align-items: flex-start;
    min-width: 180px;
    gap: var(--space-md);
  }
}

.stats-label {
  margin: 0;
  font-size: var(--font-size-text-xs);
  font-weight: 600;
  color: var(--color-text-300);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @include mixins.mq("sm") {
    font-size: var(--font-size-text-sm);
  }
}

.stats-value {
  margin: 0;
  font-size: var(--font-size-text-lg);
  font-weight: 900;
  color: var(--color-text-400);
  opacity: 1 !important;
  visibility: visible !important;

  @include mixins.mq("sm") {
    font-size: var(--font-size-title-sm);
  }
}

.stats-suffix {
  font-size: var(--font-size-text-base);
  margin-left: 2px;
}

.stats-bar {
  flex: 1;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-full);
  overflow: hidden;
  position: relative;

  @include mixins.mq("md") {
    height: 6px;
  }
}

.stats-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-text-400), var(--color-text-300));
  border-radius: var(--radius-full);
  width: 0%;
  transition: width 0.3s ease;
  opacity: 1 !important;
  visibility: visible !important;
}
</style>
