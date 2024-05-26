<template>
  <div :class="classes.wrapper">
    <div :class="classes.overflow">
      <table :class="classes.table">
        <thead :class="classes.thead">
          <tr>
            <th
              v-for="column in columns"
              :key="column"
              :class="classes.th"
              scope="col"
            >
              <slot :name="colName(column)">{{ column }}</slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isLoading">
            <tr :class="[classes.tr, classes.loading]">
              <td v-for="_ in loadingColumns" :class="classes.td">
                <TableLoadingColumn />
              </td>
            </tr>
          </template>

          <template v-else-if="isEmpty">
            <td :colspan="loadingColumns.length" :class="classes.empty">
              <slot name="empty"></slot>
            </td>
          </template>

          <template v-else>
            <tr v-for="(row, idx) in data" :key="idx" :class="classes.tr">
              <td v-for="column in columns" :key="column" :class="classes.td">
                <slot :name="cellName(column)" v-bind="row">
                  {{ row[column] }}
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed } from "vue";
import TableLoadingColumn from "./TableLoadingColumn.vue";

interface TableClasses {
  wrapper: string;
  overflow: string;
  table: string;
  thead: string;
  loading: string;
  empty: string;
  tr: string;
  th: string;
  td: string;
}
interface TableProps {
  data: T[];
  cols?: (keyof T)[];
  isLoading?: boolean;
  classes?: Partial<TableClasses>;
}

const props = defineProps<TableProps>();

const defaultClasses: TableClasses = {
  wrapper:
    "overflow-hidden rounded-xl border border-gray-300 ring-1 ring-black ring-opacity-5 sm:rounded-2xl dark:border-gray-600",
  overflow: "relative overflow-x-auto",
  table:
    "w-full whitespace-nowrap text-left text-sm text-gray-500 rtl:text-right dark:text-white",
  thead:
    "border-b border-gray-300 bg-gray-50 text-xs uppercase text-gray-700 dark:border-gray-600 dark:bg-slate-700 dark:text-slate-300",
  loading: "animate-pulse",
  empty: "p-6 text-center",
  tr: "border-b bg-white last:border-none hover:bg-slate-50 dark:border-gray-700 dark:bg-slate-800 dark:hover:bg-slate-700/80",
  th: "p-6",
  td: "p-6",
};

const classes = computed(() =>
  Object.assign({}, defaultClasses, props.classes),
);
const loadingColumns = computed(() => props?.cols || new Array(5));
const columns = computed(() => {
  const { data, cols } = props;

  if (!data.length) {
    return [];
  }

  const [first] = data;
  const columns = Object.keys(first);

  if (!cols?.length) {
    return columns;
  }

  return cols.filter((c) => columns.includes(String(c)));
});
const isEmpty = computed(() => props.data.length === 0);

const colName = (column: keyof T) =>
  `${String(column).replace(/\s/g, "")}Column`;
const cellName = (column: keyof T) =>
  `${String(column).replace(/\s/g, "")}Cell`;
</script>
