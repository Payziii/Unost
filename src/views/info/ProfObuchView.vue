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
    <Page title="Профессиональное обучение">
        <Title>Профессиональное обучение</Title>
        
        <Text align="justify">
            <p><strong>«Верхнепышминский механико-технологический техникум «Юность»</strong> реализует обучение по программам профессионального обучения (подготовка, переподготовка и повышение квалификации по профессии рабочего, должности служащего), в том числе и для граждан предпенсионного возраста.</p>
        </Text>

        <!-- Таблица программ обучения -->
        <Text align="left">
            <p><strong>Программы профессионального обучения:</strong></p>
            <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 20px 0; background-color: #ffffff; border: 2px solid #000000;">
                <thead>
                    <tr>
                        <th style="padding: 12px; border: 2px solid #000000; text-align: center; background-color: #ffffff;">№</th>
                        <th style="padding: 12px; border: 2px solid #000000; text-align: center; background-color: #ffffff;">Код</th>
                        <th style="padding: 12px; border: 2px solid #000000; background-color: #ffffff;">Наименование программы</th>
                        <th style="padding: 12px; border: 2px solid #000000; text-align: center; background-color: #ffffff;">Срок</th>
                        <th style="padding: 12px; border: 2px solid #000000; text-align: center; background-color: #ffffff;">Квалификация</th>
                        <th style="padding: 12px; border: 2px solid #000000; text-align: center; background-color: #ffffff;">Стоимость, руб</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" style="padding: 10px; text-align: center; font-weight: bold; background-color: #ffffff; border: 2px solid #000000;">Транспорт</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">1</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">11442</td>
                        <td style="padding: 10px; border: 2px solid #000000; background-color: #ffffff;"><strong>Водитель автомобиля (категории «В»)</strong></td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">190 час</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">водитель категории «В»</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">39 000</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">2</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">11442</td>
                        <td style="padding: 10px; border: 2px solid #000000; background-color: #ffffff;"><strong>Переподготовка водителей с категории «В» на категорию «С»</strong></td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">84 час</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">водитель категории «С»</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">30 500</td>
                    </tr>
                    
                    <tr>
                        <td colspan="6" style="padding: 10px; text-align: center; font-weight: bold; background-color: #ffffff; border: 2px solid #000000;">Сервис, оказание услуг населению</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">3</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">16675</td>
                        <td style="padding: 10px; border: 2px solid #000000; background-color: #ffffff;"><strong>Повар</strong></td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">2 мес</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">3-5 разряда</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">15 000</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">4</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">12901</td>
                        <td style="padding: 10px; border: 2px solid #000000; background-color: #ffffff;"><strong>Кондитер</strong></td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">2 мес</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">3-5 разряда</td>
                        <td style="padding: 10px; text-align: center; border: 2px solid #000000; background-color: #ffffff;">15 000</td>
                    </tr>
                </tbody>
            </table>
        </Text>

        <!-- Образовательные программы -->
        <Text align="left">
            <p><strong>Образовательные программы профессионального обучения:</strong></p>
            <File file="программа профессиональной подготовки водителей транспортных средств категории В.pdf" icon>Программа профессиональной подготовки водителей транспортных средств категории В</File>
            <File file="программа профессиональной переподготовки водителей транспортных средств с категории В на категорию С.pdf" icon>Программа профессиональной переподготовки водителей транспортных средств с категории В на категорию С</File>
            <File file="программа профессиональной переподготовки по профессии 16675 Повар.pdf" icon>Программа профессиональной переподготовки по профессии 16675 Повар</File>
            <File file="программа профессиональной переподготовки по профессии 12901 Кондитер.pdf" icon>Программа профессиональной переподготовки по профессии 12901 Кондитер</File>
        </Text>

        <!-- Документы для зачисления -->
        <Title>Документы для зачисления</Title>
        <CardGrid>
            <Card title="Общие документы">
                <Text align="left">
                    <Highlight>Для всех программ:</Highlight><br/>
                    1. Копия паспорта с пропиской<br/>
                    2. Копия СНИЛСа<br/>
                    3. Номер ИНН
                </Text>
            </Card>
            <Card title="Для водителей">
                <Text align="left">
                    <Highlight>Дополнительно для программ вождения:</Highlight><br/>
                    1. Копия паспорта с пропиской<br/>
                    2. Копия СНИЛСа<br/>
                    3. Копия водительского удостоверения (при наличии)<br/>
                    4. Медицинское заключение транспортной комиссии<br/>
                    5. 1 фото 3×4<br/>
                    6. Номер ИНН
                </Text>
            </Card>
        </CardGrid>

        <!-- Контактная информация -->
        <Title>Контактная информация</Title>
        <Text align="left">
            <p><strong>Телефон для записи:</strong> 8-950-638-53-21</p>
            <p><strong>Контактное лицо:</strong> Федорова Марина Владимировна</p>
            <p><strong>Адрес подачи документов:</strong> г. Верхняя Пышма, ул. Кривоусова д. 53, кабинет 55</p>
        </Text>

        <!-- Нормативные документы -->
        <Text align="left">
            <p><strong>Нормативные документы:</strong></p>
            <File file="Положение об оказании платных образовательных услуг.pdf" icon>Положение об оказании платных образовательных услуг</File>
            <File file="Договор на оказание платных образовательных услуг по программам профессионального обучения.docx" icon>Договор на оказание платных образовательных услуг по программам профессионального обучения</File>
        </Text>
    </Page>
</template>
```