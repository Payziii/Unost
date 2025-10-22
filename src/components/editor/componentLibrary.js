const cloneValue = (value) => {
  if (value === undefined) {
    return undefined
  }

  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(value)
    } catch (_) {
      // fall through to JSON clone fallback
    }
  }

  if (value === null) {
    return null
  }

  try {
    return JSON.parse(JSON.stringify(value))
  } catch (_) {
    return value
  }
}

export const pageComponentLibrary = [
  {
    type: 'Title',
    label: 'Заголовок',
    description: 'Крупный заголовок страницы',
    propsSchema: [
      { name: 'content', label: 'Текст', type: 'textarea', required: true, default: '' }
    ]
  },
  {
    type: 'Text',
    label: 'Текстовый блок',
    description: 'Абзац текста с настройкой выравнивания',
    propsSchema: [
      { name: 'content', label: 'Текст', type: 'textarea', required: true, default: '' },
      {
        name: 'align',
        label: 'Выравнивание',
        type: 'select',
        default: 'justify',
        options: [
          { value: 'left', label: 'По левому краю' },
          { value: 'center', label: 'По центру' },
          { value: 'right', label: 'По правому краю' },
          { value: 'justify', label: 'По ширине' }
        ]
      }
    ]
  },
  {
    type: 'Highlight',
    label: 'Выделенный текст',
    description: 'Короткий текст с цветом и жирностью',
    propsSchema: [
      { name: 'content', label: 'Текст', type: 'text', required: true, default: '' },
      { name: 'color', label: 'Цвет', type: 'text', default: '#ff4800', placeholder: '#ff4800' },
      { name: 'isBold', label: 'Жирный шрифт', type: 'checkbox', default: true }
    ]
  },
  {
    type: 'Link',
    label: 'Ссылка',
    description: 'Ссылка на внешний ресурс',
    propsSchema: [
      { name: 'content', label: 'Текст ссылки', type: 'text', required: true, default: '' },
      { name: 'linkTo', label: 'URL', type: 'text', required: true, default: 'https://', placeholder: 'https://...' },
      { name: 'color', label: 'Цвет', type: 'text', default: '#ff4800', placeholder: '#ff4800' }
    ]
  },
  {
    type: 'File',
    label: 'Ссылка на файл',
    description: 'Ссылка на файл из каталога docs',
    propsSchema: [
      { name: 'content', label: 'Название файла', type: 'text', required: true, default: '' },
      { name: 'file', label: 'Имя файла', type: 'text', required: true, default: '', placeholder: 'example.pdf' },
      { name: 'color', label: 'Цвет', type: 'text', default: '#ff4800', placeholder: '#ff4800' },
      { name: 'icon', label: 'Показывать иконку', type: 'checkbox', default: true }
    ]
  },
  {
    type: 'CardGrid',
    label: 'Сетка карточек',
    description: 'Контейнер для карточек с адаптивной сеткой',
    propsSchema: [
      { name: 'maxCardsPerRow', label: 'Карточек в ряд (0 — автоматически)', type: 'number', default: 0, min: 0 }
    ],
    collections: [
      {
        name: 'items',
        label: 'Карточки',
        itemLabel: 'Карточка',
        schema: [
          { name: 'title', label: 'Заголовок', type: 'text', required: true, default: '' },
          { name: 'content', label: 'Описание', type: 'textarea', default: '' },
          { name: 'isButton', label: 'Показывать кнопку', type: 'checkbox', default: false },
          { name: 'buttonText', label: 'Текст кнопки', type: 'text', default: '' },
          { name: 'buttonLink', label: 'Ссылка кнопки', type: 'text', default: '' }
        ]
      }
    ]
  },
  {
    type: 'Card',
    label: 'Карточка',
    description: 'Одиночная карточка с заголовком и текстом',
    propsSchema: [
      { name: 'title', label: 'Заголовок', type: 'text', required: true, default: '' },
      { name: 'content', label: 'Описание', type: 'textarea', default: '' },
      { name: 'isButton', label: 'Показывать кнопку', type: 'checkbox', default: false },
      { name: 'buttonText', label: 'Текст кнопки', type: 'text', default: '' },
      { name: 'buttonLink', label: 'Ссылка кнопки', type: 'text', default: '' }
    ]
  },
  {
    type: 'TitledImage',
    label: 'Изображение',
    description: 'Широкое изображение с адаптивной шириной',
    propsSchema: [
      { name: 'src', label: 'Путь к изображению', type: 'text', required: true, default: '', placeholder: '/images/example.png' },
      { name: 'alt', label: 'Альтернативный текст', type: 'text', default: '' }
    ]
  },
  {
    type: 'Bold',
    label: 'Жирный текст',
    description: 'Короткий фрагмент полужирного текста',
    propsSchema: [
      { name: 'content', label: 'Текст', type: 'text', required: true, default: '' }
    ]
  }
]

