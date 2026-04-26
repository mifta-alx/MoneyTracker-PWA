<script setup lang="ts">
import { ChartLineData01Icon, Home03Icon, PieChart02Icon, Wallet01Icon } from '@hugeicons/core-free-icons';

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home03Icon,
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: Wallet01Icon,
  },
  {
    title: "Stats",
    url: "/stats",
    icon: ChartLineData01Icon,
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: PieChart02Icon,
  },
];
</script>

<template>
  <BottomTabGroup>
  <BottomTabNavigator :items="items">
    <BottomTabItem
        v-for="(item, index) in items"
        :key="index"
        :icon="item.icon"
        :href="item.url"
    >
      {{ item.title }}
    </BottomTabItem>
  </BottomTabNavigator>
    <ActionButton/>
  </BottomTabGroup>
</template>