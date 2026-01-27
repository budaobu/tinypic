<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
    
    <!-- Navbar / Header -->
    <header class="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-sm">
            <PhotoIcon class="w-5 h-5" />
          </div>
          <span class="font-bold text-xl tracking-tight text-gray-900 dark:text-white">TinyPic Lite</span>
        </div>
        
        <div class="flex items-center gap-4">
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
          >
            <SunIcon v-if="isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
          
          <a 
            href="https://github.com/budaobu/tinypic" 
            target="_blank" 
            rel="noopener noreferrer"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
            title="查看源码"
          >
            <!-- Github Icon SVG -->
            <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- 头部区域 -->
      <div class="flex flex-col items-center justify-center text-center mb-12 animate-fade-in">
        <h1 class="font-bold text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-tight">
          极速图片压缩助手
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
          安全、免费、浏览器本地处理 <br class="sm:hidden" /> 支持 JPG, PNG, WebP, AVIF
        </p>
      </div>
  
      <!-- 主体工具区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        <!-- 左侧：设置面板 -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24 transition-all duration-300">
            <h2 class="font-semibold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <AdjustmentsHorizontalIcon class="w-5 h-5 text-blue-500" />
              压缩设置
            </h2>
            
            <!-- 压缩质量滑块 -->
            <div class="mb-8">
              <div class="flex justify-between mb-3">
                <label for="quality" class="text-sm font-medium text-gray-700 dark:text-gray-300">压缩强度/画质</label>
                <span class="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">{{ quality }}%</span>
              </div>
              <input 
                type="range" 
                id="quality" 
                v-model.number="quality" 
                min="10" 
                max="100" 
                class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 hover:accent-blue-700 transition-colors"
              >
              <div class="flex justify-between mt-2 text-xs text-gray-400">
                <span>更小体积</span>
                <span>更高画质</span>
              </div>
            </div>
  
            <!-- 输出格式 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">输出格式</label>
              <div class="relative">
                <select 
                  v-model="outputFormat" 
                  class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors appearance-none"
                >
                  <option v-for="opt in formatOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
  
            <!-- 最大宽度 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最大宽度 (像素)</label>
              <div class="relative">
                <select 
                  v-model="maxWidth" 
                  class="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors appearance-none"
                >
                  <option v-for="opt in widthOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
                 <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
  
          <!-- 统计面板 (仅在有文件时显示) -->
          <Transition name="fade">
            <div v-if="filesQueue.length > 0" class="bg-gray-900 dark:bg-black text-white p-6 rounded-2xl shadow-xl sticky top-[480px]">
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">总节省空间</p>
                  <p class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">{{ totalSavedStr }}</p>
                </div>
                <div class="text-right">
                  <p class="text-gray-400 text-xs mb-1">已处理</p>
                  <p class="text-lg font-bold font-mono">{{ processedCount }} <span class="text-gray-600">/</span> {{ filesQueue.length }}</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
  
        <!-- 右侧：上传区域与列表 -->
        <div class="lg:col-span-2 flex flex-col h-full">
          <!-- 上传区域 -->
          <div 
            ref="dropZoneRef"
            @click="triggerFileSelect"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'relative flex-1 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer min-h-[300px] group overflow-hidden',
              isDragging 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 scale-[1.02]' 
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500'
            ]"
          >
            <div class="z-10 flex flex-col items-center">
              <div class="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm ring-4 ring-white dark:ring-gray-900">
                <CloudArrowUpIcon class="w-12 h-12" />
              </div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">点击或拖拽图片到这里</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
                支持 JPG, PNG, WebP, AVIF, BMP 等格式<br>(单次最多 {{ MAX_FILES }} 张)
              </p>
              
              <button class="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                选择图片
              </button>
            </div>
            
            <!-- 背景装饰 (Optional) -->
            <div class="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <input 
              type="file" 
              ref="fileInputRef" 
              multiple 
              accept="image/*" 
              class="hidden" 
              @change="handleFileChange"
            >
          </div>
  
          <!-- 文件列表区域 -->
          <div v-if="filesQueue.length > 0" class="mt-8 animate-slide-up">
            <div class="flex items-center justify-between mb-4 px-1">
              <h3 class="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <ListBulletIcon class="w-5 h-5 text-gray-500" />
                压缩列表
              </h3>
              
              <div class="flex gap-3">
                <button 
                  @click="resetAll"
                  class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <TrashIcon class="w-4 h-4" />
                  重置
                </button>
                
                <button 
                  v-if="processedCount > 0"
                  @click="downloadAllAsZip"
                  :disabled="isZipping"
                  class="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <svg v-if="isZipping" class="animate-spin -ml-1 mr-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <ArchiveBoxArrowDownIcon v-else class="w-4 h-4" />
                  {{ isZipping ? '打包中...' : '打包下载全部' }}
                </button>
              </div>
            </div>
  
            <div class="grid grid-cols-1 gap-4">
              <TransitionGroup name="list">
                <div 
                  v-for="file in filesQueue" 
                  :key="file.id"
                  class="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex items-center gap-4 relative overflow-hidden group"
                >
                  <!-- 预览图 -->
                  <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700 relative">
                    <img :src="file.previewUrl" class="w-full h-full object-cover" :alt="file.original.name">
                    <div v-if="file.status === 'done'" class="absolute bottom-0 right-0 bg-green-500 text-white text-[10px] px-1 py-0.5 rounded-tl-md font-bold">
                      DONE
                    </div>
                  </div>
  
                  <!-- 信息区 -->
                  <div class="flex-1 min-w-0 z-10">
                    <div class="flex justify-between items-start mb-1">
                      <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate pr-2" :title="file.original.name">
                        {{ file.original.name }}
                      </h4>
                      <button @click="removeFile(file.id)" class="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <XMarkIcon class="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div class="flex items-center gap-3 text-xs mb-3">
                      <span class="bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-mono">
                        {{ formatSize(file.originalSize) }}
                      </span>
                      <ArrowRightIcon class="w-3 h-3 text-gray-300" />
                      <span 
                        class="font-mono font-bold"
                        :class="file.status === 'error' ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'"
                      >
                        {{ file.statusMsg }}
                      </span>
                      
                      <span 
                        v-if="file.badgeText" 
                        class="px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1"
                        :class="file.badgeClass"
                      >
                        {{ file.badgeText }}
                      </span>
                    </div>
  
                    <!-- 进度条 -->
                    <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div 
                        class="h-full rounded-full transition-all duration-300 ease-out"
                        :class="file.status === 'error' ? 'bg-red-500' : (file.status === 'done' ? 'bg-green-500' : 'bg-blue-500 relative overflow-hidden')"
                        :style="{ width: file.progress + '%' }"
                      >
                        <div v-if="file.status === 'processing'" class="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                  </div>
  
                  <!-- 下载按钮 (单独) -->
                  <div v-if="file.status === 'done'" class="ml-2 z-10 flex-shrink-0">
                    <button
                      @click="downloadSingleFile(file)"
                      class="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm"
                      title="下载单张"
                    >
                      <ArrowDownTrayIcon class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification / Toast Container -->
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div 
          v-for="toast in toasts" 
          :key="toast.id" 
          class="pointer-events-auto bg-white dark:bg-gray-800 text-sm font-medium px-4 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3 min-w-[300px]"
          :class="{
            'border-l-4 border-l-green-500': toast.color === 'green',
            'border-l-4 border-l-red-500': toast.color === 'red',
            'border-l-4 border-l-orange-500': toast.color === 'orange',
            'border-l-4 border-l-gray-500': toast.color === 'gray',
          }"
        >
          <div>
            <div class="font-bold text-gray-900 dark:text-white">{{ toast.title }}</div>
            <div class="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{{ toast.description }}</div>
          </div>
        </div>
      </TransitionGroup>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, nextTick } from 'vue'
