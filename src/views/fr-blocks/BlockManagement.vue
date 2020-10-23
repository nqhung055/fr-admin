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
                Create Block
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
            <div v-if="errored">
              <p>{{ $t('message.getLogsError') }}</p>
            </div>
            <div v-else>
              <div v-if="loading" class="pr-4">
                {{ $t('message.loading') }}
                </div>
              <div v-else>
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
              </div>
            </div>
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
      loading: true,
      errored: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "name",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Short Name", value: "shortName" },
        { text: "Description", value: "description" },
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
    async getData() {
      const blocks = await this.$axios.get(`${AppConfig.ip}${AppConfig.api_port}/blocks`);
      try {
        if (blocks.status === 200) {
          this.loader = false;
          this.loading = false
          this.items = blocks.data;
        }
      } catch (error) {
        this.errored = true;
        console.log(error);
      }
    },
  },
};
</script>
