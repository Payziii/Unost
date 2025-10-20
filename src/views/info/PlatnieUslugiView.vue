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
    <Page title="Платные образовательные услуги">

        <Title>Платные образовательные услуги</Title>

        <Text align="justify">
            На этой странице вы можете ознакомиться с документами и реквизитами для оплаты платных образовательных
            услуг, предоставляемых ГАПОУ СО «ВПМТТ «Юность».
        </Text>

        <Title>Документы</Title>

        <Text align="left">
            <File file="/upload/files/Студент 2023-2024 договор 1 курс 3 стороны.docx" icon>
                Договор на оказание платных образовательных услуг для совершеннолетних
            </File>
            <File file="/upload/files/Студент 2023 договор 2 стороны 1 курс(1).docx" icon>
                Договор на оказание платных образовательных услуг для несовершеннолетних
            </File>
            <File file="/upload/files/Порядок оказания платных услуг и основания снижения стоимости.pdf" icon>
                Положение о порядке оказания платных образовательных услуг
            </File>
            <File file="/upload/files/Прайс лист на обучение ЦПДЭ.pdf" icon>
                Прайс-лист на обучение
            </File>
        </Text>

        <Title>Реквизиты для оплаты</Title>

        <Text align="justify">
            <strong>ОГРН:</strong> 1026600728307<br>
            <strong>ИНН:</strong> 6606004237<br>
            <strong>КПП:</strong> 668601001<br>
            <strong>Лицевой счёт:</strong> 33012010900<br>
            <strong>КБК:</strong> 00000000000000000130<br>
            <strong>Казначейский счёт:</strong> 03224643650000006200<br>
            <strong>Единый казначейский счёт:</strong> 40102810645370000054<br>
            <strong>Банк:</strong> Уральское ГУ Банка России, г. Екатеринбург<br>
            <strong>БИК:</strong> 016577551<br>
            <strong>ОКТМО:</strong> 65732000<br>
            <strong>Адрес:</strong> 624096, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, д. 53<br>
            <strong>Телефон:</strong> +7 (34368) 5-44-86
        </Text>

        <Text align="justify" class="highlight-box">
            <Highlight>В назначении платежа обязательно укажите Ф.И.О. студента (за кого вы платите)!</Highlight>
        </Text>
        <CardGrid><img src="/images/AboutUs/реквезиты.jpg " alt="Реквизиты для оплаты" height="auto" width="500px" />
        </CardGrid>


        <Title>Преимущества платных услуг</Title>

        <CardGrid>
            <Card title="Индивидуальный подход">
                <Text align="center">
                    Занятия проводятся с учетом индивидуальных особенностей и потребностей обучающихся.
                </Text>
            </Card>
            <Card title="Гибкий график">
                <Text align="center">
                    Возможность выбора удобного времени для обучения и оплаты.
                </Text>
            </Card>
            <Card title="Современное оборудование">
                <Text align="center">
                    Занятия проходят на современном оборудовании и с использованием актуальных методик.
                </Text>
            </Card>
            <Card title="Квалифицированные преподаватели">
                <Text align="center">
                    Занятия ведут опытные преподаватели и специалисты в своей области.
                </Text>
            </Card>
        </CardGrid>
    </Page>
</template>

<style scoped>
.highlight-box {
    background-color: #f8f9fa;
    padding: 15px;
    border-left: 4px solid #007bff;
    margin: 20px 0;
}
</style>
