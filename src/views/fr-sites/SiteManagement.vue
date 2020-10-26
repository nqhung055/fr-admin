<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :heading="'Sites list'"
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-card>
            <v-card-title>
              <v-btn color="success" @click="showNewDialogMethod()">
                Create Site
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
              <template v-slot:[`item.action`]="{ item }">
                <v-icon small @click="edit(item)">ti-pencil</v-icon> | <v-icon small @click="del(item)">ti-trash</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </app-card>
      </v-row>
    </v-container>
    <edit-site
      :isShowPopup="showEditDialog"
      @closePopup="closeEditPopup"
      @editSuccess="editSuccess"
      :editSite="editSite"
      max-width="500px"
    />
  </div>
</template>

<script>
import AppConfig from "../../constants/AppConfig";
import editSite from "./EditSite.vue";
import Vue from "vue";
export default {
  data() {
    return {
      loader: true,
      loading: true,
      errored: false,
      search: "",
      selected: [],
      editSite: {},
      showEditDialog: false,
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
    async del(site) {        
      const editResponse = await this.$axios.delete(`${AppConfig.ip}${AppConfig.api_port}/sites/${site.id}`);
      if (editResponse.status === 200) {
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Delete Site sucess!",
        });
        this.getData();
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Delete Site fails!",
        });
      }
    },  
    edit(site) {
      this.editSite = { 
        ...site
      }
      this.showEditDialog = true
    },
    async getData() {
      const sites = await this.$axios.get(`${AppConfig.ip}${AppConfig.api_port}/sites`);
      try {
        if (sites.status === 200) {
          this.loader = false;
          this.items = sites.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeEditPopup() {
      this.showEditDialog = false
    },
    editSuccess() {
      this.closeEditPopup()
      this.getData()
    }
  },
  components: {
    editSite,
  }
};
</script>
