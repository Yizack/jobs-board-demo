<template>
  <article class="bg-body-secondary shadow-lg rounded-md p-3 transition-all duration-300 border border-transparent hover:border-blue-600 dark:hover:border-blue-300">
    <div class="flex items-start justify-between gap-4">
      <div class="flex items-start gap-4">
        <div class="relative w-16 h-16 bg-gray-300 rounded-lg animate-pulse"></div>
        <div class="flex-1 mb-1">
          <div class="h-6 bg-gray-300 hover:bg-blue-600 dark:hover:bg-blue-300 rounded-md animate-pulse mb-2"></div>
          <div class="flex items-center gap-2 text-sm text-body-secondary mb-1">
            <div class="h-4 bg-gray-300 rounded-md animate-pulse w-24"></div>
            <span class="flex items-center gap-1">
              <div class="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
              <div class="h-4 bg-gray-300 rounded-md animate-pulse w-16"></div>
            </span>
          </div>
          <div class="text-sm text-body-secondary">
            <span class="flex items-center gap-1">
              <div class="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
              <div class="h-4 bg-gray-300 rounded-md animate-pulse w-20"></div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <div class="px-8  py-1 h-6 bg-gray-300 rounded-full animate-pulse"></div>
      <div class="px-8 py-1 h-6 bg-gray-300 rounded-full animate-pulse"></div>
      <div class="px-8 py-1 h-6 bg-gray-300 rounded-full animate-pulse"></div>
    </div>
  </article>
</template>
