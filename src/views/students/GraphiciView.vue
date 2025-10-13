<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Title.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
</script>

<template>
    <Page title="Графики учебного процесса ВПМТТ «Юность»">
        <!-- Заголовок и описание -->
        <div class="page-header">
            <Title>Графики учебного процесса</Title>
            <Text align="center" class="subtitle">
                Официальные графики и планы учебного процесса на 2024-2025 учебный год
            </Text>
        </div>

        <!-- Графики -->
        <section class="schedules-section">
            <CardGrid>
                <Card 
                    title="План-график работы СПО на 2024-2025 уч.год"
                    :isButton="true"
                    buttonText="Открыть"
                    buttonLink="/docs/grafik_spo_2024_2025.pdf"
                    class="schedule-card card-1"
                >
                    <div class="card-content">
                        <div class="schedule-period">Сентябрь 2024 - Июнь 2025</div>
                    </div>
                </Card>

                <Card 
                    title="Сводный годовой календарный график учебного процесса на 2024-2025 уч.год"
                    :isButton="true"
                    buttonText="Открыть"
                    buttonLink="/docs/svodny_grafik_2024_2025.pdf"
                    class="schedule-card card-2"
                >
                    <div class="card-content">
                        <div class="schedule-period">Полный учебный год</div>
                    </div>
                </Card>

                <Card 
                    title="Графики проведения государственной итоговой аттестации"
                    :isButton="true"
                    buttonText="Открыть"
                    buttonLink="/docs/grafik_gia_2025.pdf"
                    class="schedule-card card-3"
                >
                    <div class="card-content">
                        <div class="schedule-period">Июнь 2025</div>
                    </div>
                </Card>

                <Card 
                    title="График летней промежуточной аттестации"
                    :isButton="true"
                    buttonText="Открыть"
                    buttonLink="/docs/grafik_letney_attestacii.pdf"
                    class="schedule-card card-4"
                >
                    <div class="card-content">
                        <div class="schedule-period">Летний период</div>
                    </div>
                </Card>

                <Card 
                    title="График демонстрационного экзамена"
                    :isButton="true"
                    buttonText="Открыть"
                    buttonLink="/docs/grafik_demo_exam.pdf"
                    class="schedule-card card-5"
                >
                    <div class="card-content">
                        <div class="schedule-period">2024-2025 уч.год</div>
                    </div>
                </Card>

                <Card 
                    title="График консультаций промежуточной аттестации"
                    :isButton="true"
                    buttonText="Открыть"
                    buttonLink="/docs/grafik_konsultaciy_attestacii.pdf"
                    class="schedule-card card-6"
                >
                    <div class="card-content">
                        <div class="schedule-period">По семестрам</div>
                    </div>
                </Card>

                <Card 
                    title="График консультаций по написанию дипломных работ"
                    :isButton="true"
                    buttonText="Открыть"
                    buttonLink="/docs/grafik_diplomnyh_rabot.pdf"
                    class="schedule-card card-7 last-card"
                >
                    <div class="card-content">
                        <div class="schedule-period">Выпускной курс</div>
                    </div>
                </Card>
            </CardGrid>
        </section>
    </Page>
</template>

<style scoped>
.page-header {
    text-align: center;
    margin-bottom: 3rem;
}

.subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-top: 0.5rem;
}

.schedules-section {
    margin-bottom: 3rem;
}

.schedule-card {
    transition: all 0.3s ease;
    padding: 1.5rem;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    border: 2px solid transparent;
    background: white;
}

.schedule-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

/* Цвета при наведении для каждой карточки */
.card-1:hover {
    border-color: #4facfe;
    background: linear-gradient(135deg, #f7fbff 0%, #eff7ff 100%);
}

.card-2:hover {
    border-color: #4facfe;
    background: linear-gradient(135deg, #f7fbff 0%, #eff7ff 100%);
}

.card-3:hover {
    border-color: #4facfe;
    background: linear-gradient(135deg, #f7fbff 0%, #eff7ff 100%);
}

.card-4:hover {
    border-color: #4facfe;
    background: linear-gradient(135deg, #f7fbff 0%, #eff7ff 100%);
}

.card-5:hover {
    border-color: #4facfe;
    background: linear-gradient(135deg, #f7fbff 0%, #eff7ff 100%);
}

.card-6:hover {
    border-color: #4facfe;
    background: linear-gradient(135deg, #f7fbff 0%, #eff7ff 100%);
}

.card-7:hover {
    border-color: #4facfe;
    background: linear-gradient(135deg, #f7fbff 0%, #eff7ff 100%);
}

.card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.schedule-period {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    margin-top: auto;
    transition: all 0.3s ease;
}

/* Изменение цвета периода при наведении на карточку */
.card-1:hover .schedule-period {
    background: linear-gradient(135deg, #459de6 0%, #3a8ad4 100%);
}

.card-2:hover .schedule-period {
    background: linear-gradient(135deg, #459de6 0%, #3a8ad4 100%);
}

.card-3:hover .schedule-period {
    background: linear-gradient(135deg, #459de6 0%, #3a8ad4 100%);
}

.card-4:hover .schedule-period {
    background: linear-gradient(135deg, #459de6 0%, #3a8ad4 100%);
}

.card-5:hover .schedule-period {
    background: linear-gradient(135deg, #459de6 0%, #3a8ad4 100%);
}

.card-6:hover .schedule-period {
    background: linear-gradient(135deg, #459de6 0%, #3a8ad4 100%);
}

.card-7:hover .schedule-period {
    background: linear-gradient(135deg, #459de6 0%, #3a8ad4 100%);
}

/* Стили для последней карточки - центрирование */
:deep(.last-card) {
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 400px;
    width: 100%;
}

/* Адаптивность */
@media (max-width: 768px) {
    .schedule-card {
        min-height: 160px;
        padding: 1.25rem;
    }
    
    :deep(.last-card) {
        grid-column: 1;
        max-width: 100%;
    }
}

@media (max-width: 480px) {
    .schedule-card {
        padding: 1rem;
        min-height: 150px;
    }
    
    .schedule-period {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
    }
    
    .card-content {
        margin-bottom: 0.75rem;
    }
}

/* Анимации */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.schedule-card {
    animation: fadeInUp 0.6s ease-out;
}

.schedule-card:nth-child(1) { animation-delay: 0.1s; }
.schedule-card:nth-child(2) { animation-delay: 0.2s; }
.schedule-card:nth-child(3) { animation-delay: 0.3s; }
.schedule-card:nth-child(4) { animation-delay: 0.4s; }
.schedule-card:nth-child(5) { animation-delay: 0.5s; }
.schedule-card:nth-child(6) { animation-delay: 0.6s; }
.schedule-card:nth-child(7) { animation-delay: 0.7s; }
</style>