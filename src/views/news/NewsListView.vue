<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchNewsList } from '@/services/newsService'

const route = useRoute()
const news = ref([])
const loading = ref(false)
const error = ref('')

const searchTerm = ref('')
const sortOrder = ref('newest')
const showOnlyWithImages = ref(false)

const highlightSlug = ref('')
const activeHighlightSlug = ref('')

const getItemSlug = (item) => item?.slug || String(item?.id || '')
const getItemLink = (item) => {
  if (item?.page_path) return item.page_path
  if (item?.slug) return `/news/${item.slug}`
  return ''
}
const getItemDate = (item) => {
  const raw =
    item?.created_at ||
    item?.published_at ||
    item?.updated_at ||
    item?.date ||
    ''

  const parsed = raw ? new Date(raw) : null
  return Number.isFinite(parsed?.getTime()) ? parsed.getTime() : 0
}

const normalizedSearch = computed(() => searchTerm.value.trim().toLowerCase())

const filteredNews = computed(() => {
  let items = Array.isArray(news.value) ? [...news.value] : []

  if (normalizedSearch.value) {
    items = items.filter((item) => {
      const title = String(item?.title || '').toLowerCase()
      const content = String(item?.content || '').toLowerCase()
      return (
        title.includes(normalizedSearch.value) ||
        content.includes(normalizedSearch.value)
      )
    })
  }

  if (showOnlyWithImages.value) {
    items = items.filter((item) => Boolean(item?.image_url))
  }

  return items
})

const sortedNews = computed(() => {
  const items = [...filteredNews.value]

  switch (sortOrder.value) {
    case 'oldest':
      items.sort((a, b) => getItemDate(a) - getItemDate(b))
      break
    case 'title':
      items.sort((a, b) => {
        const first = String(a?.title || '').toLowerCase()
        const second = String(b?.title || '').toLowerCase()
        return first.localeCompare(second, 'ru')
      })
      break
    case 'newest':
    default:
      items.sort((a, b) => getItemDate(b) - getItemDate(a))
      break
  }

  return items
})

const highlightVisible = computed(() =>
  sortedNews.value.some((item) => getItemSlug(item) === highlightSlug.value)
)

const highlightMissingButLoaded = computed(
  () =>
    Boolean(highlightSlug.value) &&
    !highlightVisible.value &&
    !loading.value &&
    news.value.length > 0
)

const fetchNews = async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await fetchNewsList()
    news.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Не удалось загрузить список новостей:', err)
    error.value =
      err?.message || 'Произошла ошибка при получении списка новостей'
    news.value = []
  } finally {
    loading.value = false
  }
}

const scrollToHighlight = async () => {
  if (!highlightSlug.value) return

  await nextTick()

  const elementId = `news-${highlightSlug.value}`
  const element = document.getElementById(elementId)

  if (!element) return

  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
  element.classList.add('news-item--recently-focused')
  activeHighlightSlug.value = highlightSlug.value

  setTimeout(() => {
    element?.classList.remove('news-item--recently-focused')
  }, 2400)
}

const applyQueryHighlight = () => {
  const slug = String(route.query?.highlight || '').trim()
  highlightSlug.value = slug
  activeHighlightSlug.value = slug
}

const clearFilters = () => {
  searchTerm.value = ''
  sortOrder.value = 'newest'
  showOnlyWithImages.value = false
}

const handleRetry = () => fetchNews()

watch(
  () => route.query.highlight,
  () => {
    applyQueryHighlight()
    scrollToHighlight()
  }
)

watch(sortedNews, () => {
  if (highlightVisible.value) {
    scrollToHighlight()
  }
})

watch(showOnlyWithImages, () => {
  if (!showOnlyWithImages.value) {
    activeHighlightSlug.value = highlightSlug.value
  }
})

onMounted(async () => {
  applyQueryHighlight()
  await fetchNews()
  scrollToHighlight()
})
</script>

