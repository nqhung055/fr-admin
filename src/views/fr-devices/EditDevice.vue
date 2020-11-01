<template>
  <div>
    <v-dialog :value="isShowPopup" max-width="1000px" max-height="1000px" @click:outside="closePopup">
        <v-card>
            <v-card-title>
                <span class="headline">{{$t('message.editDevice')}}</span>
            </v-card-title>
            <v-card-text>
                <v-container class="grid-list-md pa-0">
                    <v-form
                        ref="editDevice"
                        lazy-validation
                    >
                        <v-row>                
                            <v-col cols="12">
                                <v-text-field
                                   :label="$t('message.id')"
                                    hide-details
                                    disabled
                                    v-model="editDevice.name"
                                />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                   :label="$t('message.displayName')"
                                    hide-details
                                    v-model="cDisplayName"
                                />
                            </v-col>
							<v-col cols="6">
                                <v-select
                                    v-model="editDevice.type"
                                    :items="inout_item"
                                    :label="$t('message.inout')"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    v-model="editDevice.siteId"
                                    :items="sites"
                                    item-text="name"
                                    item-value="shortName"
                                    :label="$t('message.site')"
                                ></v-select>
                            </v-col> 
                            <v-col cols="6">
                                <v-select
                                    v-model="editDevice.blockId"
                                    :items="blocks"
                                    item-text="name"
                                    item-value="shortName"
                                    :label="$t('message.block')"
                                ></v-select>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    v-model="editDevice.floorId"
                                    :items="floors"
                                    item-text="name"
                                    item-value="shortName"
                                    :label="$t('message.floor')"
                                ></v-select>
                            </v-col> 
                            <v-col cols="6">
                                <v-text-field
                                   :label="$t('message.name')"
                                    hide-details
                                    v-model="editDevice.customName"
                                />
                            </v-col>                           
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn class="px-4" color="success" v-on:click="editedDevice">{{$t('message.editBtn')}}</v-btn>
                <v-btn class="px-4" color="error" @click.native="closePopup">{{$t('message.close')}}</v-btn>
        <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import AppConfig from '../../constants/AppConfig';

export default {
  props: ["isShowPopup", "editDevice"],
  data() {
    return {
        blocks: [],
        floors: [],
        sites: [],
        companies: [],
		inout_item:["IN","OUT"]
    };
  },
  mounted() {
      this.getBlocks();
      this.getSites();
      this.getFloors();
      this.getCompanies();
  },
  computed: {
    cDisplayName: {
      get: function () {
        return this.editDevice.displayName ? this.editDevice.displayName : `${this.editDevice.siteId ? this.editDevice.siteId + '-' : ""}${this.editDevice.blockId ? this.editDevice.blockId + '-' : ""}${this.editDevice.floorId ? this.editDevice.floorId + '-' : ""}${this.editDevice.customName ? this.editDevice.customName: ""}`
      },
      set: function (value) {
        this.editDevice.displayName = value
      },      
    }
  },
  methods: {
    async editedDevice() {
        // return console.log(this.editedDevice)
        const editResponse = await this.$axios.patch(`${AppConfig.ip}${AppConfig.api_port}/devices/${this.editDevice.id}?names=${this.editDevice.name}`, this.editDevice)
        if (editResponse.status === 200) {
            this.$emit("editDeviceSuccess", true);
            Vue.notify({
                group: 'loggedIn',
                type: 'success',
                text: 'Edit Device sucess!'
            })
        }
        else {
            Vue.notify({
                group: 'loggedIn',
                type: 'error',
                text: 'Edit Device fails!'
            })
        }
    },
    async getBlocks() {
        const blockResponse = await this.$axios.get(`${AppConfig.ip}${AppConfig.api_port}/blocks`)
        if (blockResponse.status === 200) {
            this.blocks = blockResponse.data
        }
        else {
            Vue.notify({
                group: 'loggedIn',
                type: 'error',
                text: 'Get Blocks fails!'
            })
        }
    },
    async getSites() {
        const siteResponse = await this.$axios.get(`${AppConfig.ip}${AppConfig.api_port}/sites`)
        if (siteResponse.status === 200) {
            this.sites = siteResponse.data
        }
        else {
            Vue.notify({
                group: 'loggedIn',
                type: 'error',
                text: 'Get Sites fails!'
            })
        }
    },
    async getFloors() {
        const floorResponse = await this.$axios.get(`${AppConfig.ip}${AppConfig.api_port}/floors`)
        if (floorResponse.status === 200) {
            this.floors = floorResponse.data
        }
        else {
            Vue.notify({
                group: 'loggedIn',
                type: 'error',
                text: 'Get Floors fails!'
            })
        }
    },
    async getCompanies() {
        const companyResponse = await this.$axios.get(`${AppConfig.ip}${AppConfig.api_port}/companies`)
        if (companyResponse.status === 200) {
            this.companies = companyResponse.data
        }
        else {
            Vue.notify({
                group: 'loggedIn',
                type: 'error',
                text: 'Get Companies fails!'
            })
        }
    },
    closePopup() {
      this.$emit("closePopup", true);
    },
  },
};
</script>

