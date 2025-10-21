<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import File from '@/components/pages/File.vue';
</script>

<template>
  <Page title="Учебные планы">
    <Title>Учебные планы</Title>
    <Text align="left">
      <File
        file="учебный_план_5_класс_2023-2028.pdf"
        icon
      >
        Учебный план 5 класс (2023-2028 учебный год)
      </File>
      <File
        file="учебный_план_6_класс_2022-2027.pdf"
        icon
      >
        Учебный план 6 класс (2022-2027 учебный год)
      </File>
      <File
        file="учебный_план_7_класс_2021-2026.pdf"
        icon
      >
        Учебный план 7 класс (2021-2026 учебный год)
      </File>
      <File
        file="учебный_план_8_класс_2020-2025.pdf"
        icon
      >
        Учебный план 8 класс (2020-2025 учебный год)
      </File>
      <File
        file="учебный_план_9_класс_2019-2024.pdf"
        icon
      >
        Учебный план 9 класс (2019-2024 учебный год)
      </File>
      <File
        file="учебный_план_10_класс_2023-2025.pdf"
        icon
      >
        Учебный план 10 класс (2023-2025 учебный год)
      </File>
      <File
        file="учебный_план_11_класс_2023-2024.pdf"
        icon
      >
        Учебный план 11 класс (2023-2024 учебный год)
      </File>
    </Text>
  </Page>
</template>
