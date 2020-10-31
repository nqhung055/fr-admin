<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :heading="'Company list'"
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-card>
            <v-card-title>
              <v-btn color="success" @click="addCompany()">
                Create Company
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
import editCompany from "./EditCompany.vue";
import addCompany from "./AddCompany.vue";

export default {
  data() {
    return {
      loader: true,
      search: "",
      selected: [],
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
    async getData() {
        const companies = await this.$axios.get(
          `${AppConfig.ip}${AppConfig.api_port}/companies`
        );      
      try {
        if (companies.status === 200) {
          this.loader = false;
          this.items = companies.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    editCompany,
    addCompany,
  }
};
</script>