import { useHead } from '@vueuse/head'
import { 
  PhotoIcon, 
  AdjustmentsHorizontalIcon, 
  CloudArrowUpIcon, 
  ListBulletIcon, 
  TrashIcon, 
  ArchiveBoxArrowDownIcon, 
  XMarkIcon, 
  ArrowRightIcon, 
  ArrowDownTrayIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/outline'

// SEO Logic
useHead({
  title: '极速图片压缩助手 - TinyPic Lite',
  meta: [
    { name: 'description', content: '免费在线图片压缩工具，支持 JPG, PNG, WebP, AVIF 格式。浏览器本地压缩，无需上传服务器，保护隐私。' },
    { name: 'keywords', content: '图片压缩, 在线压缩, PNG压缩, JPG压缩, webp转换' }
  ]
})

// Theme Logic
const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Toast Logic
const toasts = ref([])
let toastId = 0
const addToast = ({ title, description, color = 'gray', timeout = 3000 }) => {
  const id = toastId++
  toasts.value.push({ id, title, description, color })
  setTimeout(() => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) toasts.value.splice(index, 1)
  }, timeout)
}

onMounted(() => {
  // Check theme
  const savedTheme = localStorage.getItem('theme')
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

// --- Type Definitions (Implicit in JS) ---
// FileItem: { id: string, original: File, originalSize: number, compressedBlob: Blob|null, finalMimeType: string, status: string, progress: number, statusMsg: string, badgeText?: string, badgeClass?: string, previewUrl: string }

// --- State ---
const MAX_FILES = 20
const isDragging = ref(false)
const isZipping = ref(false)
const filesQueue = ref([])

// Settings
const quality = ref(80)
const outputFormat = ref('original')
const maxWidth = ref(0)
const dropZoneRef = ref(null)
const fileInputRef = ref(null)

// Options
const formatOptions = [
  { label: '保持原图格式 (默认)', value: 'original' },
  { label: 'JPG (推荐, 兼容性好)', value: 'image/jpeg' },
  { label: 'WebP (体积最小)', value: 'image/webp' },
  { label: 'AVIF (最新格式, 高压缩)', value: 'image/avif' },
  { label: 'PNG (类似 TinyPNG)', value: 'image/png' }
]

const widthOptions = [
  { label: '保持原图尺寸', value: 0 },
  { label: '1920px (1080p)', value: 1920 },
  { label: '1280px (720p)', value: 1280 },
  { label: '800px (网页通用)', value: 800 }
]

// --- Computed ---
const processedCount = computed(() => filesQueue.value.filter(f => f.status === 'done').length)

const totalSavedStr = computed(() => {
  let totalOrig = 0
  let totalComp = 0
  filesQueue.value.filter(f => f.status === 'done').forEach(f => {
    totalOrig += f.originalSize
    if (f.compressedBlob) {
      totalComp += f.compressedBlob.size
    }
  })
  const saved = Math.max(0, totalOrig - totalComp)
  return formatSize(saved)
})

// --- Methods ---

const triggerFileSelect = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (e) => {
  const target = e.target
  if (target.files) {
    addFiles(Array.from(target.files))
  }
  // Clear input
  target.value = ''
}

const handleDrop = (e) => {
  isDragging.value = false
  if (e.dataTransfer?.files) {
    addFiles(Array.from(e.dataTransfer.files))
  }
}

const addFiles = (files) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  if (imageFiles.length === 0) {
    addToast({ title: '格式错误', description: '请上传有效的图片文件', color: 'red' })
    return
  }

  if (filesQueue.value.length + imageFiles.length > MAX_FILES) {
    addToast({ title: '数量限制', description: `一次最多只能处理 ${MAX_FILES} 张图片`, color: 'orange' })
    const remainingSlots = MAX_FILES - filesQueue.value.length
    if (remainingSlots <= 0) return
    imageFiles.splice(remainingSlots)
  }

  imageFiles.forEach(file => {
    const id = Math.random().toString(36).substr(2, 9)
    const fileItem = reactive({
      id,
      original: file,
      originalSize: file.size,
      compressedBlob: null,
      finalMimeType: '',
      status: 'pending',
      progress: 0,
      statusMsg: '等待处理...',
      previewUrl: URL.createObjectURL(file)
    })
    
    filesQueue.value.push(fileItem)
    processImage(fileItem)
  })
}

// Core Logic
const processImage = async (fileItem) => {
  fileItem.status = 'processing'
  fileItem.progress = 10
  fileItem.statusMsg = '读取中...'

  const qualityVal = quality.value / 100
  let targetFormat = outputFormat.value
  const targetWidth = Number(maxWidth.value)

  if (targetFormat === 'original') {
    targetFormat = fileItem.original.type || 'image/jpeg'
  }

  try {
    const img = new Image()
    img.src = fileItem.previewUrl
    
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })

    fileItem.progress = 40
    fileItem.statusMsg = '压缩中...'

    let w = img.naturalWidth
    let h = img.naturalHeight
    let isResized = false

    if (targetWidth > 0 && w > targetWidth) {
      h = (h * targetWidth) / w
      w = targetWidth
      isResized = true
    }

    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')

    if (!ctx) throw new Error('Canvas Context Failed')

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // White background for JPG
    if (targetFormat === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, w, h)
    }

    ctx.drawImage(img, 0, 0, w, h)

    const finishProcessing = (blob) => {
      // Logic for size check
      const isSameFormat = fileItem.original.type === blob.type
      let finalBlob = blob
      let isReverted = false

      if (blob.size > fileItem.originalSize && isSameFormat && !isResized) {
        finalBlob = fileItem.original
        isReverted = true
      }

      fileItem.compressedBlob = finalBlob
      fileItem.finalMimeType = finalBlob.type
      fileItem.status = 'done'
      fileItem.progress = 100
      fileItem.statusMsg = formatSize(finalBlob.size)

      // Badges
      const reduction = ((fileItem.originalSize - finalBlob.size) / fileItem.originalSize * 100).toFixed(0)
      const isLarger = finalBlob.size > fileItem.originalSize

      if (isReverted) {
        fileItem.badgeText = '未压缩'
        fileItem.badgeClass = 'bg-gray-100 dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700'
      } else if (!isLarger) {
        fileItem.badgeText = `-${reduction}%`
        fileItem.badgeClass = 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
      } else {
        fileItem.badgeText = '变大'
        fileItem.badgeClass = 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800'
      }
    }

    // PNG UPNG
    if (targetFormat === 'image/png') {
      if (typeof window.UPNG === 'undefined') {
        throw new Error('UPNG.js 尚未加载完成，请刷新页面')
      }

      const d = ctx.getImageData(0, 0, w, h).data
      let cnum = Math.floor(quality.value * 2.56)
      if (cnum < 16) cnum = 16
      if (cnum > 256) cnum = 256

      setTimeout(() => {
        try {
          const UPNG = window.UPNG
          const pngBuffer = UPNG.encode([d.buffer], w, h, cnum)
          const pngBlob = new Blob([pngBuffer], { type: 'image/png' })
          finishProcessing(pngBlob)
        } catch (e) {
          console.error(e)
          handleError(fileItem, '编码失败')
        }
      }, 50)
    } else {
      // Standard Canvas
      canvas.toBlob((blob) => {
        if (!blob) {
          handleError(fileItem, '生成失败')
          return
        }
        finishProcessing(blob)
      }, targetFormat, qualityVal)
    }

  } catch (err) {
    console.error(err)
    handleError(fileItem, '格式错误')
  }
}

