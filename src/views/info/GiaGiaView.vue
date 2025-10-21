<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
import TitledImage from '@/components/pages/TitledImage.vue';
</script>

<template>
    <Page title="Государственная Итоговая Аттестация">
        <Title>Государственная Итоговая Аттестация</Title>
        
        <Text align="left">
            <Link linkTo="/info/kshi/gosudarstvennaya_itogovaya_attestatsiya/oge/">ОГЭ</Link><br/>
            <Link linkTo="/info/kshi/gosudarstvennaya_itogovaya_attestatsiya/ege/">ЕГЭ</Link>
        </Text>

        <Text align="center">
            <Link linkTo="#">Памятка для родителей «Шесть советов в период подготовки кадета к экзаменам»</Link>
        </Text>

        <CardGrid>
            <Card title="Конфликтная комиссия - ЕГЭ">
                <Text align="justify">
                    <Highlight>Уважаемые участники ЕГЭ, напоминаем о процедуре апелляции:</Highlight><br/><br/>
                    • Апелляция о нарушении процедуры проведения ГИА (подается в ППЭ не выходя за его пределы)<br/>
                    • Апелляция о несогласии с выставленными баллами подается не позднее двух рабочих дней после объявления результатов экзамена<br/><br/>
                    Результаты апелляции утверждаются протоколами и доводятся до сведения обратившихся. Обучающиеся могут присутствовать на заседании КК вместе с родителями (законными представителями).<br/><br/>
                    <Highlight>Апелляции НЕ ПРИНИМАЮТСЯ по вопросам:</Highlight><br/>
                    • Содержания и структуры заданий по учебным предметам<br/>
                    • Связанным с нарушениями обучающимися требований Порядка проведения ГИА<br/>
                    • Неправильным оформлением работ
                </Text>
                
                <Text align="justify">
                    На сайте <Link linkTo="http://ege.midural.ru">ege.midural.ru</Link> размещены документы, регламентирующие работу Конфликтной комиссии Свердловской области.<br/><br/>
                    <Link linkTo="http://ege.midural.ru/uchastnikam/konfliktnaja-komissija.html">Скачать бланки заявлений на апелляцию</Link>
                </Text>

                <Text align="justify">
                    <Highlight>Контактные данные конфликтной комиссии Свердловской области:</Highlight><br/>
                    Телефон: 8 (343) 360 29 86, доб. 136<br/>
                    Секретарь Конфликтной комиссии: +7-909-015-32-25<br/>
                    Email: <Link linkTo="mailto:kk@gia66.ru1">kk@gia66.ru1</Link>
                </Text>
            </Card>

            <Card title="Конфликтная комиссия - ОГЭ">
                <Text align="justify">
                    <Highlight>Уважаемые участники ОГЭ, напоминаем вам о процедуре апелляции:</Highlight><br/><br/>
                    Процедура апелляции аналогична процедуре для ЕГЭ. Подробную информацию можно получить у ответственного лица.
                </Text>

                <Text align="justify">
                    <Highlight>Контактные данные по вопросам апелляции процедуры ОГЭ:</Highlight><br/>
                    Зам. директора по УР Рабенок Мария Александровна<br/>
                    Телефон: 8 (34368) 5-44-33
                </Text>
            </Card>
        </CardGrid>
            <TitledImage src="/images/giagia.png"/>

        <Title>Нормативные документы</Title>
        
        <Text align="left">
            <File file="Положение об организации и проведении итогового собеседования в кадетской школе-интернате.pdf" icon>Положение об организации и проведении итогового собеседования в кадетской школе-интернате</File>
            <File file="Приказ_Об утверждении Порядка проведения государственной итоговой аттестации по образовательным программам основного общего образования.pdf" icon>Приказ об утверждении Порядка проведения ГИА по программам основного общего образования</File>
            <File file="Приказ Об утверждении Порядка проведения государственной итоговой аттестации по образовательным программам среднего общего образования.pdf" icon>Приказ об утверждении Порядка проведения ГИА по программам среднего общего образования</File>
        </Text>

        <Text align="justify">
            <Highlight>Важная информация:</Highlight><br/>
            Все вопросы, связанные с проведением государственной итоговой аттестации, можно уточнить у ответственных лиц образовательного учреждения.
        </Text>
    </Page>
</template>

<style scoped>
.card-grid {
    margin: 2rem 0;
}
</style>