<template>
  <section class="news-page">
    <header class="news-page__header">
      <h1 class="news-page__title">Новости</h1>
      <p class="news-page__subtitle">
        Следите за всеми событиями колледжа: здесь собраны публикации с главной
        страницы, а также архивные материалы.
      </p>
    </header>

    <div class="news-controls">
      <label class="news-controls__group">
        <span class="news-controls__label">Поиск</span>
        <input
          v-model="searchTerm"
          type="search"
          class="news-controls__search"
          placeholder="Введите часть заголовка или текста новости"
        />
      </label>

      <label class="news-controls__group">
        <span class="news-controls__label">Сортировка</span>
        <select v-model="sortOrder" class="news-controls__select">
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="title">По алфавиту</option>
        </select>
      </label>

      <label class="news-controls__group news-controls__group--checkbox">
        <input
          v-model="showOnlyWithImages"
          class="news-controls__checkbox"
          type="checkbox"
        />
        <span>Только с изображениями</span>
      </label>

      <button
        type="button"
        class="news-controls__reset"
        @click="clearFilters"
        :disabled="
          !searchTerm && sortOrder === 'newest' && showOnlyWithImages === false
        "
      >
        Сбросить
      </button>
    </div>

    <div class="news-state" v-if="loading">
      Загружаем новости...
    </div>

    <div class="news-state news-state--error" v-else-if="error">
      <p>{{ error }}</p>
      <button type="button" class="news-state__retry" @click="handleRetry">
        Попробовать снова
      </button>
    </div>

    <div class="news-state" v-else-if="sortedNews.length === 0">
      <p>Не найдено ни одной новости по текущим критериям.</p>
      <button
        type="button"
        class="news-state__retry"
        @click="clearFilters"
        v-if="searchTerm || showOnlyWithImages || sortOrder !== 'newest'"
      >
        Сбросить фильтры
      </button>
    </div>

    <div
      class="news-state news-state--hint"
      v-else-if="highlightMissingButLoaded"
    >
      Выбранная новость скрыта текущими фильтрами.
      <button type="button" class="news-state__retry" @click="clearFilters">
        Показать все новости
      </button>
    </div>

    <div class="news-list" v-else>
      <article
        v-for="item in sortedNews"
        :key="getItemSlug(item)"
        class="news-item"
        :id="`news-${getItemSlug(item)}`"
        :class="{
          'news-item--highlighted': getItemSlug(item) === activeHighlightSlug
        }"
      >
        <header class="news-item__header">
          <h2 class="news-item__title">
            <RouterLink
              v-if="getItemLink(item)"
              :to="getItemLink(item)"
              class="news-item__link"
            >
              {{ item.title }}
            </RouterLink>
            <span v-else>{{ item.title }}</span>
          </h2>

          <time
            v-if="item.created_at || item.published_at || item.updated_at"
            class="news-item__date"
            :datetime="item.created_at || item.published_at || item.updated_at"
          >
            {{
              new Date(
                item.created_at || item.published_at || item.updated_at
              ).toLocaleDateString('ru-RU')
            }}
          </time>
        </header>

        <figure v-if="item.image_url" class="news-item__media">
          <img :src="item.image_url" :alt="item.title" loading="lazy" />
        </figure>

        <p class="news-item__excerpt">
          {{ item.content }}
        </p>

        <footer class="news-item__footer">
          <RouterLink
            v-if="getItemLink(item)"
            class="news-item__button"
            :to="getItemLink(item)"
          >
            Читать полностью
          </RouterLink>
          <button
            v-else
            type="button"
            class="news-item__button news-item__button--disabled"
            disabled
          >
            Страница недоступна
          </button>
        </footer>
      </article>
    </div>
  </section>
</template>

<style scoped>
.news-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 20px 56px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.news-page__header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.news-page__title {
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
  color: #1f2937;
}

.news-page__subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
}

.news-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
  align-items: end;
}

.news-controls__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.95rem;
  color: #374151;
}

.news-controls__group--checkbox {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.news-controls__label {
  font-weight: 600;
  color: #111827;
}

.news-controls__search,
.news-controls__select {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.news-controls__search:focus,
.news-controls__select:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
  outline: none;
}

.news-controls__checkbox {
  width: 16px;
  height: 16px;
  accent-color: #f97316;
}

.news-controls__reset {
  border: none;
  background: transparent;
  color: #f97316;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 0;
  justify-self: flex-end;
  transition: color 0.2s ease;
}

.news-controls__reset:disabled {
  color: #d1d5db;
  cursor: default;
}

.news-controls__reset:not(:disabled):hover {
  color: #ea580c;
}

.news-state {
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  color: #4b5563;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
}

.news-state--error {
  border-color: #fca5a5;
  color: #dc2626;
}

.news-state--hint {
  border-style: solid;
  border-color: rgba(249, 115, 22, 0.25);
  background: rgba(249, 115, 22, 0.05);
  color: #ea580c;
}

.news-state__retry {
  border: none;
  border-radius: 24px;
  background: linear-gradient(90deg, #f97316, #fb923c);
  color: #fff;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-state__retry:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.25);
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.news-item {
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 40px -24px rgba(17, 24, 39, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border: 1px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.news-item:hover {
  border-color: rgba(249, 115, 22, 0.35);
  box-shadow: 0 28px 44px -18px rgba(249, 115, 22, 0.35);
}

.news-item--highlighted {
  border-color: rgba(249, 115, 22, 0.6);
  box-shadow: 0 28px 60px -20px rgba(249, 115, 22, 0.45);
}

.news-item--recently-focused {
  animation: pulse 1.2s ease-in-out 2;
}

.news-item__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.news-item__title {
  margin: 0;
  font-size: clamp(22px, 3vw, 28px);
  color: #1f2937;
}

.news-item__link {
  color: inherit;
  text-decoration: none;
}

.news-item__link:hover {
  color: #f97316;
}

.news-item__date {
  font-size: 0.9rem;
  color: #6b7280;
}

.news-item__media {
  margin: 0;
  border-radius: 14px;
  overflow: hidden;
  max-height: 420px;
}

.news-item__media img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.news-item__excerpt {
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
}

.news-item__footer {
  display: flex;
  justify-content: flex-end;
}

.news-item__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 999px;
  background: linear-gradient(90deg, #f97316, #fb923c);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.news-item__button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.25);
}

.news-item__button--disabled {
  cursor: default;
  background: #d1d5db;
  color: #6b7280;
  box-shadow: none;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.35);
  }
  50% {
    box-shadow: 0 0 0 14px rgba(249, 115, 22, 0);
  }
}

@media (max-width: 768px) {
  .news-page {
    padding: 24px 16px 48px;
  }

  .news-controls {
    grid-template-columns: 1fr;
  }

  .news-item {
    padding: 20px;
  }

  .news-item__footer {
    justify-content: flex-start;
  }
}
</style>
