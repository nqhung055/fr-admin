<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :heading="'Blocks list'"
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-card>
            <v-card-title>
              <v-btn color="success" @click="addFloor()">
                Create Floor
              </v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
              >
              </v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              v-model="selected"
              item-key="name"
              show-select
            >
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td>
                  <v-checkbox
                    color="primary"
                    hide-details
                    v-model="props.selected"
                  ></v-checkbox>
                </td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.shortName }}</td>
                <td>{{ props.item.description }}</td>
              </template>
            </v-data-table>
          </v-card>
        </app-card>
      </v-row>
    </v-container>
    <add-company
      :isShowPopup="showAddDialog"
      @closePopup="closeEditPopup"
      @editSuccess="editSuccess"
      max-width="500px"
    />
    <edit-company
      :isShowPopup="showEditDialog"
      @closePopup="closeEditPopup"
      @editSuccess="editSuccess"
      :editCompany="editCompany"
      max-width="500px"
    />
  </div>
</template>

<script>
import AppConfig from "../../constants/AppConfig";
import editCompany from "./EditFloor.vue";
import addCompany from "./AddFloor.vue";

export default {
  data() {
    return {
      loader: true,
      loading: true,
      errored: false,
      search: "",
      selected: [],
      editFloor: {},
      showEditDialog: false,
      showAddDialog: false,
      headers: [
        { text: "Short Name", align: "left", value: "shortName", sortable: true, width: "15%" },
        { text: "Name", align: "left", sortable: true, value: "name", width: "20%"},
        { text: "Description", value: "description", sortable: false },
        { text: "Action", align: "left", value: "action", width: "10%", sortable: false },
      ],
      items: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getList() {
      await this.$axios
        .get(`${AppConfig.ip}${AppConfig.api_port}/`)
        .then((response) => {
          this.loader = false;
          this.items = response.data || [];
        })
        .catch((error) => {
          console.log(error);
        });
    },
	async del(floor) {        
      const res = await this.$axios.delete(`${AppConfig.ip}${AppConfig.api_port}/companies/${company.id}`);
      if (res.status === 200) {
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Deleted Floor sucessfully!",
        });
        this.getData();
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Delete Floor failed!",
        });
      }
    },  
	edit(floor) {
      this.editFloor = { 
        ...floor
      }
      this.showEditDialog = true
    },
  methods: {
    async getData() {
        const floors = await this.$axios.get(
          `${AppConfig.ip}${AppConfig.api_port}/floors`
        );
      try {
        if (floors.status === 200) {
          this.loader = false;
          this.items = floors.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  closeEditPopup() {
      this.showEditDialog = false;
      this.showAddDialog = false;
    },
    editSuccess() {
      this.closeEditPopup()
      this.getData()
    },
    addFloor() {
      this.showAddDialog = true;
    },
  },
  components: {
    editFloor,
    addFloor,
  }
};
</script>
