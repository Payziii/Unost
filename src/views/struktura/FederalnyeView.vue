<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Link from '@/components/pages/Link.vue';
</script>

<template>
    <Page title="Федеральные проекты">
        <Title>Федеральные проекты</Title>
        
        <Text align="left">
            • <Link linkTo="/structure/korpus_obschestvennyh_nablyudateley">Корпус общественных наблюдателей</Link><br/>
            • <Link linkTo="/structure/natsionalnaya_sistema_kvalifikatsiy">ФП «Национальная система квалификаций – конструктор карьеры»</Link><br/>
            • <Link linkTo="/applicants/professionalitet">Профессионалитет</Link><br/>
            • <Link linkTo="/structure/volonterstvo">Волонтёрство – среда эффективной социализации студентов ГАПОУ СО ВПМТТ «Юность»</Link><br/>
            • <Link linkTo="/structure/federalnyy_proekt_sodeystvie_zanyatosti">Федеральный проект "Содействие занятости"</Link>
        </Text>
    </Page>
</template>