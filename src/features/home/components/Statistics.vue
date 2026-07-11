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

// Fallback labels in case a translation key is missing/empty
const fallbackLabels: Record<string, string> = {
  "stat-surveys": "Surveys",
  "stat-house-plans": "House Plans",
  "stat-demo-maps": "Demo Maps",
  "stat-real-maps": "Real Maps",
};

function safeT(key: string): string {
  const translated = t(key);
  return translated && translated.trim() !== "" ? translated : fallbackLabels[key] ?? key;
}

const stats = ref<Stat[]>([
  {
    label: safeT("stat-surveys"),
    value: 30,
    suffix: "+",
    color: "var(--color-text-400)",
  },
  {
    label: safeT("stat-house-plans"),
    value: 10,
    suffix: "+",
    color: "var(--color-text-400)",
  },
  {
    label: safeT("stat-demo-maps"),
    value: 40,
    suffix: "",
    color: "var(--color-text-400)",
  },
  {
    label: safeT("stat-real-maps"),
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
          <p class="stats-value">
            {{ stat.value }}<span class="stats-suffix">{{ stat.suffix }}</span>
          </p>
          <h3 class="stats-label">{{ stat.label }}</h3>
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

  &-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-lg);
    grid-column: 1 / 13;
    width: 100%;

    @include mixins.mq("sm") {
      gap: var(--space-xl);
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
    }
  }
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-sm);
  flex: 1;
  min-width: 120px;

  @include mixins.mq("sm") {
    min-width: 140px;
    gap: var(--space-md);
  }
}

.stats-value {
  margin: 0;
  font-size: var(--font-size-title-lg);
  font-weight: 900;
  color: var(--color-text-400);
  line-height: 1;

  @include mixins.mq("sm") {
    font-size: var(--font-size-title-xl);
  }
}

.stats-suffix {
  font-size: var(--font-size-text-lg);
  margin-left: 2px;

  @include mixins.mq("sm") {
    font-size: var(--font-size-title-lg);
  }
}

.stats-label {
  margin: 0;
  font-size: var(--font-size-text-sm);
  font-weight: 600;
  color: var(--color-text-300);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  @include mixins.mq("sm") {
    font-size: var(--font-size-text-base);
  }
}
</style>