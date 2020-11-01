<template>
  <div>
    <v-dialog
      :value="isShowPopup"
      max-width="1500px"
      max-height="1000px"
      @click:outside="closePopup"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('message.uploadExcelFile') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container class="grid-list-md pa-0">
            <v-form ref="uploadData" v-model="isUploadDataValid">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <v-file-input
                    :label="$t('message.uploadExcelFile')"
                    :rules="uploadRules"
                    filled
                    v-model="uploadExcelFile"
                    prepend-icon="mdi-file-excel"
                    @change="uploadExcelFiles"
                    @click:clear="clearUploadExcelFile"
                    :placeholder="$t('message.uploadExcelFilePlaceHolder')"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                  <v-file-input
                    :label="$t('message.uploadImages')"
                    :rules="uploadImageRules"
                    filled
                    v-model="uploadImages"
                    prepend-icon="mdi-camera"
                    @change="uploadImage"
                    multiple
                    :disabled="!uploadExcelFile || !uploadExcelFile.size"
                    @click:clear="clearUploadImages"
                    :placeholder="$t('message.uploadImagesPlaceHolder')"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedDevices"
                    :rules="devicesRules"
                    :items="connectedDevices"
                    item-text="displayName"
                    item-value="name"
                    label="Upload To Devices"
                    multiple
                  ></v-select>
                </v-col>
              </v-row>
              <v-data-table :headers="tableHeaders" :items="uploadUsers">
                <template slot="headerCell" slot-scope="props">
                  <v-tooltip bottom>
                    <span slot="activator">{{ props.header.text }}</span>
                    <span>{{ props.header.text }}</span>
                  </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                </template>
                <template v-slot:[`item.image`]="{ item }">
                  <div class="p-2">
                    <v-img :src="item.facePhoto" height="50" width="50"></v-img>
                  </div>
                </template>
              </v-data-table>
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn
                  class="px-4"
                  color="success"
                  @click="openConfirmDialog()"
                >
                  Create Users
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
      uploadImageRules: [
        files => !!files.length || 'Images file should not be empty',
        files =>
          files.every(
            file =>
              file.name.includes('.png') ||
              file.name.includes('.jpg') ||
              file.name.includes('.jpeg')
          ) || 'Images should be a Png or Jpeg file!'
      ],
      uploadRules: [
        files => !files || !!files.size || 'Excel file should not be empty',
        file =>
          !file ||
          file.size < 1000000 ||
          'File Excel size should be less than 1 MB!',
        file =>
          !file ||
          !file.name ||
          file.name.includes('.xls') ||
          file.name.includes('.xlsx') ||
          'Should be a Excel File!'
      ],
      devicesRules: [
        devices => !devices || !!devices.length || "Atlease one device is required!"
      ],
      uploadExcelFile: {},
      tableHeaders: [
        /*{
          text: 'ID',
          align: 'left',
          value: 'userId',
          width: '2%'
        },*/
		{
          text: 'FacePhoto',
          align: 'center',
          value: 'image',
          width: '10%'
        },
        {
          text: 'Username',
          align: 'left',
          value: 'name',
          width: '10%'
        },
        {
          text: 'Period',
          align: 'left',
          value: 'effectFrom',
          width: '10%'
        },
        {
          text: 'NRIC/FIN',
          align: 'left',
          value: 'ic',
          width: '10%'
        },
		{
          text: 'FIN Exp. Date',
          align: 'left',
          value: 'icCardExpiry',
          width: '10%'
        },
        {
          text: 'Card ID',
          align: 'left',
          value: 'cardId',
          width: '10%'
        },
        {
          text: 'Phone',
          align: 'left',
          value: 'phone',
          width: '10%'
        },
		{
          text: 'Site',
          align: 'left',
          value: 'siteId',
          width: '10%'
        },
        // {
        //   text: 'Personal confidence',
        //   align: 'center',
        //   value: 'confidenceLevel',
        //   width: '10%'
        // }
      ],
      uploadUsers: [],
      uploadImages: [],
      isUploadDataValid: true,
      selectedDevices: [],
      showConfirmDialog: false,
      defaultUser: {
        devices: [],
        userId: "",
        name: "",
        facePhoto: "",
        phone: "",
        allowPeriods: [],
        userType: "-1",
        confidenceLevel: 65,
        ic: "",
        effectFrom: "",
        expiredAt: "" 
      }
    }
  },
  mounted() {},
  computed: {},
  methods: {
    uploadExcelFiles() {
      if (!this.uploadExcelFile) return
      const reader = new FileReader()
      const rABS = !!reader.readAsBinaryString
      reader.addEventListener(
        'load',
        () => {
          let data = reader.result
          if (!rABS) data = new Uint8Array(data)
          const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' })
          const rawUploadUsers = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          )

          this.uploadUsers = rawUploadUsers.map(rawUser => {
            return {
              devices: rawUser['devices'],
              confidenceLevel: '65', //rawUser['Personal confidence'],
              userType: '-1', //rawUser['User type'],
              name: rawUser['Name'],
              // userId: rawUser['Number'] + "",
              // ic: rawUser['ID card number'],
              userId: Math.floor(Math.random() * (new Date().getTime() - 1 + 1)) + 1,
              //new Date().getTime() + 1,
              ic: rawUser['NRIC/FIN'],
              company: rawUser['Company'],
              site: rawUser['Site'],
              block: rawUser['Block'],
              floor: rawUser['Floor'],
              facePhoto: '',
              cardId: rawUser['Card ID'],
              phone: rawUser['Cellphone number'],
              effectFrom: rawUser['Validity period'],
              icCardExpiry: rawUser['FIN Expiry']
            }
          });
        },
        false
      )

      if (rABS) {
        reader.readAsBinaryString(this.uploadExcelFile)
      } else reader.readAsArrayBuffer(this.uploadExcelFile)
    },
    async uploadImage() {
      this.uploadImages.map(image => {
        const nricFIN = image.name.split('.')[0]
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => {
            const users = this.uploadUsers.filter(
              user => user.ic == nricFIN
            )
            users.forEach(user => {
              user.facePhoto = reader.result
            })
          },
          false
        )
        reader.readAsDataURL(image)
      })
    },
    closePopup() {
      this.clearUploadedData()
      this.$emit('closePopup', true)
    },
    openConfirmDialog() {
      if (!this.$refs.uploadData.validate()) return
      this.showConfirmDialog = true
    },
    async createUsers(isClearUserData = true) {
      try {
        
        let urlUpdateUsers = `${AppConfig.ip}${AppConfig.api_port}/users/`; let devices = ""; let userId = ""; let blockId = ""; let companyId = ""; let floorId = ""; let siteId = ""; let cardId = "";
        let icCardExpiry = ""
        if (isClearUserData) await this.deleteUserFromDevice()
        for (let index = 0; index < this.uploadUsers.length; index++) {
          if (index !== 0) urlUpdateUsers = `${AppConfig.ip}${AppConfig.api_port}/users/`;
          const user = this.uploadUsers[index];
          const userWithDevies = { ...this.defaultUser, ...user, devices: this.selectedDevices }
          Object.keys(userWithDevies).forEach((key) => {
            if (key === "devices" || key === "userId" || key === "block" || key === "company" || key === "floor" || key === "site" || key === "cardId") {
              devices = userWithDevies["devices"]; userId = userWithDevies["userId"];
              blockId = !userWithDevies["block"] ? '' : userWithDevies["block"]; companyId = !userWithDevies["company"]? '' : userWithDevies["company"]; floorId = !userWithDevies["floor"]? '' : userWithDevies["floor"]; siteId = !userWithDevies["site"]? '' : userWithDevies["site"]; cardId = !userWithDevies["cardId"]? '' : userWithDevies["cardId"];
              icCardExpiry = userWithDevies["icCardExpiry"]
            }
          });
          urlUpdateUsers += userId + "?devices=" + devices;
          let objUpdateUser = { blockId: blockId, companyId: companyId, floorId: floorId, siteId: siteId, cardId: cardId, icCardExpiry };
          const upGWAPI = await this.$axios.post('/upload/user', userWithDevies)
          if (upGWAPI.status === 200) {
            if ((blockId !== 'undefined' || blockId !== null) && (companyId !== 'undefined' || companyId !== null) && (floorId !== 'undefined' || floorId !== null) && (siteId !== 'undefined' || siteId !== null ) && (cardId !== 'undefined' || cardId !== null )) {
              const upBEAPI = await this.$axios.patch(urlUpdateUsers, objUpdateUser);
              try {
                if (upBEAPI.status === 200) {
                  this.errored = false;
                }
              } catch (error) {
                this.errored = true;
                  console.log(error);
              }
              finally {() => this.loading = false;}
            }
          }
        }
        
        // await Promise.all(
        //   this.uploadUsers.map(user => {
        //     const userWithDevies = { ...user, devices: this.selectedDevices }
        //     return this.$axios.post('/upload/user', userWithDevies)
        //   })
        // )

        this.clearUploadedData()
        this.showConfirmDialog = false
        this.$emit('uploadSuccess', true)
        if (this.errored === false) {
          Vue.notify({
            group: 'loggedIn',
            type: 'success',
            text: 'User uploaded!'
          });
        }
      } catch (error) {
        Vue.notify({
          group: 'loggedIn',
          type: 'error',
          text: `Upload failed! Reason: ${error.message}`
        })
      }
    },
    clearUploadedData() {
      this.uploadUsers = []
      this.uploadExcelFile = {}
      this.uploadImages = []
    },
    async deleteUserFromDevice() {
      try {
        return Promise.all(
          this.selectedDevices.map(device => {
            return this.$axios.delete(`batch/delete/users`, {
              data: {
                deviceId: device,
                userIds: this.uploadUsers.map(user => user.userId + "")
              }
            })
          })
        )
      } catch (error) {
        Vue.notify({
          group: 'loggedIn',
          type: 'error',
          text: 'Error when delete users from devices!'
        })
      }
    },
    clearUploadExcelFile() {
      this.uploadImages = []
      this.uploadUsers = []
    },
    clearUploadImages() {
      this.uploadUsers.forEach(user => {
        user.facePhoto = ''
      })
    }
  }
}
</script>

<style></style>