export const generateId = (prefix = 'cmp') =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`

export const getComponentDefinition = (type) =>
  pageComponentLibrary.find(item => item.type === type)

const ensureFieldDefault = (field) => {
  if (field.type === 'checkbox') {
    return Boolean(field.default ?? false)
  }
  if (field.type === 'number') {
    const defaultValue = field.default ?? 0
    return Number.isFinite(defaultValue) ? defaultValue : 0
  }
  return field.default ?? ''
}

const createCollectionItem = (collection) => {
  const item = { id: generateId('item') }
  collection.schema.forEach(field => {
    item[field.name] = ensureFieldDefault(field)
  })
  return item
}

export const createComponentInstance = (type) => {
  const definition = getComponentDefinition(type)
  if (!definition) {
    throw new Error(`Unknown component type: ${type}`)
  }

  const component = {
    id: generateId('cmp'),
    type: definition.type,
    props: {}
  }

  definition.propsSchema?.forEach(field => {
    component.props[field.name] = ensureFieldDefault(field)
  })

  definition.collections?.forEach(collection => {
    component.props[collection.name] = []
  })

  return component
}

const sanitizeCollection = (entries = [], collection) =>
  entries.map(entry => {
    const sanitized = { id: entry.id || generateId('item') }
    collection.schema.forEach(field => {
      if (entry[field.name] === undefined || entry[field.name] === null) {
        sanitized[field.name] = ensureFieldDefault(field)
      } else {
        sanitized[field.name] = entry[field.name]
      }
    })
    return sanitized
  })

export const sanitizeComponents = (components = []) =>
  components.map(component => {
    const definition = getComponentDefinition(component.type)
    const sanitized = {
      id: component.id || generateId('cmp'),
      type: component.type,
      props: {}
    }

    const props = component.props || {}

    if (definition?.propsSchema) {
      definition.propsSchema.forEach(field => {
        if (props[field.name] === undefined || props[field.name] === null) {
          sanitized.props[field.name] = ensureFieldDefault(field)
        } else {
          sanitized.props[field.name] = props[field.name]
        }
      })
    } else {
      Object.entries(props).forEach(([key, value]) => {
        sanitized.props[key] = value
      })
    }

    definition?.collections?.forEach(collection => {
      const current = Array.isArray(props[collection.name]) ? props[collection.name] : []
      sanitized.props[collection.name] = sanitizeCollection(current, collection)
    })

    return sanitized
  })

export const normalizeComponents = (components = []) =>
  components.map(component => {
    const definition = getComponentDefinition(component.type)
    if (!definition) {
      return cloneValue(component)
    }
    const normalized = {
      id: component.id || generateId('cmp'),
      type: component.type,
      props: cloneValue(component.props || {})
    }

    definition.propsSchema?.forEach(field => {
      if (normalized.props[field.name] === undefined || normalized.props[field.name] === null) {
        normalized.props[field.name] = ensureFieldDefault(field)
      }
    })

    definition.collections?.forEach(collection => {
      const items = Array.isArray(normalized.props[collection.name])
        ? normalized.props[collection.name]
        : []
      normalized.props[collection.name] = sanitizeCollection(items, collection)
    })

    return normalized
  })
