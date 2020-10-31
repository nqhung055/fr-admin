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
          <span class="headline">{{ $t("message.editBlock") }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="grid-list-md pa-0">
            <v-form ref="editBlock" lazy-validation>
              <v-row>
                <v-col cols="5">
                  <v-text-field
                    :label="$t('message.shortName')"
                    v-model.trim="editBlock.shortName"
                    :rules="editBlockRules.shortName"
                    required
                  />
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    :label="$t('message.name')"
                    hide-details
                    v-model.trim="editBlock.name"
                  />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                  <v-textarea
                    :label="$t('message.description')"
                    hide-details
                    v-model.trim="editBlock.description"
                    height="auto"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn class="px-4" color="success" v-on:click="editedBlock">{{
            $t("message.editBtn")
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
  props: ["isShowPopup", "editBlock"],
  data() {
    return {
      editBlockRules: {
        shortName: [
          (shortName) => !!shortName || "Short name is required",
          (shortName) =>
            (shortName && shortName.length <= 15) ||
            "Short name must be less than 15 characters!",
        ],
      },
    };
  },
  mounted() {
  },
  computed: {},
  methods: {
    async editBlock() {        
      const editResponse = await this.$axios.patch(
        `${AppConfig.ip}${AppConfig.api_port}/blocks/${this.editBlock.id}?sn=${this.editBlock.shortName}`,
        this.editBlock
      );
      if (editResponse.status === 200) {
        this.$emit("editSuccess", true);
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Edit Block success!",
        });
      } else {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Edit Block fails!",
        });
      }
    },    
    closePopup() {
      this.$emit("closePopup", true);
    },
  },
};
</script>

