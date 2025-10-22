<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
import { ref, computed } from 'vue';

// Реактивные данные
const selectedSpecialty = ref('');
const selectedCourse = ref('');
const searchQuery = ref('');
const mainPlans = [
    {
        code: "43.02.17",
        specialty: "Технология индустрии красоты",
        link: "../docs/FtbTDi8SyzRBT8FfhriYfe9ah.xlsx"
    },
    {
        code: "43.02.15",
        specialty: "Поварское и кондитерское дело",
        link: "../docs/nriA8dzteAiZbK46n5deEFdyT.xls"
    },
    {
        code: "23.02.07",
        specialty: "ТО и ремонт двигателей, систем и агрегатов автомобилей",
        link: "../docs/8yab5SQBe5Qbh4KD95kB9ykff.xls"
    },
    {
        code: "22.02.06",
        specialty: "Сварочное производство",
        link: "../docs/NGAnn8skHshsZDfhZfZbhbhT6.xls"
    },
    {
        code: "22.02.02",
        specialty: "Металлургия цветных металлов",
        link: "../docs/kk485nhr4KiZN4eKRE4SZKDhn.xlsx"
    },
    {
        code: "18.02.12",
        specialty: "Технология аналитического контроля химических соединений",
        link: "../docs/b9Na7TEt4zyaQrarfH52QeeGR.xls"
    },
    {
        code: "15.02.16",
        specialty: "Технология машиностроения",
        link: "../docs/Ezf5bis69Q5HNSdns5KF9TQTH.xls"
    },
    {
        code: "15.02.14",
        specialty: "Оснащение средствами автоматизации технологических процессов и производств",
        link: "../docs/kANB67bSy82zsbtYYAQi8RyeZ.xlsx"
    },
    {
        code: "09.02.07",
        specialty: "Информационные системы и программирование",
        link: "../docs/N2A7ebtr8ETd6DKaife4eeZSA.xlsx"
    }
];
const groupPlans = [
    // 43.02.17 Технология индустрии красоты
    { group: "ТИК-111", specialty: "Технология индустрии красоты", code: "43.02.17", course: "1", format: "PDF", link: "../docs/iznnTF2yyy75SNyDif2bSRn34.pdf" },

    // 22.02.02 Металлургия цветных металлов
    { group: "МЦМ-108", specialty: "Металлургия цветных металлов", code: "22.02.02", course: "1", format: "PDF", link: "../docs/EiN4rESyd4h4rZQ8biK5hke92.pdf" },
    { group: "МЦМ-207", specialty: "Металлургия цветных металлов", code: "22.02.02", course: "2", format: "PDF", link: "../docs/rZ9sRY7KD9z49iYKkNb59zze5.pdf" },
    { group: "МЦМ-306", specialty: "Металлургия цветных металлов", code: "22.02.02", course: "3", format: "PDF", link: "../docs/3dNh32BNZSrGQ49Nk3NAKkNkn.pdf" },
    { group: "МЦМ-405", specialty: "Металлургия цветных металлов", code: "22.02.02", course: "4", format: "PDF", link: "../docs/FHaeZnK73BksfGz8SnkE5iFbZ.pdf" },

    // 09.02.07 Информационные системы и программирование
    { group: "ИСП-1304,05", specialty: "Информационные системы и программирование", code: "09.02.07", course: "1", format: "PDF", link: "../docs/zHQ8ZrEHKArNTTzeh9SNya2QT.pdf" },
    { group: "ИСП-2303п", specialty: "Информационные системы и программирование", code: "09.02.07", course: "2", format: "PDF", link: "../docs/kd72SThnzf9NNHka22TFi2RhF.pdf" },
    { group: "ИСП-3301,02", specialty: "Информационные системы и программирование", code: "09.02.07", course: "3", format: "PDF", link: "../docs/rFFbfnrihd55nenyd48Qd8B4S.pdf" },

    // 09.02.04 Информационные системы
    { group: "ИС-436п", specialty: "Информационные системы", code: "09.02.04", course: "4", format: "PDF", link: "../docs/KQ3HKGzREYHZy5K5ihkFYYhQH.pdf" },

    // 15.02.14 Оснащение средствами автоматизации
    { group: "ОСА-191", specialty: "Оснащение средствами автоматизации", code: "15.02.14", course: "1", format: "PDF", link: "../docs/Q7Td2Aa35Na5DSzyEeFE9YtZi.pdf" },

    // 15.02.07 Автоматизация технологических процессов
    { group: "АТП-494", specialty: "Автоматизация технологических процессов", code: "15.02.07", course: "4", format: "PDF", link: "../docs/7bFKi94SF62Yi95n4ZD7a2a5Y.pdf" },

    // 22.02.06 Сварочное производство
    { group: "СП-1611, СП-1612п", specialty: "Сварочное производство", code: "22.02.06", course: "1", format: "PDF", link: "../docs/D6nB7DbGH4nhA6QeKNEsi6SKD.pdf" },
    { group: "СП-269, СП-2610п", specialty: "Сварочное производство", code: "22.02.06", course: "2", format: "PDF", link: "../docs/BEYT6HsFsHRDyKHkSDK7A7n3r.pdf" },
    { group: "СП-367, СП-368", specialty: "Сварочное производство", code: "22.02.06", course: "3", format: "PDF", link: "../docs/etB293kDK6zhk4BZG5eeBs254.pdf" },
    { group: "СП-466", specialty: "Сварочное производство", code: "22.02.06", course: "4", format: "PDF", link: "../docs/KNTsiiZ6e4f6An8ysDy5EiSRB.pdf" },

    // 15.02.16 Технология машиностроения
    { group: "ТМ-1413, ТМ-1414п", specialty: "Технология машиностроения", code: "15.02.16", course: "1", format: "PDF", link: "../docs/STtEKik48i89nzDdZThKKfZKt.pdf" },
    { group: "ТМ-2412", specialty: "Технология машиностроения", code: "15.02.16", course: "2", format: "PDF", link: "../docs/YrZ8ebdBD4Asd349kaibB7Ktb.pdf" },
    { group: "ТМ-3411", specialty: "Технология машиностроения", code: "15.02.08", course: "3", format: "PDF", link: "../docs/iBF8922aakyssA44aNNGsH98T.pdf" },
    { group: "ТМ-4410", specialty: "Технология машиностроения", code: "15.02.08", course: "4", format: "PDF", link: "../docs/3anBtrebKHQYZFS7DRh3fnK3z.pdf" },

    // 23.02.07 Техническое обслуживание автомобилей
    { group: "ТОРД-1705п", specialty: "Техническое обслуживание автомобилей", code: "23.02.07", course: "1", format: "PDF", link: "../docs/NNf3SKHRETS9zSHBBBH2iDKE6.pdf" },
    { group: "ТОРД-2703, ТОРД-2704п", specialty: "Техническое обслуживание автомобилей", code: "23.02.07", course: "2", format: "PDF", link: "../docs/G9bATteR5YAHHdh5hK5NK6keE.pdf" },
    { group: "ТОРД-3701, ТОРД-3702п", specialty: "Техническое обслуживание автомобилей", code: "23.02.07", course: "3", format: "PDF", link: "../docs/Y85haGRaHbT5hAZ6ZtD4Dy9ak.pdf" },

    // 23.02.03 Техническое обслуживание автотранспорта
    { group: "ТОА-4715-16п", specialty: "Техническое обслуживание автотранспорта", code: "23.02.03", course: "4", format: "PDF", link: "../docs/FY6ek3Gfb8bE9Kb33inT3ytB3.pdf" },

    // Другие группы
    { group: "ТАКХС-1202", specialty: "Технология продукции общественного питания", code: "19.02.10", course: "1", format: "PDF", link: "../docs/2d7A6tKt2HtKytNGQ53aYRbys.pdf" },
    { group: "ТАКХС-2201", specialty: "Технология продукции общественного питания", code: "19.02.10", course: "2", format: "PDF", link: "../docs/fBeyEdF7KFGA284yRBbkha3E6.pdf" },
    { group: "ПКД-1805п", specialty: "Поварское и кондитерское дело", code: "43.02.15", course: "1", format: "PDF", link: "../docs/F2t7SbtDZzDNNDzyksTBDkKN2.pdf" },
    { group: "ПКД-2803,2804п", specialty: "Поварское и кондитерское дело", code: "43.02.15", course: "2", format: "PDF", link: "../docs/ReKkdQQ9N84sKRNrBfR3tfiN5.pdf" },
    { group: "ПКД-3801,3802п", specialty: "Поварское и кондитерское дело", code: "43.02.15", course: "3", format: "PDF", link: "../docs/tsFR6eyaRGdtib6h6iTKZ8a5N.pdf" },
    { group: "ТЭО-2510", specialty: "Техническая эксплуатация оборудования", code: "15.02.01", course: "2", format: "PDF", link: "../docs/rhatz58ASNsfdAsHsbys7es9i.pdf" },
    { group: "ТЭО-359", specialty: "Техническая эксплуатация оборудования", code: "15.02.01", course: "3", format: "PDF", link: "../docs/Qa3Q6BEeiE6Z295Z9dda76fd6.pdf" }
];

