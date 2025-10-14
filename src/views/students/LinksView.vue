```vue
<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
</script>

<template>
    <Page title="Полезные ссылки">
        <Title>Полезные ссылки</Title>
        
        <Text align="center">
            На этой странице собраны полезные ресурсы для студентов и преподавателей: образовательные платформы, 
            порталы по поиску работы, официальные сайты министерств и многое другое.
        </Text>

        <CardGrid>
            <Card title="🏥 Здоровье и профилактика">
                <Text align="left">
                    <Link linkTo="http://livehiv.ru/">Единый информационный портал профилактики и борьбы со СПИД</Link><br/><br/>
                    <Link linkTo="http://www.takzdorovo.ru/download/poster/">"Ты-сильнее" - здоровый образ жизни</Link>
                </Text>
            </Card>

            <Card title="🎓 Образовательные ресурсы">
                <Text align="left">
                    <Link linkTo="https://e.lanbook.com">Электронно-библиотечная система Lanbook</Link><br/><br/>
                    <Link linkTo="https://universarium.org/">Универсариум - онлайн-курсы</Link><br/><br/>
                    <Link linkTo="https://2035.university/">20.35 Университет НТИ</Link><br/><br/>
                    <Link linkTo="https://academy.yandex.ru/">Академия Яндекса</Link>
                </Text>
            </Card>

            <Card title="💼 Карьера и трудоустройство">
                <Text align="left">
                    <Link linkTo="https://trudvsem.ru/">Общероссийская база вакансий</Link><br/><br/>
                    <Link linkTo="https://hh.ru/">HeadHunter</Link><br/><br/>
                    <Link linkTo="https://www.superjob.ru/">SuperJob</Link><br/><br/>
                    <Link linkTo="https://www.rabota.ru/">Работа.ру</Link>
                </Text>
            </Card>

            <Card title="🏛️ Государственные органы">
                <Text align="left">
                    <Link linkTo="http://www.minobraz.ru/">Министерство образования СО</Link><br/><br/>
                    <Link linkTo="https://minobraz.egov66.ru/">Министерство образования и молодежной политики СО</Link><br/><br/>
                    <Link linkTo="http://szn.gossaas.egov66.ru/">Департамент по труду и занятости населения СО</Link>
                </Text>
            </Card>

            <Card title="⚖️ Юридическая помощь">
                <Text align="left">
                    <Link linkTo="http://svd.msudrf.ru/">Бесплатная юридическая помощь в Свердловской области</Link><br/><br/>
                    <Link linkTo="https://worknet-narod.ru/">Народная доска объявлений</Link>
                </Text>
            </Card>

            <Card title="🚀 Предпринимательство">
                <Text align="left">
                    <Link linkTo="https://corpmsp.ru/">Корпорация МСП</Link><br/><br/>
                    <Link linkTo="https://xn--90aifddrld7a.xn--p1ai">Национальный проект "Малое и среднее предпринимательство"</Link><br/><br/>
                    <Link linkTo="https://www.worldskillsacademy.ru/#/programs">Академия Ворлдскиллс Россия</Link>
                </Text>
            </Card>
        </CardGrid>

        <Title>Министерство просвещения РФ</Title>
        <CardGrid>
            <Card title="Официальные ресурсы">
                <Text align="left">
                    <Link linkTo="https://edu.gov.ru/">🌐 Официальный сайт</Link><br/><br/>
                    <Link linkTo="https://vk.com/minprosvet">👥 ВКонтакте</Link><br/><br/>
                    <Link linkTo="https://ok.ru/minprosvet">👋 Одноклассники</Link><br/><br/>
                    <Link linkTo="https://t.me/minprosrf">📱 Телеграм</Link><br/><br/>
                    <Link linkTo="https://sferum.ru/?p=channel&channelId=-222307609">💬 Сферум</Link>
                </Text>
            </Card>
        </CardGrid>

        <Title>Дополнительные ресурсы по поиску работы</Title>
        <Text align="center">
            <Highlight>Агрегаторы вакансий:</Highlight><br/>
            • <Link linkTo="https://neuvoo.ru/">Neuvoo</Link><br/>
            • <Link linkTo="https://ru.jooble.org/">Jooble</Link><br/>
            • <Link linkTo="https://www.trud.com/">Trud.com</Link><br/>
            • <Link linkTo="https://www.zarplata.ru/">Зарплата.ру</Link><br/><br/>

            <Highlight>Специализированные порталы:</Highlight><br/>
            • <Link linkTo="https://gossluzhba.gov.ru/">Госслужба</Link><br/>
            • <Link linkTo="https://ancor.ru/">Кадровое агентство Анкор</Link><br/>
            • <Link linkTo="https://fut.ru/">FutureToday для студентов</Link><br/>
            • <Link linkTo="https://studrabota.spb.ru/">Студенческая работа</Link>
        </Text>


    </Page>
</template>

<style scoped>
.footer-note {
    margin-top: 2rem;
    padding: 1rem;
    background-color: var(--color-background-soft);
    border-radius: 8px;
    border-left: 4px solid var(--color-accent);
}
</style>
```