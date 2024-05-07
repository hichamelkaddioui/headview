<template>
  <div class="inline-flex rounded-lg shadow-sm">
    <button
      type="button"
      class="relative inline-flex items-center rounded-l-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
      @click="$emit('keys')"
    >
      <KeyIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />

      Pre auth keys
    </button>

    <Menu as="div" class="relative -ml-px block">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center rounded-r-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Options
          <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-30 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-20 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'group flex items-center px-4 py-2 text-sm',
                ]"
                @click="$emit('rename')"
              >
                <PencilSquareIcon
                  class="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600"
                  aria-hidden="true"
                />
                Rename user
              </a>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <a
                href="#"
                :class="[
                  active ? 'bg-gray-100 text-red-600' : 'text-red-500',
                  'group flex items-center px-4 py-2 text-sm font-medium',
                ]"
                @click="$emit('delete')"
              >
                <TrashIcon
                  class="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600"
                  aria-hidden="true"
                />
                Delete user
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ChevronDownIcon,
  KeyIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

defineEmits(["keys", "rename", "delete"]);
</script>