// Вычисляемые свойства
const specialties = computed(() => [...new Set(groupPlans.map(plan => plan.specialty))]);
const courses = computed(() => [...new Set(groupPlans.map(plan => plan.course))].sort());
const filteredGroupPlans = computed(() => {
    let filtered = groupPlans;
    if (selectedSpecialty.value) {
        filtered = filtered.filter(plan => plan.specialty === selectedSpecialty.value);
    }
    if (selectedCourse.value) {
        filtered = filtered.filter(plan => plan.course === selectedCourse.value);
    }
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(plan =>
            plan.group.toLowerCase().includes(query) ||
            plan.specialty.toLowerCase().includes(query) ||
            plan.code.toLowerCase().includes(query)
        );
    }
    return filtered;
});
const hasActiveFilters = computed(() => {
    return selectedSpecialty.value || selectedCourse.value || searchQuery.value;
});

// Методы
function clearFilters() {
    selectedSpecialty.value = '';
    selectedCourse.value = '';
    searchQuery.value = '';
}
</script>

<template>
    <Page title="Учебные планы ВПМТТ «Юность»">
        <!-- Заголовок и описание -->
        <div class="page-header">
            <Title>Учебные планы</Title>
            <Text align="center" class="subtitle">
                Официальные учебные планы по специальностям Верхнепышминского механико-технологического техникума "Юность"
            </Text>
        </div>

        <!-- Основные учебные планы -->
        <section class="plans-section">
            <Title level="2">Основные учебные планы по специальностям</Title>
            <Text align="center" class="section-description">
                Актуальные учебные планы на 2024/2025 учебный год
            </Text>

            <CardGrid>
                <Card
                    v-for="(plan, index) in mainPlans"
                    :key="index"
                    :title="plan.specialty"
                    :isButton="true"
                    buttonText="Скачать"
                    :buttonLink="plan.link"
                    class="plan-card"
                >
                    <div class="plan-code-container">
                        <div class="plan-code">{{ plan.code }}</div>
                    </div>
                </Card>
            </CardGrid>
        </section>

        <!-- Учебные планы по группам -->
        <section class="groups-section">
            <Title level="2">Учебные планы по группам</Title>
            <Text align="center" class="section-description">
                Детализированные учебные планы для конкретных учебных групп
            </Text>

            <!-- Поиск и фильтры -->
            <div class="search-filters">
                <div class="search-box">
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Поиск по группе, специальности или коду..."
                        class="search-input"
                    >
                    <span class="search-icon">🔍</span>
                </div>

                <div class="filters">
                    <div class="filter-group">
                        <label>Специальность:</label>
                        <select v-model="selectedSpecialty">
                            <option value="">Все специальности</option>
                            <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Курс:</label>
                        <select v-model="selectedCourse">
                            <option value="">Все курсы</option>
                            <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
                        </select>
                    </div>
                    <button
                        v-if="hasActiveFilters"
                        @click="clearFilters"
                        class="clear-filters-btn"
                    >
                        Сбросить
                    </button>
                </div>
            </div>

            <!-- Результаты поиска -->
            <div v-if="filteredGroupPlans.length === 0" class="no-results">
                <Text align="center">Группы не найдены. Попробуйте изменить параметры поиска.</Text>
            </div>

            <!-- Список планов по группам -->
            <div v-else class="groups-grid">
                <div
                    v-for="(group, index) in filteredGroupPlans"
                    :key="index"
                    class="group-card"
                >
                    <div class="group-header">
                        <div class="group-name">{{ group.group }}</div>
                        <div class="group-specialty">{{ group.specialty }}</div>
                    </div>
                    <div class="group-details">
                        <div class="detail-item">
                            <span class="label">Код:</span>
                            <span class="value">{{ group.code }}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Курс:</span>
                            <span class="value">{{ group.course }}</span>
                        </div>
                    </div>
                    <div class="group-actions">
                        <File :file="group.link" icon class="download-btn">
                            Скачать
                        </File>
                    </div>
                </div>
            </div>

            <!-- Информация о количестве результатов -->
            <div v-if="filteredGroupPlans.length > 0" class="results-info">
                <Text align="center" class="results-count">
                    Найдено групп: {{ filteredGroupPlans.length }}
                </Text>
            </div>
        </section>

        <!-- Информация о подписи -->
        <section class="signature-section">
            <div class="signature-container">
                <Card class="signature-card">
                    <Title level="3" class="signature-title">Информация об электронной подписи</Title>
                    <Text align="center" class="signature-text">
                        Все документы подписаны квалифицированной электронной подписью:
                    </Text>
                    <div class="signature-details">
                        <div class="signature-item">
                            <strong>Отпечаток:</strong> 0e92802162d44c7cf36d9bb101c5acee89a8dd85
                        </div>
                        <div class="signature-item">
                            <strong>Организация:</strong> ГОСУДАРСТВЕННОЕ АВТОНОМНОЕ ПРОФЕССИОНАЛЬНОЕ ОБРАЗОВАТЕЛЬНОЕ УЧРЕЖДЕНИЕ СВЕРДЛОВСКОЙ ОБЛАСТИ "ВЕРХНЕПЫШМИНСКИЙ МЕХАНИКО-ТЕХНОЛОГИЧЕСКИЙ ТЕХНИКУМ "ЮНОСТЬ"
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    </Page>
</template>

