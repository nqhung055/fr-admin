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
    <v-dialog
      v-model="showConfirmDialog"
      max-width="400"
      @click:outside="showConfirmDialog=false"
    >
      <v-card>
        <v-card-title> Clear current user data? </v-card-title>
        <v-card-text>
          Do you want clear all current user data in device and upload this user
          data?
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn class="px-4" color="success" @click="createUsers(true)">
            Yes
          </v-btn>
          <v-btn class="px-4" color="error" @click="createUsers(false)">
            No
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//import Vue from 'vue';
// import moment from 'moment';
//import XLSX from 'xlsx';
//import AppConfig from '../../constants/AppConfig';

export default {
  props: ['isShowPopup', 'connectedDevices'],
  data() {
    return {
      loading: true,
      errored: false,
      isUploadDataValid: true,
      selectedDevices: [],
      showConfirmDialog: false,
    }
  },
  mounted() {},
  computed: {},
  methods: {
    downloadExcelFiles() {
      
    },
    closePopup() {
      this.$emit('closePopup', true)
    },
    openConfirmDialog() {
      if (!this.$refs.uploadData.validate()) return
      this.showConfirmDialog = true
    },
  }
}
</script>

<style></style>
