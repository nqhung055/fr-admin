<template>
  <div>
    <v-dialog
      :value="isShowPopup"
      max-width="500px"
      max-height="auto"
      @click:outside="closePopup"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t("message.addSite") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="grid-list-md pa-0">
            <v-form ref="site" lazy-validation v-model="isAddNew">
              <v-row>
                <v-col cols="5">
                  <v-text-field
                    :label="$t('message.shortName')"
                    v-model.trim="item.sn"
                    :rules="newSiteRules.shortName"
                    required
                  />
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    :label="$t('message.name')"
                    hide-details
                    v-model.trim="item.name"
                  />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                  <v-textarea
                    :label="$t('message.description')"
                    hide-details
                    v-model.trim="item.desc"
                    height="auto"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn class="px-4" color="success" v-on:click="addSite">{{
            $t("message.add")
          }}</v-btn>
          <v-btn class="px-4" color="error" @click.native="closePopup">{{
            $t("message.close")
          }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import AppConfig from "../../constants/AppConfig";

export default {
  props: ["isShowPopup"],
  data() {
    return {
      isAddNew: true,
      item: {
        sn: '',
        name: '',
        desc: ''
      },
      newSiteRules: {
        shortName: [
          (shortName) => !!shortName || "Short name is required",
          (shortName) =>
            (shortName && shortName.length <= 15) ||
            "Shor name must be less than 15 characters!",
        ],
      },
    };
  },
  mounted() {
  },
  computed: {},
  methods: {
    async addSite() {        
      if (!this.$refs.site.validate()) return;
      this.item = {
        ...this.item,
        sn: this.item.sn,
        name: this.item.name,
        desc: this.item.desc
      };
      const res = await this.$axios.post(`${AppConfig.ip}${AppConfig.api_port}/sites/`, this.item);
      if (res.status === 200) {
        this.$emit("editSuccess", true);
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Added Site sucessfully!",
        });
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Add Site failed!",
        });
      }
    },    
    closePopup() {
      this.$emit("closePopup", true);
    },
  },
};
</script>

