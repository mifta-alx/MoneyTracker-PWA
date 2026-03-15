<script setup lang="ts">
const items = [
  {
    title: "Home",
    url: "/",
    icon: "home-03",
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: "wallet-01",
  },
  {
    title: "Stats",
    url: "/stats",
    icon: "chart-line-data-01",
  },
  {
    title: "Budgets",
    url: "/budgets",
    icon: "pie-chart-02",
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