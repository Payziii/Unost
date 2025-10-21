<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Bold from '@/components/pages/Bold.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import TitledImage from '@/components/pages/TitledImage.vue';
</script>

<template>
  <Page title="Пожарная безопасность">
    <Title>Пожарная безопасность</Title>

    <Text align="left">
    <File icon file="Декларация пожарной безопасности объекта(1).pdf">
        Декларация пожарной безопасности объекта
    </File>
    <File icon file="Памятки Безопасности.pdf">
        Памятки Безопасности
    </File>
    </Text>
  </Page>
</template>
