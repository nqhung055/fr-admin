<template>
  <div>
    <v-dialog
      :value="isShowPopup"
      max-width="500px"
      max-height="300px"
      @click:outside="closePopup"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('message.downloadExcelFile') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="grid-list-md pa-0">
            <v-form ref="uploadData" v-model="isUploadDataValid">
              <v-row>
                <span>Click Download to download excel sheet</span>
              </v-row>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn
                  class="px-4"
                  color="success"
                  @click="closePopup()"
                >
                  Download
                </v-btn>
                <v-btn class="px-4" color="error" @click="closePopup()">
                  Close
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
// import moment from 'moment';
import XLSX from 'xlsx';
import AppConfig from '../../constants/AppConfig';

export default {
  props: ['isShowPopup', 'connectedDevices'],
  data() {
    return {
      loading: true,
      errored: false,
      
      devicesRules: [
        devices => !devices || !!devices.length || "Atlease one device is required!"
      ],
      showConfirmDialog: false,
      
    }
  },
  mounted() {},
  computed: {},
  methods: {
    downloadExcelFiles() {
    },
    closePopup() {
      this.clearUploadedData()
      this.$emit('closePopup', true)
    } 
  }
}
</script>

<style></style>
