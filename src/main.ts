import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "devextreme/dist/css/dx.material.teal.dark.css";
import "/src/assets/index.css";
import axios from "axios";
import DataGrid from "devextreme/ui/data_grid";

DataGrid.defaultOptions({
  options: {
    allowColumnResizing: true,
    columnAutoWidth: true,
    columnChooser: {
      emptyPanelText: "Arrastre aqui las columnas que no desea ver.",
      height: 700,
      sortOrder: "asc",
      title: "Seleccione columnas.",
      width: 295,
    },
    columnFixing: {
      enabled: true,
      texts: {
        fix: "Anclar en:",
        leftPosition: "El inicio",
        rightPosition: "El final",
        unfix: "Desanclar",
      },
    },
    columnHidingEnabled: true,
    dateSerializationFormat: "dd/MM/yyyy",
    filterRow: {
      operationDescriptions: {
        between: "Entre",
        contains: "Contiene",
        endsWith: "Termina con",
        equal: "Igual",
        greaterThan: "Mayor a",
        greaterThanOrEqual: "Mayor igual a",
        lessThan: "Menor a",
        lessThanOrEqual: "Menor igual a",
        notContains: "No contiene",
        notEqual: "No es igual a",
        startsWith: "Inicia con",
      },
      visible: false,
    },
    focusedRowEnabled: true,
    noDataText: "No se encontraron datos.",
    rowAlternationEnabled: true,
    pager: {
      allowedPageSizes: [10, 25, "all"],
      infoText: `Pagina {0} de {1} ({2} registros)`,
      showInfo: true,
      showPageSizeSelector: true,
      visible: true,
    },
    paging: {
      pageSize: 10,
    },
    headerFilter: {
      texts: {
        cancel: "cancelar",
      },
      visible: true,
    },
    selection: {
      mode: "single",
    },
    sorting: {
      ascendingText: "Ascendente",
      clearText: "Deshacer",
      descendingText: "Descendiente",
    },
    showBorders: true,
    showRowLines: true,
  },
});
const app = createApp(App);

app.use(router);

app.mount("#app");
