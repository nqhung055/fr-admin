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
            </v-data-table>
          </v-card>
        </app-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppConfig from "../../constants/AppConfig";

export default {
  data() {
    return {
      loader: true,
      search: "",
      selected: [],
      headers: [
        {
          text: "name",
          align: "left",
          sortable: true,
          value: "name",
        },
        { text: "Short Name", value: "shortName" },
        { text: "Description", value: "description", sortable: false },
      ],
      items: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
        const sites = await this.$axios.get(
          `${AppConfig.ip}${AppConfig.api_port}/sites`
        );
      try {
        if (sites.status === 200) {
          this.loader = false;
          this.items = sites.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