const handleError = (fileItem, msg) => {
  fileItem.status = 'error'
  fileItem.statusMsg = msg
  fileItem.progress = 100
}

const removeFile = (id) => {
  const index = filesQueue.value.findIndex(f => f.id === id)
  if (index > -1) {
    URL.revokeObjectURL(filesQueue.value[index].previewUrl)
    filesQueue.value.splice(index, 1)
  }
}

const resetAll = () => {
  filesQueue.value.forEach(f => URL.revokeObjectURL(f.previewUrl))
  filesQueue.value = []
  if (fileInputRef.value) fileInputRef.value.value = ''
  addToast({ title: '已重置', description: '所有文件已清空', color: 'gray' })
}

const downloadSingleFile = (file) => {
  if (!file.compressedBlob) return
  const url = URL.createObjectURL(file.compressedBlob)
  const link = document.createElement('a')
  link.href = url
  
  const ext = getExtensionFromMime(file.finalMimeType)
  const originalName = file.original.name
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.'))
  link.download = `${nameWithoutExt}_min.${ext}`
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const downloadAllAsZip = async () => {
  const doneFiles = filesQueue.value.filter(f => f.status === 'done')
  if (doneFiles.length === 0) return
  
  if (typeof window.JSZip === 'undefined') {
    addToast({ title: '组件未加载', description: 'JSZip 尚未加载，请稍后重试', color: 'red' })
    return
  }

  isZipping.value = true
  try {
    const JSZip = window.JSZip
    const zip = new JSZip()
    const folder = zip.folder("compressed_images")
    
    doneFiles.forEach(f => {
      if (f.compressedBlob) {
        const ext = getExtensionFromMime(f.finalMimeType)
        const nameWithoutExt = f.original.name.substring(0, f.original.name.lastIndexOf('.'))
        folder.file(`${nameWithoutExt}_min.${ext}`, f.compressedBlob)
      }
    })

    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = "images_compressed.zip"
    link.click()
    URL.revokeObjectURL(url)
    
    addToast({ title: '下载开始', description: '压缩包已生成', color: 'green' })
  } catch (e) {
    console.error(e)
    addToast({ title: '打包失败', description: '生成压缩包时出错', color: 'red' })
  } finally {
    isZipping.value = false
  }
}

const formatSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getExtensionFromMime = (mimeType) => {
  switch(mimeType) {
    case 'image/jpeg': return 'jpg'
    case 'image/png': return 'png'
    case 'image/webp': return 'webp'
    case 'image/avif': return 'avif'
    case 'image/bmp': return 'bmp'
    default: return 'jpg'
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