<style scoped>
.page-header {
    text-align: center;
    margin-bottom: 2rem;
}
.subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-top: 0.5rem;
}
.plans-section,
.groups-section,
.signature-section {
    margin-bottom: 2rem;
}
.section-description {
    color: #666;
    margin-bottom: 1.5rem;
}
.plan-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    padding: 1rem;
    min-height: auto;
}
.plan-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.plan-code-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0;
}
.plan-code {
    background: #f0f7ff;
    color: #0066cc;
    padding: 0.3rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
}
/* Поиск и фильтры */
.search-filters {
    margin-bottom: 1.5rem;
}
.search-box {
    position: relative;
    margin-bottom: 1rem;
    max-width: 400px;
}
.search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
}
.search-input:focus {
    outline: none;
    border-color: #0066cc;
}
.search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}
.filters {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    flex-wrap: wrap;
}
.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.filter-group label {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
}
.filter-group select {
    padding: 0.5rem;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    background: white;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;
    min-width: 200px;
}
.filter-group select:focus {
    outline: none;
    border-color: #0066cc;
}
.clear-filters-btn {
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    border: 1px solid #e1e5e9;
    border-radius: 6px;
    color: #666;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}
.clear-filters-btn:hover {
    background: #e9ecef;
    color: #333;
}
/* Результаты поиска */
.no-results {
    padding: 3rem 1rem;
    text-align: center;
    background: #f8f9fa;
    border-radius: 8px;
    border: 2px dashed #e1e5e9;
}
.results-info {
    margin-top: 1rem;
}
.results-count {
    color: #666;
    font-size: 0.9rem;
}
/* Сетка групп */
.groups-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}
.group-card {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    height: fit-content;
}
.group-card:hover {
    border-color: #0066cc;
    box-shadow: 0 2px 8px rgba(0,102,204,0.1);
}
.group-header {
    margin-bottom: 0.75rem;
}
.group-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a365d;
    margin-bottom: 0.25rem;
}
.group-specialty {
    color: #666;
    font-size: 0.8rem;
    line-height: 1.3;
}
.group-details {
    margin-bottom: 1rem;
    flex-grow: 1;
}
.detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    padding: 0.2rem 0;
    font-size: 0.85rem;
}
.detail-item .label {
    color: #666;
    font-weight: 500;
}
.detail-item .value {
    color: #333;
    font-weight: 600;
}
.group-actions {
    margin-top: auto;
}
.download-btn {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.5rem;
}
/* Секция подписи */
.signature-section {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
}
.signature-container {
    width: 100%;
    max-width: 800px;
}
.signature-card {
    background: linear-gradient(135deg, #f0f7ff 0%, #e6f3ff 100%);
    border: 1px solid #cce0ff;
    text-align: center;
    padding: 1.5rem;
}
.signature-title {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.3rem;
}
.signature-text {
    color: #666;
    margin-bottom: 1.5rem;
    text-align: center;
}
.signature-details {
    margin-top: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 6px;
    border: 1px solid #e1e5e9;
}
.signature-item {
    margin-bottom: 0.75rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
    line-height: 1.4;
    text-align: left;
    font-size: 0.9rem;
}
.signature-item:last-child {
    margin-bottom: 0;
    border-bottom: none;
}
.signature-item strong {
    color: #333;
    display: inline-block;
    min-width: 100px;
}
/* Адаптивность */
@media (max-width: 768px) {
    .filters {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }
    .groups-grid {
        grid-template-columns: 1fr;
    }
    .filter-group select {
        min-width: 100%;
    }
    .search-box {
        max-width: 100%;
    }
    .signature-card {
        padding: 1rem;
        margin: 0 0.5rem;
    }
    .signature-item {
        text-align: center;
    }
    .signature-item strong {
        display: block;
        margin-bottom: 0.25rem;
    }
}
@media (max-width: 480px) {
    .groups-grid {
        grid-template-columns: 1fr;
    }
    .group-card {
        padding: 0.75rem;
    }
    .group-name {
        font-size: 1rem;
    }
    .detail-item {
        font-size: 0.8rem;
    }
}
</style>
